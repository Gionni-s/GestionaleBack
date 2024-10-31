const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

let modelSchema = new Schema({
  scadenza: {
    type: Date,
    required: true
  },
  fkAlimento: {
    type: Schema.ObjectId,
    required: true,
  },
  fkLuogo: {
    type: Schema.ObjectId,
    required: true,
  },
  fkMagazzino: {
    type: Schema.ObjectId,
    required: true,
  }
});

const model = mongoose.model('warehouseEntity', modelSchema);

module.exports = model;""