import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';

const schema = {
  file: {
    type: Object,
    required: true,
  },
  type: {
    type: String
  },
  userId: {
    type: Schema.ObjectId,
    required: true,

    // virtualPopulation: {
    //   odinAutoPopulation: true,
    //   as: 'User',
    //   options: {
    //     ref: 'User',
    //     foreignField: '_id',
    //     localField: 'userId',
    //     justOne: true,
    //   },
    // },
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'uploads',
    modelName: 'Upload',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;