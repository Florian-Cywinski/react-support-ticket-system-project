const asyncHandler = require('express-async-handler')   // express is the web-framework (backend)
const bcrypt = require('bcryptjs')  // To be able to hash the pw
const jwt = require('jsonwebtoken')  // To be able to hash the pw

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
            email: user.email,
            token: generateToken(user._id)  // To generate and store an individual web token (it's used for the frontend part)
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
    const {email, password} = request.body  // To have the values which sends the user during login in variables

    const user = await User.findOne({email})  // User is the model - findOne is a method of mongoose - {email: email} - await coz mongoose returns a Promise

    // Check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {  // if the user exists and the password matches (the typed in pw and the stored pw (db))
        response.status(200).json({ // To send (response) a status code and a json
            _id: user._id,  // _id coz that's the way mongoDB stores id's - ultimately a token will returned - user is the created user ._id comes from mongoose (I guess)
            name: user.name,
            email: user.email,
            token: generateToken(user._id)  // To generate and store an individual web token (it's used for the frontend part)
        })
    } else {
        response.status(401)    // 401 -> unauthorized
        throw new Error('Invalid credentials')
    }

    // response.send('Login Route')    // To send a string to the Web Server
})

// @description:    Get current user
// @route:          /api/users/me
// @accsess:        Private
const getMe = asyncHandler(async (request, response) => {
    // response.send('Meeee')
    response.status(200).json(request.user) // To get the whole user object - GET http://localhost:5000/api/users/me with Authorization -> Bearer Token
    // To only get back the id, email and name of the logged in user
    const user = {
        id: request.user._id,
        email: request.user.email,
        name: request.user.name,
    }
})

// Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})   // user._id from db - pw - expires in 30 days
}

module.exports = {  // To export the controller functions (the logic of the routes used in userRoutes.js)
    registerUser,
    loginUser,
    getMe
}