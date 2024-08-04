require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const usersRouter = require('./src/api/routes/user')
const picturesRouter = require('./src/api/routes/picture')
const cloudinary = require('cloudinary').v2

const app = express()

connectDB()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/pictures', picturesRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('route not found')
})

app.listen(3000, () => {
  console.log('Server deployed at http://localhost:3000')
})
