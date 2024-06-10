const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']   // name is a mandatory key
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],    // email is a mandatory key
        unique: true    // the email has to be unique 
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isAdmin: {  // It's not used in the frontend / app - it's just an option in case it's needed at some time
        type: Boolean,
        required: true,
        default: false
    },
},
{
    timestamps: true    // created at / updated at
})

module.exports = mongoose.model('User', userSchema)     // To export the model - It's imported in userController.js - User is the name of the model and userSchema is the object