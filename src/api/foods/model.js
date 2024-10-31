const { default: { model }, Schema } = require('mongoose');

const Entity = model('food', {
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
});

module.exports = Entity;