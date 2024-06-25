const path = require('path')
const express = require('express')  // To import express - This is the commen JS module syntax
const colors = require('colors')
const dotenv = require('dotenv').config() // To be able to use environment variables
const { errorHandler } = require('./middleware/errorMiddleware')  // To import the error middleware function
const connectDB = require('./config/db')    // To import the db connection file
const PORT = process.env.PORT || 5000   // const PORT = 5000   // Port for the backend server   // process.env to reach the .env file -> PORT is the used variable  // || 5000 to use port 5000 if the variable isn't available

connectDB() // To call the imported function (Connect to database) - db connection file

const app = express()   // To initialize the app variable

// Middleware
app.use(express.json()) // To be able to send raw json
app.use(express.urlencoded({extended: false}))  // To accept the url encoded form

// Routes
app.use('/api/users', require('./routes/userRoutes'))   // Routes to /api/users - require('./routes/userRoutes') to bring it in from userRoutes.js
app.use('/api/tickets', require('./routes/ticketRoutes'))   // Routes to /api/tickets - require('./routes/ticketRoutes') to bring it in from ticketRoutes.js

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (_, res) => {
      res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
  }

app.use(errorHandler)   // To be able to use the errorHandler function

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))    // To listen on a specific port