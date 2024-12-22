const db = require('../utils/db');

class Appointment {
    static async createAppointment(data) {
        try {
            const appointmentRef = db.collection('appointments').doc();
            await appointmentRef.set(data);
            return { id: appointmentRef.id, ...data };
        } catch (error) {
            throw new Error(`Failed to create appointment: ${error.message}`);
        }
    }

    static async getAppointmentById(id) {
        try {
            const appointmentDoc = await db.collection('appointments').doc(id).get();
            if (!appointmentDoc.exists) throw new Error('Appointment not found');
            return { id: appointmentDoc.id, ...appointmentDoc.data() };
        } catch (error) {
            throw new Error(`Failed to retrieve appointment: ${error.message}`);
        }
    }

    static async getAllAppointments() {
        try {
            const snapshot = await db.collection('appointments').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new Error(`Failed to retrieve appointments: ${error.message}`);
        }
    }

    static async updateAppointment(id, data) {
        try {
            const appointmentRef = db.collection('appointments').doc(id);
            await appointmentRef.update(data);
            return { id, ...data };
        } catch (error) {
            throw new Error(`Failed to update appointment: ${error.message}`);
        }
    }

    static async deleteAppointment(id) {
        try {
            await db.collection('appointments').doc(id).delete();
            return { message: `Appointment with ID ${id} deleted successfully` };
        } catch (error) {
            throw new Error(`Failed to delete appointment: ${error.message}`);
        }
    }
}

module.exports = Appointment;