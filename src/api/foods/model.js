const { default: { mongoose }, Schema } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

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

    virtual: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      options: {
        ref: 'User',
        foreignField: 'userId',
        localField: '_id',
        justOne: false,
      },
    },
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