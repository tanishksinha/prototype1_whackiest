import React, { useState } from 'react';

const AppointmentBooking = () => {
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    symptoms: '',
    priority: 'normal',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Appointment booked successfully!');
      } else {
        alert(Error: ${data.error});
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book an Appointment</h2>
      <label>Patient ID:</label>
      <input type="text" name="patientId" value={form.patientId} onChange={handleChange} required />

      <label>Doctor ID:</label>
      <input type="text" name="doctorId" value={form.doctorId} onChange={handleChange} required />

      <label>Date:</label>
      <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required />

      <label>Symptoms:</label>
      <textarea name="symptoms" value={form.symptoms} onChange={handleChange} />

      <label>Priority:</label>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="normal">Normal</option>
        <option value="emergency">Emergency</option>
      </select>

      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentBooking;