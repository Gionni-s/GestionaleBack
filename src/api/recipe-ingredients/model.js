import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import { recipeIngredientMeasurement, RecipeIngredientMeasurementUnitEnum } from '../_utils/enum';
import ValidateSchema from '../_generator/validateSchema';

const schema = {
  quantity: {
    type: Number,
    required: true
  },
  measurementUnit: {
    type: String,
    enum: recipeIngredientMeasurement,
    default: RecipeIngredientMeasurementUnitEnum.g
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
    collectionName: 'recipe-ingredients',
    modelName: 'Recipe-Ingredient',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;