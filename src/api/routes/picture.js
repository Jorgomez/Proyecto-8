const {
  uploadPicture,
  UpdateOrDeletePicture
} = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  post,
  getPictures,
  getPictureById,
  updatePicture,
  deletePicture
} = require('../controllers/picture')

const picturesRouter = require('express').Router()

picturesRouter.get('/', getPictures)
picturesRouter.get('/:id', getPictureById)
picturesRouter.post(
  '/',
  upload('gallery/pictures').fields([{ name: 'picture' }]),
  [uploadPicture],
  post
)
picturesRouter.put(
  '/:id',
  [UpdateOrDeletePicture],
  upload('gallery/pictures').fields([{ name: 'picture' }]),
  updatePicture
)
picturesRouter.delete('/:id', [UpdateOrDeletePicture], deletePicture)

module.exports = picturesRouter
