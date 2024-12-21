
function validateAppointment(req, res, next) {
    const { patientId, doctorId, date, priority } = req.body;
  
    if (!patientId || !doctorId || !date || !priority) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Additional validation can be added here, e.g., checking valid date format
    next(); // Proceed to the next middleware or route handler
  }
module.exports = validateAppointment;