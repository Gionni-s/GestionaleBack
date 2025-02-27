const { default: mongoose, Schema } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

let schema = {
  file: {
    type: Object,
    required: true,
  },
  type: {
    type: String
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
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'uploads',
    modelName: 'Upload',
    extensionFunction: () => { }
  }
);

module.exports = model;