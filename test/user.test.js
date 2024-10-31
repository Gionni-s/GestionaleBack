const { default: mongoose } = require("mongoose");
const { addUser, deleteUser } = require("../src/api/users/middleware/express");
const logger = require("../src/services/logger");
const mongoUrl = require("../src/config").mongo.uri;

global.logger = logger

beforeEach(async () => {
  await mongoose.connect(mongoUrl)
})
afterEach(async () => {
  await mongoose.disconnect()
})

let user = {
  name: "nome",
  cognome: "surname",
  psw: "psw",
  mail: "mail",
  phone: "123123123"
}

describe("User", () => {
  it('User no data', async () => {
    try {
      await addUser(user)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('User correct', async () => {
    let userCreate
    user.mail = "mail@gmail.com"
    try {
      userCreate = await addUser(user)
    } catch (err) {
      console.log(err)
    }
    expect(userCreate).toBeTruthy()
    await deleteUser(userCreate)
  })
})