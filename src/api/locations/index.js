import express from 'express';
import { token } from '../../services/token';
import { actions } from './controller';
import { bodySchema } from './model';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /locations  Show all locations
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
 * @api {get} /locations/:id Select Specific Location
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.get('/:id', query(bodySchema.query), token({ require: true }), actions.show);

/**
 * @api {post} /locations Create Location
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
 * @api {put} /locations/:id Update Location
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
 * @api {delete} /locations/:id Delete Location
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