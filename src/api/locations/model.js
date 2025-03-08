import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';

let schema = {
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
    collectionName: 'locations',
    modelName: 'Location',
    extensionFunction: () => { }
  }
);

module.exports = model;