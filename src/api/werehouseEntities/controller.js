const { getAllWarehouseEntitys, getSpecificWarehouseEntity, createNewWarehouseEntity } = require("./middleware")

let activity = {}

activity.getWarehouseEntitys = async (req, res) => {
  try {
    let fkMagazzino = req.query.magazzino
    return res.status(200).send(await getAllWarehouseEntitys({ fkMagazzino }))
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.getSpecificWarehouseEntity = async (req, res) => {
  try {
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
    res.status(200).send({ message: await getSpecificWarehouseEntity({ name, id }) })
  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.createWarehouseEntity = async (req, res) => {
  let scadenza = undefined
  let fkAlimento = undefined
  let fkLuogo = undefined
  let fkMagazzino = undefined
  try {
    scadenza = req.body.scadenza
    fkAlimento = req.body.fkAlimento
    fkLuogo = req.body.fkLuogo
    fkMagazzino = req.body.fkMagazzino
  } catch (err) {
    logger.error("Non sono stati mandati tutti i parametri necessari")
    return res.status(400).send("Non sono stati mandati tutti i parametri necessari")
  }
  try {
    return res.status(200).send(await createNewWarehouseEntity({ scadenza, fkAlimento, fkLuogo, fkMagazzino }))

  } catch (err) {
    logger.error(err.message)
    return res.status(500).send({ message: err.message })
  }
}

module.exports = {
  activity
}