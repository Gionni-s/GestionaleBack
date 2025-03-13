var jwt = require('jsonwebtoken');
const { privateKey } = require('../../config');

const token = ({ required, master, roles /*= User.roles*/ } = {}) => (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!required) {
      return next();
    }

    if (required && !token) {
      return res.status(401).send('');
    }

    //TODO: add role control for token
    req.user = verifyToken(token);
    return next();
  } catch (err) {
    logger.error(err.message);
    return res.status(401).send({ message: err.message });
  }
};

function createToken(object) {
  var token = jwt.sign({ _id: object._id.toString() }, privateKey, { expiresIn: '7d' });
  object.password = undefined;
  return { 'token': token, 'user': object };
}

function verifyToken(token) {
  var decoded = undefined;
  try {
    decoded = jwt.verify(token.split(' ')[1], privateKey);
  } catch (err) {
    throw new Error(err.message);
  }

  return decoded;
}

module.exports = {
  createToken,
  // verifyToken,
  // tokenValidation,
  token
};