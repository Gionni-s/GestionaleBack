const { default: mongoose, Schema } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

let schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  ingridients: {
    type: [Object],
    virtual: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      options: {
        ref: 'Recipe-Ingridients',
        foreignField: 'recipeId',
        localField: '_id',
        justOne: false,
        options: {
          path: 'food'
        }
      },
    }
  },
  cookbookId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'cookBook',
      options: {
        ref: 'Cookbook',
        foreignField: '_id',
        localField: 'cookbookId',
        justOne: true,
      },
    },
  },
  userId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'user',
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
    collectionName: 'recipes',
    modelName: 'Recipe',
    extensionFunction: () => { }
  }
);

module.exports = model;