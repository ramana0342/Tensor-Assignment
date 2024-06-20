// components/Login.js

import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleLogin = async () => {
    try {
        window.location.href = "http://localhost:5000/auth/google"
     // const response = await axios.get(' http://localhost:5000/auth/google');
      //window.location.href = response.data.authUrl;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
