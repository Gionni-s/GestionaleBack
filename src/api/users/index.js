const express = require('express');
const { token } = require('../../services/token');
const { activity } = require('./controller');

const router = express.Router();

/**
 * @api {get} /users Login
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', token({ required: false }), activity.login);

/**
 * @api {get} /users/newToken Request New Token
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/newToken', token({ required: true }), activity.refreshToken);

/**
 * @api {post} /users Create User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/', token({ required: false }), activity.createUser);

module.exports = router;