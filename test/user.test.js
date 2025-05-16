const { default: mongoose } = require('mongoose');
const logger = require('../src/services/logger');
const { actions } = require('../src/api/users/controller');
const mongoUrl = require('../src/config').mongo.uri;

global.logger = logger;

beforeEach(async () => {
  await mongoose.connect(mongoUrl);
});
afterEach(async () => {
  await mongoose.disconnect();
});

const user = {
  name: 'nome',
  surname: 'surname',
  psw: 'pswasd12Sa@',
  mail: 'mail12',
  phone: '123123123'
};

describe('User', () => {
  it('User no data', async () => {
    try {
      await actions.createUser(user);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('User correct', async () => {
    let userCreate;
    user.mail = 'mail12@gmail.com';
    try {
      userCreate = await actions.createUser(user);
    } catch (err) {
      console.log(err);
    }
    expect(userCreate).toBeTruthy();
    await actions.destroy(userCreate._id);

  });
});