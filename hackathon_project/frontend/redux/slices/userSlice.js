import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: '',
    email: '',
    isAuthenticated: false,
  },
  reducers: {
    login(state, action) {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    logout() {
      return { id: null, name: '', email: '', isAuthenticated: false };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;