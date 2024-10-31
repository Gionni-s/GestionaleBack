const logger = require("../../../services/logger");
const model = require("../model")
var ObjectId = require('mongoose').Types.ObjectId;

async function findLocation({ idProprietario, name = undefined, id = undefined }) {
  logger.info("Lettura del database Luoghi {id: " + id + ", name: " + name + ", userId: " + idProprietario + "}")
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
    result = await model.find({ "_id": new ObjectId(id), "fkProprietario": new ObjectId(idProprietario) })
  }
  return result == "" ? undefined : result
}

async function getAllLocations(idProprietario) {
  let result = undefined
  result = await findLocation(idProprietario)

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function getSpecificLocation({ idProprietario, id = undefined, name = undefined }) {
  let result = undefined
  result = await findLocation({ idProprietario, id })

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function createNewLocation({ fkProprietario, name }) {
  if ((await findLocation({ fkProprietario, name })) != undefined) {
    throw new Error("Luogo di nome " + name + " già presente")
  }

  let result = await model.create({
    name: name,
    fkProprietario: fkProprietario
  });

  if (!result) {
    throw new Error("Errore durante l'inserimento del luogo")
  }

  return result
}

async function deleteLocation(location) {
  return (await model.deleteOne({ "_id": location["_id"] }))
}


module.exports = {
  findLocation,
  getAllLocations,
  getSpecificLocation,
  createNewLocation,
  deleteLocation
}