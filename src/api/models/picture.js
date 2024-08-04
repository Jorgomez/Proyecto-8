const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'pictures'
  }
)

const Picture = mongoose.model('pictures', pictureSchema, 'pictures')
module.exports = Picture
