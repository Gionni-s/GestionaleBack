import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';
import { amountType, AmountTypeEnum } from '../_utils/enum';

let schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  amount: {
    type: Number,
    required: true
  },
  amountType: {
    type: String,
    enum: amountType,
    default: AmountTypeEnum.EUR,
  },
  beneficiary: {
    type: String
  },
  groupTemplateId: {
    type: Schema.ObjectId,
  },
  groupId: {
    type: Schema.ObjectId,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'Budget-Group',
      options: {
        ref: 'Budget-Group',
        foreignField: '_id',
        localField: 'groupId',
        justOne: true,
      },
    },
  },
  note: {
    type: String
  },
  dateTime: {
    type: Date,
    default: () => new Date()
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
    collectionName: 'budgets',
    modelName: 'Budget',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;