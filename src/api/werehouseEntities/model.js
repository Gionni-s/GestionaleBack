const { default: mongoose, Schema } = require('mongoose');
const ModelGenerator = require('../_generator/modelGenerator');

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
      as: 'Food',
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
      as: 'Location',
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
      as: 'Warehouse',
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
    collectionName: 'warehouseEntities',
    modelName: 'WarehouseEntity',
    extensionFunction: () => { }
  }
);

module.exports = model;