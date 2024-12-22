const express = require('express');
const Appointment = require('../models/Appointment');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newAppointment = await Appointment.createAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
   try {
       const appointment = await Appointment.getAppointmentById(req.params.id);
       res.status(200).json(appointment);
   } catch (error) { 
       res.status(404).json({ error: error.message });
   }
});

router.put('/:id', async (req, res) => { 
   try { 
       const updatedAppointment = await Appointment.updateAppointment(req.params.id, req.body); 
       res.status(200).json(updatedAppointment); 
   } catch (error) { 
       res.status(500).json({ error: error.message }); 
   } 
});

router.delete('/:id', async (req, res) => { 
   try { 
       const result = await Appointment.deleteAppointment(req.params.id); 
       res.status(200).json(result); 
   } catch (error) { 
       res.status(500).json({ error: error.message }); 
   } 
});

module.exports = router;
