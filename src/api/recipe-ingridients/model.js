const { default: mongoose, Schema } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

let schema = {
  quantity: {
    type: Number,
    required: true
  },
  recipeId: {
    type: Schema.ObjectId,
    required: true
  },
  foodId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'food',
      options: {
        ref: 'Food',
        foreignField: '_id',
        localField: 'foodId',
        justOne: true,
      },
    }
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
    collectionName: 'recipe-ingridients',
    modelName: 'Recipe-Ingridients',
    extensionFunction: () => { }
  }
);

module.exports = model;