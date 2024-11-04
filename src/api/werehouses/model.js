const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema

let modelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  fkProprietario: {
    type: Schema.ObjectId,
    required: true,
  }
})

const model = mongoose.model('warehouse', modelSchema);

module.exports = model