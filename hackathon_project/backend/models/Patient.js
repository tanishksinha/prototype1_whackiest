const db = require('../utils/db');

class Patient {
    static async createPatient(data) {
        const patientRef = db.collection('patients').doc();
        await patientRef.set(data);
        return { id: patientRef.id, ...data };
    }

    static async getPatientById(id) {
        const patientDoc = await db.collection('patients').doc(id).get();
        if (!patientDoc.exists) throw new Error('Patient not found');
        return { id: patientDoc.id, ...patientDoc.data() };
    }

    static async getAllPatients() {
        const snapshot = await db.collection('patients').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async updatePatient(id, data) {
        const patientRef = db.collection('patients').doc(id);
        await patientRef.update(data);
        return { id, ...data };
    }

    static async deletePatient(id) {
        await db.collection('patients').doc(id).delete();
        return { message: `Patient with ID ${id} deleted successfully` };
    }
}

module.exports = Patient;