const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

router.post('/', async (req, res) => {
   try {
       const newPatient = await Patient.createPatient(req.body);
       res.status(201).json(newPatient);
   } catch (error) { 
       res.status(500).json({ error: error.message }); 
   } 
});

router.get('/:id', async (req, res) => { 
   try { 
       const patient = await Patient.getPatientById(req.params.id); 
       res.status(200).json(patient); 
   } catch (error) { 
       res.status(404).json({ error: error.message }); 
   } 
});

router.put('/:id', async (req, res) => { 
   try { 
       const updatedPatient = await Patient.updatePatient(req.params.id, req.body); 
       res.status(200).json(updatedPatient); 
   } catch (error) { 
       res.status(500).json({ error: error.message }); 
   } 
});

router.delete('/:id', async (req, res) => { 
   try { 
       const result = await Patient.deletePatient(req.params.id); 
       res.status(200).json(result); 
   } catch (error) { 
       res.status(500).json({ error: error.message }); 
   } 
});

module.exports = router;
