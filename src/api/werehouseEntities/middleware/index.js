const model = require("../model")
var ObjectId = require('mongoose').Types.ObjectId;

async function findWarehouseEntitys({ fkMagazzino, name = undefined, id = undefined }) {
  logger.info("Lettura del database WarehouseEntitys {id: " + id + ", name: " + name + ", userId: " + fkMagazzino + "}")
  let result = false

  if (name == undefined && id == undefined) {
    result = await model.find({ "fkMagazzino": new ObjectId(fkMagazzino) })
  }

  if (name != undefined && id == undefined) {
    // Query per leggere tutti i documenti
    result = await model.find({
      "name": name, "fkMagazzino": new ObjectId(fkMagazzino)
    })
  }

  if (name == undefined && id != undefined) {
    result = await model.find({ "id": id, "fkMagazzino": new ObjectId(fkMagazzino) })
  }
  return result == "" ? undefined : result
}

async function createNewWarehouseEntity({ fkMagazzino, fkLuogo, fkAlimento, scadenza }) {

  let result = await model.create({
    fkMagazzino: fkMagazzino,
    fkLuogo: fkLuogo,
    fkAlimento: fkAlimento,
    scadenza: scadenza,
  });

  if (!result) {
    throw new Error("Errore durante l'inserimento della WarehouseEntity")
  }

  return result
}

async function getAllWarehouseEntitys(fkMagazzino) {
  let result = undefined
  result = await findWarehouseEntitys(fkMagazzino)

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function getSpecificWarehouseEntity({ fkMagazzino, id = undefined, name = undefined }) {
  let result = undefined
  result = await findWarehouseEntitys({ fkMagazzino, id })

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function deleteWarehouseEntity(warehouseEntity) {
  return (await model.deleteOne({ "_id": warehouseEntity["_id"] }))
}

module.exports = {
  getAllWarehouseEntitys,
  getSpecificWarehouseEntity,
  createNewWarehouseEntity,
  deleteWarehouseEntity
}