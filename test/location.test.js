const { default: mongoose } = require("mongoose");
const { addUser, deleteUser } = require("../src/api/users/middleware/express");
const { createNewLocation, deleteLocation } = require("../src/api/locations/middleware");
const logger = require("../src/services/logger");
const mongoUrl = require("../src/config").mongo.uri;

global.logger = logger

let createdUser
let location

beforeEach(async () => {
  await mongoose.connect(mongoUrl)
  createdUser = await addUser(user)
  location = {
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
  mail: "mail@mail3.com",
  phone: "123123123"
}




describe("Locations", () => {
  it('Location no data', async () => {
    try {
      await createNewLocation(location)
    } catch (err) {
      expect(err).toBeDefined()
    }
  })

  it('Location correct', async () => {
    let locationCreate
    location.name = "temp"
    try {
      locationCreate = await createNewLocation(location)
    } catch (err) {
      console.log(err)
    }
    expect(locationCreate).toBeTruthy()
    await deleteLocation(locationCreate)
  })
})