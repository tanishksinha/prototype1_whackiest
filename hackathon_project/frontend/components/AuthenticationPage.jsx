import React, { useState } from 'react';

const AuthenticationPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        // Redirect to appropriate dashboard
      } else {
        alert('Error: ${data.error}');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="email" name="email" value={credentials.email} onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" value={credentials.password} onChange={handleChange} required />

      <button type="submit">Login</button>
    </form>
  );
};

export default AuthenticationPage;