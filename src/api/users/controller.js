import FunctionGeneration from '../_generator/function.js';
import { createToken } from '../../services/token';
import { findUser, addUser } from './middleware/express';
import Entity from './model';
import UploadFile from '../upload/model.js';
import { basicAuth, convertImageToBase64 } from './utils/index.js';

const actions = FunctionGeneration(Entity);

actions.login = async ({ headers: { authorization } }, res) => {
  try {
    if (_.isNil(authorization)) {
      return res.status(404).send({ status: 404, message: 'Need to send username and password' });
    }
    const { mail, psw } = basicAuth(authorization);
    const user = await findUser({ mail, psw });
    await Entity.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });
    return res.status(200).send(createToken(user));
  } catch (err) {
    logger.error(err.message);
    return res.status(err.status || 500).send({ code: err.code || 9000, message: err.message });
  }
};

actions.refreshToken = async ({ mail, psw }, res) => {
  try {
    //TODO: ripensare questa funzione
    const user = await findUser({ mail, psw });

    if (user.length === 1) {
      const token = createToken({ 'id': (user[0])['_id'] });
      return res.status(200).send(token);
    } if (user.length > 1) {
      throw ({ code: 1000, status: 400, message: 'Ci sono più utenti con le stesse caratteristiche' });
    }
    return res.status(500).send('Nessun Utente trovato');
  } catch (err) {
    logger.error(err.message);
    return res.status(err.status || 500).send({ code: err.code || 9000, message: err.message });
  }
};

actions.show = async (req, res) => {
  try {
    let result = await Entity.find();
    if (_.isEmpty(result)) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send({ message: e.message });
  }
};

actions.showMe = async ({ user }, res) => {
  try {
    let result = await Entity.findOne({ _id: user._id });
    if (_.isEmpty(result)) {
      result = { message: 'No element Found' };
    }
    return res.status(200).send(result);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send({ message: e.message });
  }
};

actions.updateMe = async ({ body, user }, res) => {
  const image = body.profileImage.file;
  const updateImage =
    await UploadFile.findOneAndUpdate({
      userId: user._id,
      type: 'profileImage'
    }, { file: image }, { new: true });

  body.profileImageId = updateImage._id;
  const updated = await Entity.findOneAndUpdate({ _id: user._id }, body, { new: true });
  if (_.isNil(updated)) {
    return res.status(400).send({ message: 'no items found to modify' });
  }
  return res.status(200).send(updated);
};

actions.createUser = async (req, res) => {
  let result;
  let imageUpload;
  try {
    const { name, surname, phone, psw, mail, profileImage } = req.body;

    const exist = await Entity.find({ 'email': mail });
    if (!_.isEmpty(exist)) {
      throw ({ code: 1000, status: 400, message: 'Utente già presente' });
    }
    result = await addUser({ name, surname, phone, psw, mail });

    imageUpload =
      await UploadFile.create(
        {
          file: profileImage || convertImageToBase64('/image/defaultProfile.jpg'),
          type: 'profileImage',
          userId: result._id
        }
      );

    await Entity.findOneAndUpdate({ _id: result._id }, { profileImage: imageUpload._id }, { new: true });

    if (result) {
      logger.info('Utente inserito correttamente');
      const user = await findUser({ mail, psw });
      return res.status(200).send(createToken({ '_id': (user)['_id'] }));
    }
    throw ({ code: 1000, status: 400, message: 'Utente non inserito' });
  } catch (err) {
    if (result) {await Entity.deleteOne({ _id: result._id }, {});}
    if (imageUpload) {await UploadFile.deleteOne({ _id: imageUpload._id }, {});}
    logger.error(err.message);
    return res.status(err.status || 500).send({ code: err.code || 9000, message: err.message });
  }
};

export { actions };