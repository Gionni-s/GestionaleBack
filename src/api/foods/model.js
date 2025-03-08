import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';

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
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'foods',
    modelName: 'Food',
    extensionFunction: () => { }
  }
);

export default model;