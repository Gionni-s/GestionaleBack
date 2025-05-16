const { default: mongoose } = require('mongoose');
const User = require('../src/api/users/controller');
const CookBook = require('../src/api/cook-books/controller');
const logger = require('../src/services/logger');
const mongoUrl = require('../src/config').mongo.uri;

global.logger = logger;

let createdUser;
let book;

beforeEach(async () => {
  await mongoose.connect(mongoUrl);
  createdUser = await User.create(user);
  book = {
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



describe('Books', () => {
  it('Book no data', async () => {
    try {
      await CookBook.create(book);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('Book correct', async () => {
    let bookCreate;
    book.name = 'temp';
    try {
      bookCreate = await CookBook.create(book);
    } catch (err) {
      console.log(err);
    }
    expect(bookCreate).toBeTruthy();
    await CookBook.destroy(bookCreate._id);
  });
});