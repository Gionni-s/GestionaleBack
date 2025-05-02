const { default: mongoose } = require('mongoose');
const User = require('../src/api/users/controller');
const Recipe = require('../src/api/recipes/controller');
const Food = require('../src/api/foods/controller');
const CookBook = require('../src/api/cook-books/controller');
const logger = require('../src/services/logger');
const mongoUrl = require('../src/config').mongo.uri;

global.logger = logger;

let createdUser;
let createdBook;
let createdFood;

let recipe;
let book;
let food;

beforeEach(async () => {
  await mongoose.connect(mongoUrl);
  createdUser = await User.create(user);

  food = {
    name: 'temp',
    fkProprietario: createdUser['_id']
  };

  book = {
    name: 'temp',
    fkProprietario: createdUser['_id']
  };

  createdBook = await CookBook.create(book);
  createdFood = await Food.create(food);

  recipe = {
    ingridients: [{ fkFood: createdFood['_id'], quantity: 1 }],
    fkBook: createdBook['_id']
  };
});
afterEach(async () => {
  await User.destroy(createdUser._id);
  await CookBook.destroy(createdBook._id);
  await Food.destroy(createdFood._id);
  await mongoose.disconnect();
});

let user = {
  name: 'nome',
  cognome: 'surname',
  password: 'psw',
  email: 'mail',
  phone: '123123123'
};



describe('Recipes', () => {
  it('Recipe no data', async () => {
    try {
      await Recipe.create(recipe);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('Recipe correct', async () => {
    let recipeCreate;
    recipe.name = 'temp';
    try {
      recipeCreate = await Recipe.create(recipe);
    } catch (err) {
      console.log(err);
    }
    expect(recipeCreate).toBeTruthy();
    await Recipe.destroy(recipeCreate._id);
  });
});