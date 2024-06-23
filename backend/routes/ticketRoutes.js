const express = require('express')  // To import express - This is the commen JS module syntax to import
const router = express.Router()     // To be able to use the express router
const {   // To import the controller functions
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware') // To bring in the middleware (function) to be able to protect a route (access) - it's used in /me

// GET and POST request to http://localhost:5000/api/tickets
router.route('/').get(protect, getTickets).post(protect, createTicket)  // router.route() to be able to chain on on this (.get().post()) - protect to have a protected route (the user has to be authenticated) which is connected to the controller function getTickets

router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router   // To export the router -> It's used in server.js - This is the commen JS module syntax to export
