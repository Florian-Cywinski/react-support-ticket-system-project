const express = require('express')
const router = express.Router({ mergeParams: true })    // Here a property is used - in ticketRoutes.js the noteRouter is brought in    //  /api/tickets/:ticketId/notes    -> see ticketRoutes.js
const { getNotes, addNote } = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router

//  /api/tickets/:ticketId/notes    -> see ticketRoutes.js
