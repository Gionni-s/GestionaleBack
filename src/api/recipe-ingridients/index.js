const express = require('express');
const { token } = require('../../services/token');
const { actions } = require('./controller');

const router = express.Router();

/**
 * @api {get} /recipe-ingridients  Show all recipe-ingridients
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
 * @api {get} /recipe-ingridients/:id Select Specific Recipe-ingridient
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/:id', token({ require: true }), actions.show);

/**
 * @api {post} /recipe-ingridients Create Recipe-ingridient
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/', token({ required: true }), actions.create);

/**
 * @api {put} /recipe-ingridients/:id Update Recipe-ingridient
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.put('/', token({ required: true }), actions.update);

/**
 * @api {delete} /recipe-ingridients/:id Delete Recipe-ingridient
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete('/', token({ required: true }), actions.destroy);


module.exports = router;