const registerUser = (request, response) => {
    response.send('Register Route')    // To send a string to the Web Server
}

const loginUser = (request, response) => {
    response.send('Login Route')    // To send a string to the Web Server
}

module.exports = {  // To export the controller functions (the logic of the routes used in userRoutes.js)
    registerUser,
    loginUser
}