// Patient.js
const mongoose = require('mongoose');

// Patient Schema
const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    medicalHistory: [
      {
        type: String,
      },
    ],
    connectedDevices: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export Patient model
const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;