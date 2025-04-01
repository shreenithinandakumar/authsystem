import React, { useState, useEffect } from 'react';
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You are not authorized to view this page. Please log in first.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Assume the response contains user data
      } catch (err) {
        setError('Error fetching profile data');
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    logoutUser(); // Call logoutUser from authService
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
