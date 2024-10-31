const { createToken } = require("../../services/token")
const { findUser, addUser } = require("./middleware/express")
const Entity = require("./model").model

let activity = {}

activity.login = async (req, res) => {
  try {
    let mail = req.params.mail
    let psw = req.params.psw


    if (mail == undefined || psw == undefined) {
      res.status(500).send("I campi inviati non devono essere undefined")
      return
    }
    let user = await findUser({ mail, psw })

    if (user.length == 1) {
      return res.status(200).send(createToken({ "id": (user[0])["_id"] }))
    }

    if (user.length == 1) {
      var token = createToken({ "id": (user[0])["_id"] })
      res.status(200).send(token)
      return
    } else if (user.length > 1) {
      logger.error("Ci sono più utenti con le stesse caratteristiche")
      res.status(500).send("Ci sono più utenti con le stesse caratteristiche. Avvisare al più presto possibile un responsabile")
      return
    }

  } catch (err) {
    logger.error(err.message)
    return res.status(400).send({ message: err.message })
  }
}

activity.refreshToken = async (req, res) => {

  //TODO: ripensare questa funzione
  let user = await findUser({ mail, psw })

  if (user.length == 1) {
    var token = createToken({ "id": (user[0])["_id"] })
    return res.status(200).send(token)
  } else if (user.length > 1) {
    logger.error("Ci sono più utenti con le stesse caratteristiche")
    return res.status(500).send("Ci sono più utenti con le stesse caratteristiche. Avvisare al più presto possibile un responsabile")
  }
  res.status(500).send("Nessun Utente trovato")
}

activity.createUser = async (req, res) => {
  let data = req.body

  let name
  let cognome
  let phone
  let psw
  let mail

  try {
    name = data["name"]
    cognome = data["cognome"]
    phone = data["phone"]
    psw = data["psw"]
    mail = data["mail"]
  } catch (error) {
    logger.error("Dati dell'utente necessari non inviati")
    res.status(400).send("Dati dell'utente necessari non inviati")
    return
  }

  let exist = await Entity.find({ "email": mail })
  console.log(exist)
  if (exist.length >= 1) {
    logger.error("Utente già presente")
    res.status(500).send("Utente già presente")
    return
  }

  let result = await addUser({ name, cognome, phone, psw, mail })

  console.log("result=>" + result)

  if (result) {
    logger.info("Utente inserito correttamente")
    let user = await findUser({ mail, psw })
    return res.status(200).send(createToken({ "id": (user[0])["_id"] }))
  }

  logger.error("Utente non inserito")
  res.status(500).send("Utente non inserito")
}

module.exports = { activity }