const { default: mongoose, Schema } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

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