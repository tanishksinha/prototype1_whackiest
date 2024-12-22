import React, { useState, useEffect } from 'react';

const DoctorInterface = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/appointments');
        const data = await response.json();
        if (response.ok) {
          setAppointments(data);
        } else {
          alert('Error: ${data.error}');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Doctor Interface</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>Patient:</strong> {appointment.patientId} | 
            <strong>Date:</strong> {new Date(appointment.date).toLocaleString()} | 
            <strong>Status:</strong> {appointment.status} | 
            <strong>Priority:</strong> {appointment.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorInterface;