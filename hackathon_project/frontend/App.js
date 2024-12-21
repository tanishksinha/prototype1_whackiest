import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import PatientDashboard from './components/PatientDashboard';
import DoctorInterface from './components/DoctorInterface';
import AppointmentBooking from './components/AppointmentBooking';
import AuthenticationPage from './components/AuthenticationPage';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={AuthenticationPage} />
        <Route path="/patient" component={PatientDashboard} />
        <Route path="/doctor" component={DoctorInterface} />
        <Route path="/book" component={AppointmentBooking} />
      </Switch>
    </Router>
  </Provider>
);

export default App;