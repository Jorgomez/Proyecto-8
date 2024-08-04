const { deleteFile } = require('../../utils/delete.file')
const Picture = require('../models/picture')

const getPictures = async (req, res, next) => {
  try {
    const pictures = await Picture.find().populate('userId')
    return res.status(200).json(pictures)
  } catch (error) {
    return res.status(400).json('error getPictures Function')
  }
}

const getPictureById = async (req, res, next) => {
  try {
    const { id } = req.params
    pictureFound = await Picture.findById(id).populate('userId')
    return res.status(200).json(pictureFound)
  } catch (error) {
    return res.status(404).json('error in the getPictureById function')
  }
}

const post = async (req, res, next) => {
  try {
    const newPicture = new Picture(req.body)

    if (req.files) {
      newPicture.picture = req.files.picture[0].path
    }

    const pictureSaved = await newPicture.save()

    return res.status(201).json(pictureSaved)
  } catch (error) {
    return res.status(400).json('error post Function')
  }
}

const updatePicture = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateReq = req.body
    const picture = await Picture.findById(id)
    if (!picture) {
      return res.status(404).json('Picture not found')
    }

    if (req.files) {
      deleteFile(picture.picture)
      updateReq.picture = req.files.picture[0].path
    }

    const updatedPicture = await Picture.findByIdAndUpdate(id, updateReq, {
      new: true
    })

    return res.status(200).json(updatedPicture)
  } catch (error) {
    return res.status(400).json('error to update')
  }
}

const deletePicture = async (req, res, next) => {
  try {
    const { id } = req.params
    const pictureDeleted = await Picture.findByIdAndDelete(id)
    deleteFile(pictureDeleted.picture)
    return res.status(200).json({ mensaje: 'Deleted User', pictureDeleted })
  } catch (error) {
    return res.status(400).json('error delete Function')
  }
}
module.exports = {
  post,
  getPictures,
  getPictureById,
  updatePicture,
  deletePicture
}
