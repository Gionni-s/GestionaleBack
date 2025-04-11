import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';
import { removeMinLevel } from './middleware';

const schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  foodGroupId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'foodGroup',
      options: {
        ref: 'Food-Group',
        foreignField: '_id',
        localField: 'foodGroupId',
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
    collectionName: 'foods',
    modelName: 'Food',
    extensionFunction: (schema) => {

      schema.pre('deleteOne', { document: false, query: true }, removeMinLevel);

      schema.pre('deleteOne', { document: true, query: false }, removeMinLevel);
    }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;