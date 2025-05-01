import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';

let schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  ingredients: {
    type: [Object],
    virtual: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      options: {
        ref: 'Recipe-Ingredient',
        foreignField: 'recipeId',
        localField: '_id',
        justOne: false,
        options: {
          populate: 'food',
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
  note: {
    type: String
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

export const bodySchema = ValidateSchema(schema);
export default model;