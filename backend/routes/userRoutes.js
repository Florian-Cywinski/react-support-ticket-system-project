const express = require('express')  // To import express - This is the commen JS module syntax to import
const router = express.Router()     // To be able to use the express router
const { registerUser, loginUser } = require('../controllers/userController')    // To import the controller functions

// router.post('/', (request, response) => {   // POST request
//     response.send('Register Route')    // To send a string to the Web Server
// })
router.post('/', registerUser)      // The function registerUser from userController.js is used to make the route (POST http://localhost:5000/api/users -> Register Route)
router.post('/login', loginUser)    // The function loginUser from userController.js is used to make the route (POST http://localhost:5000/api/users/login -> Login Route)

module.exports = router             // To export the router -> It's used in server.js - This is the commen JS module syntax to export