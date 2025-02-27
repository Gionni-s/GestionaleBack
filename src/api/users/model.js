const { default: { mongoose } } = require('mongoose');
const { RolesEnum } = require('../_utils/enum');
const ModelGenerator = require('../_generator/modelGenerator');
const { generateHexColor } = require('../_utils/function');

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
  profileImage: {
    type: mongoose.Types.ObjectId
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

module.exports = model;