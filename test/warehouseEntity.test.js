const { default: mongoose } = require("mongoose");
const { addUser, deleteUser } = require("../src/api/users/middleware/express");
const { createNewWarehouse, deleteWarehouse } = require("../src/api/werehouses/middleware");
const { createNewFood, deleteFood } = require("../src/api/foods/middleware");
const { createNewLocation, deleteLocation } = require("../src/api/locations/middleware");
const { createNewWarehouseEntity, deleteWarehouseEntity } = require("../src/api/werehouseEntities/middleware");
const mongoUrl = require("../src/config").mongo.uri;
const logger = require("../src/services/logger");

global.logger = logger

let createdUser


let werehouse
let warehouseEntity
let food = {
  name: "temp",
}
let location = {
  name: "temp",
}

let warehouseCreated

beforeEach(async () => {
  await mongoose.connect(mongoUrl)
  createdUser = await addUser(user)
  food.fkProprietario = createdUser["_id"]
  location.fkProprietario = createdUser["_id"]

  foodCreated = await createNewFood(food)
  locationCreated = await createNewLocation(location)

  werehouse = {
    name: "temp",
    fkProprietario: createdUser["_id"]
  }

  warehouseCreated = await createNewWarehouse(werehouse)

  warehouseEntity = {
    fkAlimento: foodCreated["_id"],
    fkLuogo: locationCreated["_id"],
    fkMagazzino: warehouseCreated["_id"]
  }
})
afterEach(async () => {
  await deleteUser(createdUser)
  await deleteFood(foodCreated)
  await deleteLocation(locationCreated)
  await deleteWarehouse(warehouseCreated)
  await mongoose.disconnect()
})

let user = {
  name: "nome",
  cognome: "surname",
  psw: "psw",
  mail: "mail@mail6.com",
  phone: "123123123"
}

describe("Werehouses", () => {
  it('Werehouse no data', async () => {
    try {
      await createNewWarehouseEntity(warehouseEntity)
    } catch (err) {
      expect(err).toBeDefined()
    }
  })

  it('Werehouse correct', async () => {
    let werehouseCreate
    warehouseEntity.scadenza = new Date()
    try {
      werehouseCreate = await createNewWarehouseEntity(warehouseEntity)
    } catch (err) {
      console.log(err)
    }
    expect(werehouseCreate).toBeTruthy()
    await deleteWarehouseEntity(werehouseCreate)
  })
})