// Appointment.js
const mongoose = require('mongoose');

// Appointment Schema
const AppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    priority: {
      type: String,
      enum: ['normal', 'emergency'],
      default: 'normal',
    },
    symptoms: [String],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export Appointment model
const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;