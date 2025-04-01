import axios from 'axios';

// Set the base URL of the backend API (assuming backend runs on http://localhost:5000)
const API_URL = 'http://localhost:5000/api/auth';

// Register User
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data; // You can adjust this based on the response structure
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong during registration.');
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // Store JWT token in localStorage
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token; // Return the token if you need to do something else with it
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
  }
};

// Logout User
export const logoutUser = () => {
  // Remove JWT token from localStorage
  localStorage.removeItem('token');
};
