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
    collectionName: 'cookBooks',
    modelName: 'Cookbook',
    extensionFunction: () => { }
  }
);

module.exports = model;