import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';
import { addShoppingListElement, setChangedFields } from './middleware';

const schema = {
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
    },
  },
  quantity: {
    type: Number
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
    collectionName: 'Min-stock-levels',
    modelName: 'Min-stock-level',
    extensionFunction: (schema) => {
      schema.pre('save', setChangedFields);

      schema.post('save', addShoppingListElement);
    }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;