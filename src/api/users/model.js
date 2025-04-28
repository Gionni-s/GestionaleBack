import mongoose, { Schema } from 'mongoose';
import { RolesEnum } from '../_utils/enum';
import ModelGenerator from '../_generator/modelGenerator';
import { generateHexColor } from '../_utils/function';
import ValidateSchema from '../_generator/validateSchema';

const schema = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true
  },
  isConfimer: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  profileImageId: {
    type: Schema.ObjectId,

    virtualPopulation: {
      odinAutoPopulation: true,
      as: 'profileImage',
      options: {
        ref: 'Upload',
        foreignField: '_id',
        localField: 'profileImageId',
        justOne: true,
      },
    },
  },
  role: {
    type: String,
    enum: RolesEnum,
    default: 'user'
  },
  phoneNumber: {
    type: Number
  },
  inEnabled: {
    type: Boolean,
    default: true
  },
  dateCreation: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: generateHexColor()
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'users',
    modelName: 'User',
    extensionFunction: () => { }
  }
);

export const bodySchema = ValidateSchema(schema);
export default model;