import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// PrivateRoute component checks if the user is authenticated
const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token'); // Get JWT from localStorage

  return (
    <Route 
      {...rest} 
      element={token ? <Element /> : <Navigate to="/login" />} // If token exists, render the component, else redirect to login
    />
  );
};

export default PrivateRoute;
