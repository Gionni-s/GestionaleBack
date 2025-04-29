import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';
import { eventFather } from '../_utils/enum';

const schema = {
  title: {
    type: String
  },
  start: {
    type: Date,
  },
  endDate: {
    type: Date
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  materializedCreator: {
    type: Object
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
    collectionName: 'events',
    modelName: 'Event',
    extensionFunction: (schema) => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;