const model = require("../model");
const populate = require("./aggregate");
var ObjectId = require('mongoose').Types.ObjectId;

async function findRecipe({ fkBook, name = undefined, id = undefined }) {
  logger.info("Lettura del database book {id: " + id + ", name: " + name + ", userId: " + fkBook + "}")
  let result = false

  if (name == undefined && id == undefined) {
    result = await model.aggregate(populate(fkBook))
  }

  if (name != undefined && id == undefined) {
    // Query per leggere tutti i documenti
    result = await model.find({
      "name": name, "fkBook": new ObjectId(fkBook)
    })
  }

  if (name == undefined && id != undefined) {
    result = await model.find({ "_id": id, "fkBook": new ObjectId(fkBook) })
  }
  return result == "" ? undefined : result
}

async function createNewRecipe({ fkBook, name, ingridients }) {
  if ((await findRecipe({ fkBook, name })) != undefined) {
    throw new Error("book di nome " + name + " già presente")
  }

  let result = new model({
    name: name,
    ingridients: [],
    fkBook: new ObjectId(fkBook)
  });

  ingridients.forEach(element => {
    let resultIngrid = {
      fkFood: new ObjectId(element.fkFood),
      quantity: element.quantity
    }
    result.ingridients.push(resultIngrid)
  });

  await result.save()

  if (!result) {
    throw new Error("Errore durante l'inserimento dell'Recipe")
  }

  return result
}

async function getAllRecipes(fkBook) {
  let result = undefined
  result = await findRecipe(fkBook)

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function getSpecificRecipe({ idProprietario, id = undefined, name = undefined }) {
  let result = undefined
  result = await findRecipe({ idProprietario, id })

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function deleteRecipe(recipe) {
  return (await model.deleteOne({ "_id": recipe["_id"] }))
}

module.exports = {
  findRecipe,
  getAllRecipes,
  getSpecificRecipe,
  createNewRecipe,
  deleteRecipe
}