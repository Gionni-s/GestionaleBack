const Entity = require("../model").model
const bcrypt = require('bcrypt');

async function addUser({ name, cognome, psw, mail, phone }) {
  let saltRounds = bcrypt.genSaltSync(10)
  //controllo che siano stati inviati tutti i dati richiesti
  if (name == undefined || cognome == undefined || phone == undefined || psw == undefined || mail == undefined) {
    throw new Error("Non sono stati mandati tutti i campi necessari")
  }

  //TODO: ADD VALIDATION MAIL AND PASSWORD

  //valido la mail
  // if (!mailValidation(mail)) {
  //   res.status(500).send("mail inviata non corretta, controllare")
  //   return
  // }

  //valido la password
  // if (!passwordValidation(psw)) {
  //   res.status(500).send("Password inserita non abbastanza sicura, deve avere tra i 6 e i 15 caratteri, avere caratteri speciali (@,!,$,%), avere numeri e lettere maiuscole")
  //   return
  // }

  //crypted password
  let hashPassword = bcrypt.hashSync(psw, saltRounds);

  //controllo se esiste già un utente con quella mail nel db
  let result = await Entity.find({ "psw": hashPassword, "email": mail })
  logger.info("Ricerca per utenti con le stesse informazioni")

  //controllo che non esista nessun utente con quella mail
  if (result.length >= 1) {
    throw new Error("é già presente un utente con la mail " + mail)
  }


  //inserisco l'utente nel db
  let risultato = await Entity.create({
    name: name,
    surname: cognome,
    email: mail,
    password: hashPassword,
    phoneNumber: phone,
    lastLogin: new Date()
  })

  return risultato
}

async function findUser({ mail, psw }) {
  let user = await Entity.find({ "email": mail }, { password: 1 })
  if (user.length == 1) {
    logger.info("Utente trovato")
  }

  if (user.length < 1) {
    throw new Error("Nessun utente trovato")
  }

  let hash = user[0]["password"]
  console.log(hash)
  if (!bcrypt.compareSync(psw, hash)) {
    throw new Error("Password non corretta")
  }

  return user
}

async function deleteUser(user) {
  return (await Entity.deleteOne({ "_id": user["_id"] }))
}
module.exports = {
  findUser,
  addUser,
  deleteUser
}