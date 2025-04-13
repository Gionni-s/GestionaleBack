import mongoose, { Schema } from 'mongoose';
import ModelGenerator from '../_generator/modelGenerator';
import ValidateSchema from '../_generator/validateSchema';
import { shoppingListElement, ShoppingListElementStatusEnum } from '../_utils/enum';
import { addShoppingElement } from './middleware';

let schema = {
  foodId: {
    type: Schema.ObjectId,

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
  quantity: {
    type: Number
  },
  status: {
    type: String,
    enum: shoppingListElement,
    default: ShoppingListElementStatusEnum.TO_BUY
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
    collectionName: 'shopping-list',
    modelName: 'Shopping-list',
    extensionFunction: (schema) => {
      schema.statics.addShoppingElement = addShoppingElement;
    }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;