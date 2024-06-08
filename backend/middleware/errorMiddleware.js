const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500    // if res.statusCode (response.status(400) from the controller) exists save it otherwise it takes the code 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // To send the stack trace only in dev mode - To get extra information to debug
    })
}

module.exports = { errorHandler }   // To export this function - It's used in server.js