const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)    // To show the MongoDB host connected to // .cyan.underline comes from the colors package (server.js)   // MongoDB Connected: ac-0o...bd-shard-00-02.rn...rzd.mongodb.net
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1) // To exit the entire process if it fails
    }
}

module.exports = connectDB  // To export it (server.js)