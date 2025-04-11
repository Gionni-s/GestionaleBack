import express from 'express';
import { actions } from './controller';
import { bodySchema } from './model';
import { token } from '../../services/token';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /shopping-list-elements/ get All shopping-list Element Elements
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
 * @api {get} /shopping-list-elements/:id Get Specific shopping-list Element
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/:id', query(bodySchema.query), token({ required: true }), actions.show);

/**
 * @api {post} /shopping-list-elements/:id Create shopping-list Element
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
 * @api {put} /shopping-list-elements/:id Update shopping-list Element
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.put('/:id', token({ required: true }), actions.update);

/**
 * @api {delete} /shopping-list-elements/:id Destroy shopping-list Element
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.delete('/:id', token({ required: true }), actions.destroy);

export default router;