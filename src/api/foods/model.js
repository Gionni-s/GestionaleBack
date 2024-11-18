const { default: { mongoose }, Schema } = require('mongoose');
const ModelGenerator = require('../_utils/modelGenerator');

const schema = {
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
    collectionName: 'foods',
    modelName: 'Food'
  }
);

module.exports = model;

// module.exports = Entity;