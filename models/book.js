const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  roomid: String,
  start: Date,
  end: Date,
  firstname: String,
  lastname: String,
  phone: String
},
  {
    timestamps: true,
    versionKey: false
  }
)

const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel