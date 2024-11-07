const { default: mongoose } = require('mongoose');
const ModelGenerator = require('../_utils/modelGenerator');

const Schema = require('mongoose').Schema;

let alimentiSchema = new Schema({
  idFood: {
    type: Schema.ObjectId,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

let schema = {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  ingridients: {
    type: [alimentiSchema],
    default: undefined,
    required: true
  },
  bookId: {
    type: Schema.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
    required: true,
  }
};

const model = ModelGenerator(mongoose)(
  {
    schema,
    collectionName: 'recipes',
    modelName: 'Recipe'
  }
);

module.exports = model;

// const model = mongoose.model('recipe', modelSchema);

// module.exports = model;