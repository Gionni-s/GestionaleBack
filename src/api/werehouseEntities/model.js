const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

let modelSchema = new Schema({
  quantita: {
    type: Number,
    required: true
  },
  scadenza: {
    type: Date,
    required: true
  },
  fkFood: {
    type: Schema.ObjectId,
    required: true,
  },
  fkLocation: {
    type: Schema.ObjectId,
    required: true,
  },
  fkWarehouse: {
    type: Schema.ObjectId,
    required: true,
  },
  fkProprietario: {
    type: Schema.ObjectId,
    required: true
  }
});

const model = mongoose.model('warehouseEntity', modelSchema);

module.exports = model;