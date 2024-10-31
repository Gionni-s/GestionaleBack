const { default: mongoose } = require("mongoose");
const { addUser, deleteUser } = require("../src/api/users/middleware/express");
const { createNewBook, deleteBook } = require("../src/api/cookBooks/middleware/");
const logger = require("../src/services/logger");
const mongoUrl = require("../src/config").mongo.uri;

global.logger = logger

let createdUser
let book

beforeEach(async () => {
  await mongoose.connect(mongoUrl)
  createdUser = await addUser(user)
  book = {
    fkProprietario: createdUser["_id"]
  }
})
afterEach(async () => {
  await deleteUser(createdUser)
  await mongoose.disconnect()
})

let user = {
  name: "nome",
  cognome: "surname",
  psw: "psw",
  mail: "mail@mail1.com",
  phone: "123123123"
}




describe("Books", () => {
  it('Book no data', async () => {
    try {
      await createNewBook(book)
    } catch (err) {
      expect(err).toBeDefined()
    }
  })

  it('Book correct', async () => {
    let bookCreate
    book.name = "temp"
    try {
      bookCreate = await createNewBook(book)
    } catch (err) {
      console.log(err)
    }
    expect(bookCreate).toBeTruthy()
    await deleteBook(bookCreate)
  })
})