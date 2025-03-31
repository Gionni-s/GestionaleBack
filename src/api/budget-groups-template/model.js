import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';
import { budgeGroupExpirationInterval, BudgetGroupExpirationIntervalEnum } from '../_utils/enum';

const resetPeriodSchemaToBuild = new mongoose.Schema({
  number: {
    type: Number,
    default: 1
  },
  interval: {
    type: String,
    enum: budgeGroupExpirationInterval,
    default: BudgetGroupExpirationIntervalEnum.MONTHLY
  }
});

const resetPeriodSchema = new Schema(resetPeriodSchemaToBuild, { _id: false, id: false });

let schema = {
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
  resetPeriod: {
    type: resetPeriodSchema
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
    collectionName: 'budget-groups-template',
    modelName: 'Budget-Group-Template',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;