const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  id: String,
  password: String
},
  {
    timestamps: true,
    versionKey: false
  }
)

const adminModel = mongoose.model('admin', adminSchema)

module.exports = adminModel