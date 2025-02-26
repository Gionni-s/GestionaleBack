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
    collectionName: 'foods',
    modelName: 'Food',
    extensionFunction: () => { }
  }
);

module.exports = model;

// module.exports = Entity;