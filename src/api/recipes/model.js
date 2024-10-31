const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

let alimentiSchema = new Schema({
  fkFood: {
    type: Schema.ObjectId,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

let modelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  ingridients: {
    type: [alimentiSchema],
    default: undefined,
    required: true
  },
  fkBook: {
    type: Schema.ObjectId,
    required: true,
  }
});

const model = mongoose.model('recipe', modelSchema);

module.exports = model;