// For the request to the backend API - The functions in here are used in authSlice.js
import axios from 'axios'   // Axios is a promise-based HTTP library that lets developers make requests to either their own or a third-party server to fetch data. It offers different ways of making requests such as GET , POST , PUT/PATCH , and DELETE (axios is a better alternative to fetch)

const API_URL = '/api/users/'   // /api/users/ is the end point for all the auth stuff (http://localhost:5000/api/users/)

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)  // To make a POST request (with the user data (refister data)) to http://localhost:5000/api/users/

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data)) // To save the data to local storage
  }
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)  // To make a POST request (with the user data (login data)) to http://localhost:5000/api/users/login

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))     // To save the data to local storage
  }
  return response.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {   // To structure all functions for the export
  register,
  logout,
  login,
}

export default authService

