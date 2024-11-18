const { default: mongoose } = require('mongoose');
const ModelGenerator = require('../_utils/modelGenerator');

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
  }
};


const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'locations',
    modelName: 'Location'
  }
);

module.exports = model;