const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const hipaaComplianceMiddleware = require('./middleware/hipaaCompliance');
const multer = require('multer'); // For handling file uploads
const { setupRealTimeUpdates } = require('./utils/socketUtils.js');
const globalErrorHandler = require('./middleware/globalErrorHandler');

const AuthService = require('./services/AuthService');
const authService = new AuthService();

const { validateAppointment } = require('./middleware/validateAppointment');

const Appointment = require('./models/Appointment');
const Patient = require('./models/Patient');

//const PaymentService = require('./services/PaymentService');
//const paymentService = new PaymentService();

/*const DocumentService = require('./services/DocumentService');
const documentService = new DocumentService();*/

const AppointmentService = require('./services/AppointmentService');
const appointmentService = new AppointmentService();

// Setup file upload (for document handling)
const upload = multer({ dest: 'uploads/' });


// Load environment variables
dotenv.config();

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

// Express app and middleware setup
const app = express();
app.use(express.json());
app.use(cors());
app.use(hipaaComplianceMiddleware);
app.use(globalErrorHandler);

// Routes
app.get("/", (req, res) => res.send("Welcome to Healthcare Appointment System API"));

//Socket.io setup
const server = http.createServer(app);
const io = socketIo(server);
setupRealTimeUpdates(io);

app.post('/auth/google', async (req, res) => {
    try {
      const userData = await authService.authenticateWithGoogle(req.body.token);
      res.json(userData);
    } catch (err) {
      res.status(400).send('Authentication failed');
    }
  })

// POST route for Payment (Processing Appointment Payment)
/*app.post('/appointments/:id/payment', async (req, res) => {
    try {
      const { appointment } = req.body;
      const clientSecret = await paymentService.processInvoice(appointment);
      res.json({ clientSecret });
    } catch (err) {
      console.error('Payment processing failed', err);
      res.status(400).send('Payment failed');
    }
  });*/
  
  /*// POST route for Document Upload and OCR
  app.post('/documents/upload', upload.single('document'), async (req, res) => {
    try {
      const filePath = req.file.path;
      const { ocrText, s3Url } = await documentService.scanAndStoreDocument(filePath);
      res.json({ ocrText, s3Url });
    } catch (err) {
      console.error('Document upload failed', err);
      res.status(400).send('Document upload failed');
    }
  });*/
  
  // POST route for Appointment Slot Recommendation 
app.post('/appointments/recommend-time', async (req, res) => {
    try {
      const { patient, symptoms } = req.body;
      const recommendedSlots = await appointmentService.recommendTimeSlots(patient, symptoms);
      res.json({ recommendedSlots });
    } catch (err) {
      console.error('Time slot recommendation failed', err);
      res.status(400).send('Recommendation failed');
    }
  });
  
  // POST route for Wait Time Prediction 
app.post('/appointments/predict-wait-time', async (req, res) => {
    try {
      const { clinicId } = req.body;
      const waitTime = await appointmentService.predictWaitTime(clinicId);
      res.json({ waitTime });
    } catch (err) {
      console.error('Wait time prediction failed', err);
      res.status(400).send('Wait time prediction failed');
    }
  });
  
  // POST route for Managing Priority Queue (appointments)
app.post('/appointments/manage-priority', async (req, res) => {
    try {
      const { appointments } = req.body;
      const sortedAppointments = await appointmentService.managePriorityQueue(appointments);
      res.json({ sortedAppointments });
    } catch (err) {
      console.error('Priority queue management failed', err);
      res.status(400).send('Priority queue management failed');
    }
  });
  
  app.post('/patients', async (req, res) => {
    try {
      const { name, email, phone, medicalHistory, connectedDevices } = req.body;
      const patient = new Patient({ name, email, phone, medicalHistory, connectedDevices });
      await patient.save();
      res.status(201).json(patient);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create patient', details: error.message });
    }
  });

app.post('/appointments', async (req, res) => {
    try {
      const { patientId, doctorId, date, priority, symptoms } = req.body;
      const appointment = new Appointment({ patientId, doctorId, date, priority, symptoms });
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create appointment', details: error.message });
    }
  });

app.get('/appointments/:patientId', async (req, res) => {
    try {
      const { patientId } = req.params;
      const appointments = await Appointment.find({ patientId }).populate('doctorId', 'name');
      res.status(200).json(appointments);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch appointments', details: error.message });
    }
  });

/*  app.post('/appointments', validateAppointment, async (req, res) => {
    try {
        const { patientId, doctorId, date, priority, symptoms } = req.body;

        const appointment = new Appointment({
            patientId,
            doctorId,
            date,
            priority,
            symptoms
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Failed to create appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment', details: error.message });
    }
});
*/
// Start the server
const { connectToDatabase } = require('./utils/db');

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log('Server is running on port ${PORT}');
        });
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
}

startServer();
