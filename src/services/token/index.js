const jwt = require('jsonwebtoken');
const { privateKey } = require('../../config');
import User from '../../api/users/model';
import { roles as userRoles, RolesEnum } from '../../api/_utils/enum';

const token = ({ required, master, roles = [RolesEnum.USER] } = {}) => async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!required) {
      return next();
    }

    if (required && !token) {
      return res.status(401).send('');
    }

    const userToken = verifyToken(token);
    const user = await User.findOne({ _id: userToken._id });
    const userRole = _.get(user, 'role', undefined);

    if (!userRole || !userRoles.includes(userRole)) {
      return res.status(403).send('');
    }

    if (roles.length > 0) {
      const userIndex = userRoles.indexOf(userRole);
      const minAllowedIndex = Math.min(...roles.map(r => userRoles.indexOf(r)).filter(i => i >= 0));

      if (userIndex < minAllowedIndex) {
        return res.status(403).send('');
      }
    }

    req.user = user;
    return next();
  } catch (err) {
    logger.error(err.message);
    return res.status(401).send({ message: err.message });
  }
};

function createToken(object) {
  const token = jwt.sign({ _id: object._id.toString() }, privateKey, { expiresIn: '7d' });
  object.password = undefined;
  return { token, 'user': object };
}

function verifyToken(token) {
  let decoded = undefined;
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