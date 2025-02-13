const { default: mongoose } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

const Schema = require('mongoose').Schema;

let schema = {
  quantita: {
    type: Number,
    required: true
  },
  scadenza: {
    type: Date,
    required: true
  },
  foodId: {
    type: Schema.ObjectId,
    required: true,
  },
  locationId: {
    type: Schema.ObjectId,
    required: true,
  },
  warehouseId: {
    type: Schema.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
    required: true
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'warehouseEntities',
    modelName: 'WarehouseEntity'
  }
);

module.exports = model;