import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';
import userReducer from './slices/userSlice';

// Create the Redux store and combine reducers
const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    user: userReducer,
  },
});

export { store };