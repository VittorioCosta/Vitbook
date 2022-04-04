
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001
const connectDB = require('./dataBase')


// connect db
connectDB()

// middleware
app.use(express.json({ extended: true }))

// routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/posts', require('./routes/posts'))




app.get('/', (req,res) => res.send('API Running'))

app.listen(PORT, ()=> console.log(`⚡⚡⚡⚡⚡ Server on port: ${PORT}`))