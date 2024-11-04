const express = require('express');
const { actions } = require('./controller');
const { token } = require('../../services/token');

const router = express.Router();

/**
 * @api {get} /cookBooks/ get All Boods
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', token({ required: true }), actions.index);

/**
 * @api {get} /cookBooks/:id Get Specific Book
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/:id', token({ required: true }), actions.show);

/**
 * @api {post} /cookBooks/:id Create Book
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/', token({ required: true }), actions.create);

module.exports = router;