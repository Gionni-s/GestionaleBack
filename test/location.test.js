const { default: mongoose } = require('mongoose');
const User = require('../src/api/users/controller');
const Location = require('../src/api/locations/controller');
const logger = require('../src/services/logger');
const mongoUrl = require('../src/config').mongo.uri;

global.logger = logger;

let createdUser;
let location;

beforeEach(async () => {
  await mongoose.connect(mongoUrl);
  createdUser = await User.create(user);
  location = {
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



describe('Locations', () => {
  it('Location no data', async () => {
    try {
      await Location.create(location);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('Location correct', async () => {
    let locationCreate;
    location.name = 'temp';
    try {
      locationCreate = await Location.create(location);
    } catch (err) {
      console.log(err);
    }
    expect(locationCreate).toBeTruthy();
    await deleteLocation(locationCreate._id);
  });
});