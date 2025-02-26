const { default: mongoose } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

const Schema = require('mongoose').Schema;

let schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  userId: {
    type: Schema.ObjectId,
    required: true,

    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'User',
      options: {
        ref: 'User',
        foreignField: '_id',
        localField: 'userId',
        justOne: true,
      },
    },
  },
  default: {
    type: Boolean,
    required: true,
    default: false
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'warehouses',
    modelName: 'Warehouse',
    extensionFunction: () => { }
  }
);

module.exports = model;