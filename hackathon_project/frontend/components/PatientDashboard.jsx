import React, { useState, useEffect } from 'react';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = 'sample-patient-id'; // Replace with actual logged-in patient ID

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(http://localhost:5000/appointments?patientId=${patientId});
        const data = await response.json();
        if (response.ok) {
          setAppointments(data);
        } else {
          alert(Error: ${data.error});
        }
      } catch (error) {
        console.error('Error fetching patient appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <strong>Date:</strong> {new Date(appointment.date).toLocaleString()} | 
            <strong>Status:</strong> {appointment.status} | 
            <strong>Priority:</strong> {appointment.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;