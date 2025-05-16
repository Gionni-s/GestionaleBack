import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';

const schema = {
  budgetGroupTemplateId: {
    type: Schema.ObjectId
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  max: {
    type: Number,
    default: 0
  },
  validationPeriod: {
    type: {
      start: {
        type: Date
      },
      end: {
        type: Date
      }
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
    collectionName: 'budget-groups',
    modelName: 'Budget-Group',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;