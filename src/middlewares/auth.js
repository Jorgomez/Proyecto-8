const Picture = require('../api/models/picture')
const User = require('../api/models/user')
const { verifyJwt } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json('no estas autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)
    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

const isTheUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { id: idUserReq } = req.params
    if (!token) {
      return res.status(400).json('no estas autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id: tokenId } = verifyJwt(parsedToken)

    const user = await User.findById(tokenId)

    if (user.id === idUserReq) {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json('You are not the user')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}
const uploadPicture = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { userId } = req.body
    if (!token) {
      return res.status(400).json('no estas autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id: tokenId } = verifyJwt(parsedToken)
    const user = await User.findById(tokenId)

    if (user.id === userId) {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('You can not uplaod a picture from another user')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

const UpdateOrDeletePicture = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { id } = req.params
    const picture = await Picture.findById(id)

    if (!token) {
      return res.status(400).json('no estas autorizado')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id: tokenId } = verifyJwt(parsedToken)
    const user = await User.findById(tokenId)

    if (user.id === picture.userId.toString()) {
      user.password = null
      req.user = user
      next()
    } else {
      return res
        .status(400)
        .json('You can not uplaod a picture from another user')
    }
  } catch (error) {
    return res.status(400).json('no estas autorizado')
  }
}

module.exports = {
  isAuth,
  isTheUser,
  UpdateOrDeletePicture,
  uploadPicture
}
