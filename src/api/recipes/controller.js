const { getAllRecipes, getSpecificRecipe, createNewRecipe } = require("./middleware")

let activity = {}

activity.getRecipes = async (req, res) => {
  try {
    let fkBook = req.query.fkBook
    return res.status(200).send(await getAllRecipes({ fkBook }))
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.getSpecificRecipe = async (req, res) => {
  try {
    let { idProprietario } = req.params
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
    res.status(200).send({ message: await getSpecificRecipe({ idProprietario, name, id }) })
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.createRecipe = async (req, res) => {
  let name = undefined
  let ingridients = undefined
  let fkBook = undefined
  try {
    name = req.body.name
    ingridients = req.body.ingridients
    fkBook = req.body.fkBook
  } catch (err) {
    logger.error("Il Parametro name non è stato mandato correttamente")
    return res.status(400).send("Il parametro name non è stato mandato correattamente")
  }
  try {
    return res.status(200).send(await createNewRecipe({ fkBook, name, ingridients }))

  } catch (err) {
    logger.error(err.message)
    return res.status(500).send({ message: err.message })
  }
}

module.exports = {
  activity
}