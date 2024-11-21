const FunctionGeneration = require('../_utils/function.js');
const { createToken } = require('../../services/token');
const { findUser, addUser } = require('./middleware/express');
const Entity = require('./model');
const UploadFile = require('../upload/model.js');
const showUser = require('./middleware/aggregate.js');

let actions = FunctionGeneration(Entity);

function basicAuth({ authorization: auth }) {
  const authorization = auth.split(' ')[1];
  const decript = (value) => { return Buffer.from(value, 'base64').toString(); };
  const result = decript(authorization);
  const mail = result.split(':')[0];
  const psw = result.slice(result.indexOf(':') + 1, result.length);
  return { mail, psw };
}

actions.login = async ({ headers }, res) => {
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

actions.refreshToken = async (req, res) => {
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

actions.showMe = async ({ userId }, res) => {
  try {
    let result = (await Entity.aggregate(showUser(userId)))[0];
    if (result.length == 0) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send({ message: e.message });
  }
};

actions.updateMe = async ({ body, userId }, res) => {
  let image = body.profileImage;
  let updateImage =
    await UploadFile.findOneAndUpdate({ userId, type: 'profileImage' }, { file: image }, { new: true });
  body.profileImage = updateImage._id;
  let updated = await Entity.findOneAndUpdate({ _id: userId }, body, { new: true });
  if (!updated) {
    return res.status(400).send({ message: 'no items found to modify' });
  }
  return res.status(200).send(updated);
};

actions.createUser = async (req, res) => {
  try {
    let { name, surname, phone, psw, mail, profileImage } = req.body;

    let exist = await Entity.find({ 'email': mail });
    if (exist.length >= 1) {
      throw ({ code: 1000, status: 400, message: 'Utente già presente' });
    }
    let result = await addUser({ name, surname, phone, psw, mail, profileImage: imageUpload._id });

    let imageUpload =
      await UploadFile.insert({ file: profileImage, type: 'profileImage', userId: result._id });

    await Entity.findOneAndUpdate({ _id: result._id }, { profileImage: imageUpload._id }, { new: true });

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

module.exports = { actions };