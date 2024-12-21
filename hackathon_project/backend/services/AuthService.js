// AuthService.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthService {
  // Authenticate user with Google OAuth token
  async authenticateWithGoogle(token) {
    try {
      // Verify the Google token using OAuth2Client
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of your app
      });

      const payload = ticket.getPayload();
      const userId = payload['sub']; // Google user ID
      const userEmail = payload['email'];

      // You can create or fetch the user from your database here, for now return user data
      return { userId, userEmail };
    } catch (error) {
      console.error('Error authenticating with Google:', error);
      throw new Error('Google authentication failed');
    }
  }
}

module.exports = AuthService;