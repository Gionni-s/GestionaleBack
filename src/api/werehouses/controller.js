const { getAllWarehouses, getSpecificWarehouse, createNewWarehouse } = require("./middleware")

let activity = {}

activity.getWarehouses = async (req, res) => {
  try {
    let { idProprietario } = req.params
    return res.status(200).send(await getAllWarehouses({ idProprietario }))
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.getSpecificWarehouse = async (req, res) => {
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
    res.status(200).send({ message: await getSpecificWarehouse({ idProprietario, name, id }) })
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.createWarehouse = async (req, res) => {
  let { idProprietario } = req.params
  let name = undefined
  try {
    name = req.body.name
  } catch (err) {
    logger.error("Il Parametro name non è stato mandato correttamente")
    return res.status(400).send("Il parametro name non è stato mandato correattamente")
  }
  try {
    return res.status(200).send(await createNewWarehouse({ idProprietario, name }))

  } catch (err) {
    logger.error(err.message)
    return res.status(500).send({ message: err.message })
  }
}

module.exports = {
  activity
}