import express from 'express';
import { token } from '../../services/token';
import { actions } from './controller';
import { bodySchema } from './model';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /recipe-ingredients  Show all recipe-ingredients
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', query(bodySchema.query), token({ required: true }), actions.index);

/**
 * @api {get} /recipe-ingredients/:id Select Specific Recipe-ingredient
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/:id', query(bodySchema.query), token({ require: true }), actions.show);

/**
 * @api {post} /recipe-ingredients Create Recipe-ingredient
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
 * @api {put} /recipe-ingredients/:id Update Recipe-ingredient
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
 * @api {delete} /recipe-ingredients/:id Delete Recipe-ingredient
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete('/', token({ required: true }), actions.destroy);


export default router;