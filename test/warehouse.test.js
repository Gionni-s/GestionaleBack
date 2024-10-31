const { default: mongoose } = require("mongoose");
const { addUser, deleteUser } = require("../src/api/users/middleware/express");
const { createNewWarehouse, deleteWarehouse } = require("../src/api/werehouses/middleware");
const logger = require("../src/services/logger");
const mongoUrl = require("../src/config").mongo.uri;

global.logger = logger

let createdUser


let werehouse

beforeEach(async () => {
  await mongoose.connect(mongoUrl)
  createdUser = await addUser(user)


  werehouse = {
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
  mail: "mail@mail5.com",
  phone: "123123123"
}

describe("Werehouses", () => {
  it('Werehouse no data', async () => {
    try {
      await createNewWarehouse(werehouse)
    } catch (err) {
      expect(err).toBeDefined()
    }
  })

  it('Werehouse correct', async () => {
    let werehouseCreate
    werehouse.name = "temp"
    try {
      werehouseCreate = await createNewWarehouse(werehouse)
    } catch (err) {
      console.log(err)
    }
    expect(werehouseCreate).toBeTruthy()
    await deleteWarehouse(werehouseCreate)
  })
})