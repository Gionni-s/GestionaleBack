const { default: mongoose } = require("mongoose");
const { addUser, deleteUser } = require("../src/api/users/middleware/express");
const { createNewFood, deleteFood } = require("../src/api/foods/middleware");
const logger = require("../src/services/logger");
const mongoUrl = require("../src/config").mongo.uri;

global.logger = logger

let createdUser
let food

beforeEach(async () => {
  await mongoose.connect(mongoUrl)
  createdUser = await addUser(user)
  food = {
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
  mail: "mail@mail2.com",
  phone: "123123123"
}




describe("Foods", () => {
  it('Food no data', async () => {
    try {
      await createNewFood(food)
    } catch (err) {
      expect(err).toBeDefined()
    }
  })

  it('Food correct', async () => {
    let foodCreate
    food.name = "test"
    try {
      foodCreate = await createNewFood(food)
    } catch (err) {
      console.log(err)
    }
    expect(foodCreate).toBeTruthy()
    await deleteFood(foodCreate)
  })
})