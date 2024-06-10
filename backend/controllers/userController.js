const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')  // To be able to hash the pw

const User = require('../models/userModel')

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

    // Find if user already exists
    const userExists = await User.findOne({email})  // User is the model - findOne is a method of mongoose - {email: email} - await coz mongoose returns a Promise

    if (userExists) {
        response.status(400)    // client error
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({    // create is a method from mongoose
        name,
        email,
        password: hashedPassword
    })

    if (user) { // if the user was created
        response.status(201).json({ // To send (response) a status code (everything is good and something was created) and a json
            _id: user._id,  // _id coz that's the way mongoDB stores id's - ultimately a token will returned - user is the created user ._id comes from mongoose (I guess)
            name: user.name,
            email: user.email
        })
    } else {
        response.status(400)
        throw new Error('Invalid user data')
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