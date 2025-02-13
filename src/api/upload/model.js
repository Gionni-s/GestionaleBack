const { default: mongoose } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

const Schema = require('mongoose').Schema;

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
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'uploads',
    modelName: 'Upload'
  }
);

module.exports = model;