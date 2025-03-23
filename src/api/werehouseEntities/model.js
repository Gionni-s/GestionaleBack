import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';

let schema = {
  name: {
    type: String,
    required: true
  },
  quantita: {
    type: Number,
    required: true,
    default: 1
  },
  scadenza: {
    type: Date,
    required: true
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
  locationId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'location',
      options: {
        ref: 'Location',
        foreignField: '_id',
        localField: 'locationId',
        justOne: true,
      },
    },
  },
  warehouseId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'warehouse',
      options: {
        ref: 'Warehouse',
        foreignField: '_id',
        localField: 'warehouseId',
        justOne: true,
      },
    },
  },
  userId: {
    type: Schema.ObjectId,
    required: true,

    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'user',
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
    collectionName: 'warehouseEntities',
    modelName: 'WarehouseEntity',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;