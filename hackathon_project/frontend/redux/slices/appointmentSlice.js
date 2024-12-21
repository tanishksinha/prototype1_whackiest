import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: [],
  reducers: {
    addAppointment(state, action) {
      state.push(action.payload);
    },
    updateAppointment(state, action) {
      const index = state.findIndex((appt) => appt.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteAppointment(state, action) {
      return state.filter((appt) => appt.id !== action.payload);
    },
  },
});

export const { addAppointment, updateAppointment, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;