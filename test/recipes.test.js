const { default: mongoose } = require("mongoose");
const { addUser, deleteUser } = require("../src/api/users/middleware/express");
const { createNewRecipe, deleteRecipe } = require("../src/api/recipes/middleware");
const { createNewFood, deleteFood } = require("../src/api/foods/middleware");
const { createNewBook, deleteBook } = require("../src/api/cookBooks/middleware");
const logger = require("../src/services/logger");
const mongoUrl = require("../src/config").mongo.uri;

global.logger = logger

let createdUser
let createdBook
let createdFood

let recipe
let book
let food

beforeEach(async () => {
  await mongoose.connect(mongoUrl)
  createdUser = await addUser(user)

  food = {
    name: "temp",
    fkProprietario: createdUser["_id"]
  }

  book = {
    name: "temp",
    fkProprietario: createdUser["_id"]
  }

  createdBook = await createNewBook(book)
  createdFood = await createNewFood(food)

  recipe = {
    ingridients: [{ fkFood: createdFood["_id"], quantity: 1 }],
    fkBook: createdBook["_id"]
  }
})
afterEach(async () => {
  await deleteUser(createdUser)
  await deleteBook(createdBook)
  await deleteFood(createdFood)
  await mongoose.disconnect()
})

let user = {
  name: "nome",
  cognome: "surname",
  psw: "psw",
  mail: "mail@mail4.com",
  phone: "123123123"
}




describe("Recipes", () => {
  it('Recipe no data', async () => {
    try {
      await createNewRecipe(recipe)
    } catch (err) {
      expect(err).toBeDefined()
    }
  })

  it('Recipe correct', async () => {
    let recipeCreate
    recipe.name = "temp"
    try {
      recipeCreate = await createNewRecipe(recipe)
    } catch (err) {
      console.log(err)
    }
    expect(recipeCreate).toBeTruthy()
    await deleteRecipe(recipeCreate)
  })
})