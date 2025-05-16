const { default: mongoose } = require('mongoose');
const User = require('../src/api/users/controller');
const Werehouse = require('../src/api/werehouses/controller');
const logger = require('../src/services/logger');
const mongoUrl = require('../src/config').mongo.uri;

global.logger = logger;

let createdUser;


let werehouse;

beforeEach(async () => {
  await mongoose.connect(mongoUrl);
  createdUser = await User.create(user);


  werehouse = {
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

describe('Werehouses', () => {
  it('Werehouse no data', async () => {
    try {
      await Werehouse.create(werehouse);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('Werehouse correct', async () => {
    let werehouseCreate;
    werehouse.name = 'temp';
    try {
      werehouseCreate = await Werehouse.create(werehouse);
    } catch (err) {
      console.log(err);
    }
    expect(werehouseCreate).toBeTruthy();
    await Werehouse.destroy(werehouseCreate._id);
  });
});