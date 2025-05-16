import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';

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
  },
  default: {
    type: Boolean,
    required: true,
    default: false
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'warehouses',
    modelName: 'Warehouse',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;