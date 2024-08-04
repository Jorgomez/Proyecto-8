const { isTheUser } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  register,
  getUsers,
  getUserById,
  login,
  updateUser,
  deleteUser
} = require('../controllers/user')

const usersRouter = require('express').Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUserById)
usersRouter.post(
  '/register',

  upload('gallery/profileUser').fields([{ name: 'profileImg' }]),
  register
)

usersRouter.post('/login', login)
usersRouter.put(
  '/:id',
  [isTheUser],
  upload('gallery/profileUser').fields([{ name: 'profileImg' }]),
  updateUser
)
usersRouter.delete('/:id', [isTheUser], deleteUser)

module.exports = usersRouter
