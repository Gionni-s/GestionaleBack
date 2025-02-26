const { default: mongoose } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

const Schema = require('mongoose').Schema;

let alimentiSchema = new Schema({
  foodId: {
    type: Schema.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  }
});

let schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  ingridients: {
    type: [alimentiSchema],
    required: true
  },
  cookbookId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'CookBook',
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
    collectionName: 'recipes',
    modelName: 'Recipe',
    extensionFunction: () => { }
  }
);

module.exports = model;