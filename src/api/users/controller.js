const { createToken } = require('../../services/token');
const { findUser, addUser } = require('./middleware/express');
const Entity = require('./model');

let activity = {};

function basicAuth({ authorization: auth }) {
  const authorization = auth.split(' ')[1];
  const decript = (value) => { return Buffer.from(value, 'base64').toString(); };
  const result = decript(authorization);
  const mail = result.split(':')[0];
  const psw = result.slice(result.indexOf(':') + 1, result.length);
  return { mail, psw };
}

activity.login = async ({ headers }, res) => {
  try {
    if (!headers.authorization) {
      throw ({ status: 404, message: 'Need to send username and password' });
    }
    const { mail, psw } = basicAuth(headers);

    let user = await findUser({ mail, psw });
    if (_.isNil(user)) {
      throw ({ code: 1000, status: 400, message: 'Nessun utente trovato' });
    }

    return res.status(200).send(createToken({ 'id': user._id }));
  } catch (err) {
    logger.error(err.message);
    return res.status(err.status || 500).send({ code: err.code || 9000, message: err.message });
  }
};

activity.refreshToken = async (req, res) => {
  try {
    //TODO: ripensare questa funzione
    let user = await findUser({ mail, psw });

    if (user.length == 1) {
      var token = createToken({ 'id': (user[0])['_id'] });
      return res.status(200).send(token);
    } else if (user.length > 1) {
      ;
      throw ({ code: 1000, status: 400, message: 'Ci sono più utenti con le stesse caratteristiche' });
    }
    return res.status(500).send('Nessun Utente trovato');
  } catch (err) {
    logger.error(err.message);
    return res.status(err.status || 500).send({ code: err.code || 9000, message: err.message });
  }
};

activity.createUser = async (req, res) => {
  try {
    let { name, surname, phone, psw, mail } = req.body;

    let exist = await Entity.find({ 'email': mail });
    if (exist.length >= 1) {
      throw ({ code: 1000, status: 400, message: 'Utente già presente' });
    }

    let result = await addUser({ name, surname, phone, psw, mail });

    if (result) {
      logger.info('Utente inserito correttamente');
      let user = await findUser({ mail, psw });
      return res.status(200).send(createToken({ 'id': (user[0])['_id'] }));
    }

    throw ({ code: 1000, status: 400, message: 'Utente non inserito' });
  } catch (err) {
    logger.error(err.message);
    return res.status(err.status || 500).send({ code: err.code || 9000, message: err.message });
  }
};

module.exports = { activity };