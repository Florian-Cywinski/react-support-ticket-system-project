const express = require('express')  // To import express - This is the commen JS module syntax
const dotenv = require('dotenv').config() // To be able to use environment variables
const PORT = process.env.PORT || 5000   // const PORT = 5000   // Port for the backend server   // process.env to reach the .env file -> PORT is the used variable  // || 5000 to use port 5000 if the variable isn't available

const app = express()   // To initialize the app variable

// To create a route with express (Web Framework)   // React JS - Express - Mongoose (Node JS Web Server) - MongoDB
// app.get('/', (request, response) => {   // GET request -> To test that we can use the browser or postman
app.get('/', (request, response) => {   // GET request -> To test that we can use the browser or postman
    response.status(200).json({ message: 'Welcome to the Support Desk API' })   // To send a JSON file to the Web Server and a status (201 means OK)
})

app.use('/api/users', require('./routes/userRoutes'))   // Routes to /api/users - require('./routes/userRoutes') to bring it in from userRoutes.js

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))    // To listen on a specific port