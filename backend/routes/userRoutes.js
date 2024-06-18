const express = require('express')  // To import express - This is the commen JS module syntax to import
const router = express.Router()     // To be able to use the express router
const { registerUser, loginUser, getMe } = require('../controllers/userController')    // To import the controller functions

const { protect } = require('../middleware/authMiddleware') // To bring in the middleware (function) to be able to protect a route (access) - it's used in /me

// router.post('/', (request, response) => {   // POST request
//     response.send('Register Route')    // To send a string to the Web Server
// })
router.post('/', registerUser)      // The function registerUser from userController.js is used to make the route (POST http://localhost:5000/api/users -> Register Route)
router.post('/login', loginUser)    // The function loginUser from userController.js is used to make the route (POST http://localhost:5000/api/users/login -> Login Route)
router.get('/me', protect, getMe)    // The function getMe from userController.js is used to make the route (GET http://localhost:5000/api/users/me -> Me page Route) -> It's a protected rout (login token) - for this purpose a middleware is used (protect -> authMiddleware.js)

module.exports = router             // To export the router -> It's used in server.js - This is the commen JS module syntax to export