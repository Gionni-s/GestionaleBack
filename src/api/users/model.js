const { default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema

const RolesEnum = {
  USER: 'user',
  ADMIN: 'admin',
};

let modelSchema = new Schema({
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
  }
})

const model = mongoose.model('user', modelSchema);

module.exports = { model, RolesEnum }