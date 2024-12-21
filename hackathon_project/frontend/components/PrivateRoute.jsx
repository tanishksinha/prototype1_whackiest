// Create new file: components/PrivateRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

// Update App.js routes:
<Switch>
  <Route path="/" exact component={AuthenticationPage} />
  <PrivateRoute path="/patient" component={PatientDashboard} />
  <PrivateRoute path="/doctor" component={DoctorInterface} />
  <PrivateRoute path="/book" component={AppointmentBooking} />
</Switch>