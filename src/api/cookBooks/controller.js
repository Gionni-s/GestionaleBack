const { getAllBooks, getSpecificBook, createNewBook } = require("./middleware")

let activity = {}

activity.getBooks = async (req, res) => {
  try {
    let idProprietario = res.locals.idProp
    return res.status(200).send(await getAllBooks({ idProprietario }))
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.getSpecificBook = async (req, res) => {
  try {
    let idProprietario = res.locals.idProp
    let id = req.params.id
    let name = undefined
    if (id == undefined) {
      logger.error("Il parametro id non dev'essere undefined")
      return res.status(400).send("Il parametro id non dev'essere undefined")
    }
    if (!parseInt(id)) {
      name = id
      id = undefined
    }
    res.status(200).send({ message: await getSpecificBook({ idProprietario, name, id }) })
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.createBook = async (req, res) => {
  let idProprietario = res.locals.idProp
  let name = undefined
  try {
    name = req.body.name
  } catch (err) {
    logger.error("Il Parametro name non è stato mandato correttamente")
    return res.status(400).send("Il parametro name non è stato mandato correattamente")
  }
  try {
    return res.status(200).send(await createNewBook({ idProprietario, name }))

  } catch (err) {
    logger.error(err.message)
    return res.status(500).send({ message: err.message })
  }
}

module.exports = {
  activity
}