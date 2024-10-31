const model = require("../model")
var ObjectId = require('mongoose').Types.ObjectId;
const populate = require("./aggregate")

async function findWarehouses({ idProprietario, name = undefined, id = undefined }) {
  logger.info("Lettura del database Warehouseo {id: " + id + ", name: " + name + ", userId: " + idProprietario + "}")
  let result = false

  if (name == undefined && id == undefined) {
    result = await model.aggregate(populate(idProprietario))
  }

  if (name != undefined && id == undefined) {
    // Query per leggere tutti i documenti
    result = await model.find({
      "name": name, "fkProprietario": new ObjectId(idProprietario)
    })
  }

  if (name == undefined && id != undefined) {
    result = await model.find({ "id": id, "fkProprietario": new ObjectId(idProprietario) })
  }
  return result == "" ? undefined : result
}

async function createNewWarehouse({ fkProprietario, name }) {
  if ((await findWarehouses({ fkProprietario, name })) != undefined) {
    throw new Error("Warehouseo di nome " + name + " già presente")
  }

  let result = await model.create({
    name: name,
    fkProprietario: fkProprietario
  });

  if (!result) {
    throw new Error("Errore durante l'inserimento del Warehouseo")
  }

  return result
}

async function getAllWarehouses(idProprietario) {
  let result = undefined
  result = await findWarehouses(idProprietario)

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function getSpecificWarehouse({ idProprietario, id = undefined, name = undefined }) {
  let result = undefined
  result = await findWarehouses({ idProprietario, id })

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function deleteWarehouse(warehouse) {
  return (await model.deleteOne({ "_id": warehouse["_id"] }))
}

module.exports = {
  getAllWarehouses,
  getSpecificWarehouse,
  createNewWarehouse,
  deleteWarehouse
}