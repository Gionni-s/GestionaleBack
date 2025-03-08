import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';

let schema = {
  quantita: {
    type: Number,
    required: true
  },
  scadenza: {
    type: Date,
    required: true
  },
  foodId: {
    type: Schema.ObjectId,
    required: true,
    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'food',
      options: {
        ref: 'Food',
        foreignField: '_id',
        localField: 'foodId',
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

module.exports = model;