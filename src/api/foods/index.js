import express from 'express';
import { actions } from './controller';
import { token } from '../../services/token';
import { middleware as query } from 'querymen';
import { bodySchema } from './model';

const router = express.Router();

/**
 * @api {get} /foods Request All Foods
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.get('/', query(bodySchema.query), token({ required: true }), actions.index);

/**
 * @api {get} /foods/:id Request Foods information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.get('/:id', query(bodySchema.query), token({ required: true }), actions.show);

/**
 * @api {post} /foods Create Foods
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.post('/', token({ required: true }), actions.create);

/**
 * @api {put} /foods/:id Update Foods information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.put('/:id', token({ required: true }), actions.update);

/**
 * @api {delete} /foods/:id Delete Foods
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.delete('/:id', token({ required: true }), actions.destroy);

export default router;