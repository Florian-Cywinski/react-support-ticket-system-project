const asyncHandler = require('express-async-handler')

// @description:    To register a new user
// @route:          /api/users
// @accsess:        Public
const registerUser = asyncHandler(async (request, response) => {
    const { name, email, password } = request.body  // To have the values which sends the user during registration in variables

    // Validation
    if (!name || !email || !password) {
        // return response.status(400).json({message: 'Please include all fields'})    // This is a way to handle an error without an custom error handler (another middleware) - 400 is a client error
        // With a middleware - errorMiddleware.js
        response.status(400)
        throw new Error('Please include all fields')
    }

    response.send('Register Route')    // To send a string to the Web Server
})

// @description:    To login a user
// @route:          /api/users/login
// @accsess:        Public
const loginUser = asyncHandler(async (request, response) => {
    response.send('Login Route')    // To send a string to the Web Server
})

module.exports = {  // To export the controller functions (the logic of the routes used in userRoutes.js)
    registerUser,
    loginUser
}