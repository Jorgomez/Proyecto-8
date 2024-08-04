const bcrypt = require('bcrypt')

const { generateSign } = require('../../config/jwt')
const User = require('../models/user')
const { deleteFile } = require('../../utils/delete.file')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error getUsers Function')
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    userFound = await User.findById(id)
    return res.status(200).json(userFound)
  } catch (error) {
    return res.status(404).json('error in the getUserById function')
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    if (req.files) {
      newUser.profileImg = req.files.profileImg[0].path
    }
    const userDuplicated = await User.findOne({ email: req.body.email })
    if (userDuplicated) {
      return res.status(400).json('User duplicated')
    }
    const userSaved = await newUser.save()

    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('error register Function')
  }
}
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name })

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)
        return res.status(200).json({
          user,
          token
        })
      } else {
        return res.status(400).json('User or passwword wrong')
      }
    } else {
      return res.status(400).json('User or passwword wrong')
    }
  } catch (error) {
    return res.status(400).json('error login Function')
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateReq = req.body
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json('User not found')
    }
    if (req.files) {
      deleteFile(user.profileImg)
      updateReq.profileImg = req.files.profileImg[0].path
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateReq, {
      new: true
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json('error to update')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    deleteFile(userDeleted.profileImg)
    return res.status(200).json({ mensaje: 'Deleted User', userDeleted })
  } catch (error) {
    return res.status(400).json('error delete Function')
  }
}
module.exports = {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}
