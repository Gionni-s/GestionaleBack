const express = require('express');
const { actions } = require('./controller');
const { token } = require('../../services/token');

const router = express.Router();

/**
 * @api {get} /warehouses Get All Warehouses
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
 * @api {get} /warehouses/:id Get Specific warehouse
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
 * @api {post} /warehouses Create Warehouse
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