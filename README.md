# Healthcare Management System

## Overview

The Healthcare Management System is a comprehensive web application designed to facilitate patient management, appointment scheduling, and secure data handling in compliance with HIPAA regulations. This application utilizes a modern tech stack including Node.js for the backend and React for the frontend.

## Features

- **User Authentication**: Secure login via Google OAuth.
- **Appointment Management**: Create, read, update, and delete appointments.
- **Patient Management**: Manage patient records with secure data handling.
- **Real-time Updates**: Use of Socket.IO for real-time notifications.
- **HIPAA Compliance**: Middleware for data encryption and access control.
- **Responsive Design**: User interface adapts to various screen sizes.

## Project Structure

HACKATHON PROJECT
├── backend
│ ├── middleware
│ │ ├── globalErrorHandler.js
│ │ └── hipaaCompliance.js
│ ├── models
│ │ ├── Appointment.js
│ │ └── Patient.js
│ ├── routes
│ │ ├── appointmentRoutes.js
│ │ └── patientRoutes.js
│ ├── services
│ │ ├── AppointmentService.js
│ │ ├── AuthService.js
│ │ ├── DocumentService.js
│ │ └── PaymentService.js
│ ├── uploads
│ ├── utils
│ │ ├── db.js
│ │ ├── firebase.js
│ │ └── socketUtils.js
│ ├── .env
│ ├── firebase-service-account.json
│ ├── package-lock.json
│ ├── package.json
│ └── server.js
└── frontend
├── components
│ ├── AppointmentBooking.jsx
│ ├── AuthenticationPage.jsx
│ ├── DoctorInterface.jsx
│ ├── PatientDashboard.jsx
│ └── PrivateRoute.jsx
├── redux
│ ├── actions
│ ├── reducer
│ ├── slices
│ └── store.js
└── App.js



## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (if using MongoDB for patient records)

### Backend Setup

1. Navigate to the backend directory:
    ```
    cd backend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file in the backend directory with the following variables:
    ```
    PORT=5000 
    GOOGLE_CLIENT_ID=..... 
    GOOGLE_CLIENT_SECRET=..... 
    DB_URI=....
    JWT_SECRET=....
    JWT_EXPIRES_IN=....
    ```

4. Start the server:
    ```
    node server.js
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```
    cd frontend
    ```

2. Install dependencies:
    ```
    npm install 
    ```

3. Start the React application:
    ```
    npm start 
    ```

## Usage

- **Authentication**: Users can log in using their Google accounts.
- **Manage Appointments**: Users can create, view, update, and delete appointments through the user interface.
- **Patient Dashboard**: View and manage patient information securely.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors and participants of the hackathon.
- Thanks to all seniors who helped us in this hackathon.

