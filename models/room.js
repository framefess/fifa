const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
  name: String,
  description: String
},
  {
    timestamps: true,
    versionKey: false
  }
)

const roomModel = mongoose.model('room', roomSchema)

module.exports = roomModel