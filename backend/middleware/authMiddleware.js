const jwt = require('jsonwebtoken') //  To generate a token the package called jsonwebtoken is necessary
const asyncHandler = require('express-async-handler')   // express is the web-framework (backend)
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {      // In Postman is a tab 'Authorization' (Bearer Token (Inhaber Token)) where it's possible to send 
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1] // req.headers.authorization is 'Bearer ds546gt4h6d4hdh4dz' -> To only have the token split is needed
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)   // To decode the token - decoded is an object
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')  // req.user -> To later be able to access the user inside any rout / controller method - select('-password') to exclude the pw from the data which are returned for this user

            next()  // To call the next pice of middleware
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {   // if there is no token
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = { protect }    // To export the protect function