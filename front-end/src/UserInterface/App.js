

import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Login from './components/Login';
import CustomerServiceForm from './components/CustomerServiceForm';
import ServiceRequests from './components/ServiceRequests';

const App = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/CustomerServiceForm" element={<CustomerServiceForm />} />
        <Route exact path="/ServiceRequests" element={<ServiceRequests />} />
      
       
      </Routes>
    </div>
  </Router>
  );
};

export default App;
