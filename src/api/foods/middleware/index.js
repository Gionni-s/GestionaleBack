const model = require("../model")
var ObjectId = require('mongoose').Types.ObjectId;

async function findFood({ idProprietario, name = undefined, id = undefined }) {
  logger.info("Lettura del database Alimenti {id: " + id + ", name: " + name + ", userId: " + idProprietario + "}")
  let result = false

  if (name == undefined && id == undefined) {
    result = await model.find({ "fkProprietario": new ObjectId(idProprietario) })
  }

  if (name != undefined && id == undefined) {
    // Query per leggere tutti i documenti
    result = await model.find({
      "name": name, "fkProprietario": new ObjectId(idProprietario)
    })
  }

  if (name == undefined && id != undefined) {
    result = await model.find({ "_id": id, "fkProprietario": new ObjectId(idProprietario) })
  }
  return result == "" ? undefined : result
}

async function createNewFood({ fkProprietario, name }) {
  if ((await findFood({ fkProprietario, name })) != undefined) {
    throw new Error("Alimento di nome " + name + " già presente")
  }
  let result = await model.create({
    name: name,
    fkProprietario: fkProprietario
  });

  if (!result) {
    throw new Error("Errore durante l'inserimento dell'alimento")
  }

  return result
}

async function getAllFoods(idProprietario) {
  let result = undefined
  result = await findFood(idProprietario)

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function getSpecificFood({ idProprietario, id = undefined, name = undefined }) {
  let result = undefined
  result = await findFood({ idProprietario, id })

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function deleteFood(food) {
  return (await model.deleteOne({ "_id": food["_id"] }))
}

module.exports = {
  findFood,
  getAllFoods,
  getSpecificFood,
  createNewFood,
  deleteFood
}