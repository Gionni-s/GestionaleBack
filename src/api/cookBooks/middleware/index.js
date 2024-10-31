const model = require("../model");
const populate = require("./aggregate");
var ObjectId = require('mongoose').Types.ObjectId;

async function findBook({ idProprietario, name = undefined, id = undefined }) {
  logger.info("Lettura del database book {id: " + id + ", name: " + name + ", userId: " + idProprietario + "}")
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
    result = await model.find({ "_id": id, "fkProprietario": new ObjectId(idProprietario) })
  }
  return result == "" ? undefined : result
}

async function createNewBook({ fkProprietario, name }) {
  if ((await findBook({ fkProprietario, name })) != undefined) {
    throw new Error("book di nome " + name + " già presente")
  }

  let result = await model.create({
    name: name,
    fkProprietario: fkProprietario
  });

  if (!result) {
    throw new Error("Errore durante l'inserimento dell'book")
  }

  return result
}

async function getAllBooks(idProprietario) {
  let result = undefined
  result = await findBook(idProprietario)

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function getSpecificBook({ idProprietario, id = undefined, name = undefined }) {
  let result = undefined
  result = await findBook({ idProprietario, id })

  if (!result) {
    throw new Error("Nessun elemento trovato")
  }

  return result
}

async function deleteBook(book) {
  return (await model.deleteOne({ "_id": book["_id"] }))
}

module.exports = {
  findBook,
  getAllBooks,
  getSpecificBook,
  createNewBook,
  deleteBook
}