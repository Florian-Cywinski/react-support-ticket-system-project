const express = require('express')  // To import express - This is the commen JS module syntax
const dotenv = require('dotenv').config() // To be able to use environment variables
const { errorHandler } = require('./middleware/errorMiddleware')  // To import the error middleware function
const PORT = process.env.PORT || 5000   // const PORT = 5000   // Port for the backend server   // process.env to reach the .env file -> PORT is the used variable  // || 5000 to use port 5000 if the variable isn't available

const app = express()   // To initialize the app variable

// Middleware
app.use(express.json()) // To be able to send raw json
app.use(express.urlencoded({extended: false}))  // To accept the url encoded form

// Routes
app.use('/api/users', require('./routes/userRoutes'))   // Routes to /api/users - require('./routes/userRoutes') to bring it in from userRoutes.js

app.use(errorHandler)   // To be able to use the errorHandler function

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))    // To listen on a specific port