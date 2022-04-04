const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL

const connectDB = async ()=> {
    
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true
        })
        console.log('MongoDB connected... ');

    } catch (err) {
        console.log(err.message);

        // exit process with failure
        process.exit(1)
        
    }
}

module.exports = connectDB