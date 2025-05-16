const { default: mongoose } = require('mongoose');
const User = require('../src/api/users/controller');
const Food = require('../src/api/foods/controller');
const logger = require('../src/services/logger');
const mongoUrl = require('../src/config').mongo.uri;

global.logger = logger;

let createdUser;
let food;

beforeEach(async () => {
  await mongoose.connect(mongoUrl);
  createdUser = await User.create(user);
  food = {
    fkProprietario: createdUser['_id']
  };
});
afterEach(async () => {
  await User.destroy(createdUser._id);
  await mongoose.disconnect();
});

const user = {
  name: 'nome',
  cognome: 'surname',
  password: 'psw',
  email: 'mail',
  phone: '123123123'
};




describe('Foods', () => {
  it('Food no data', async () => {
    try {
      await Food.create(food);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('Food correct', async () => {
    let foodCreate;
    food.name = 'test';
    try {
      foodCreate = await Food.create(food);
    } catch (err) {
      console.log(err);
    }
    expect(foodCreate).toBeTruthy();
    await Food.destroy(foodCreate._id);
  });
});