const mongoose = require('mongoose')
const User = require('../../api/models/user')
const USERS = require('../../data/user')
const bcrypt = require('bcrypt')

const bombUsers = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://jorgomez:root@cluster0.ezledm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )

    await User.collection.drop()
    console.log('Users deleted')

    const users = await Promise.all(
      USERS.map(async (userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        return { ...userData, password: hashedPassword }
      })
    )

    await User.insertMany(users)
    console.log('Users introduced')

    await mongoose.disconnect()
    console.log('server desconected')
  } catch (error) {
    console.log('error connecting')
  }
}

bombUsers()
