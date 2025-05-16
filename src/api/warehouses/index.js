import express from 'express';
import { actions } from './controller';
import { token } from '../../services/token';
import { bodySchema } from './model';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /warehouses Get All Warehouses
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
 * @api {get} /warehouses/:id Get Specific warehouse
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
 * @api {post} /warehouses Create Warehouse
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
 * @api {put} /warehouses/:id Update Warehouse
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
 * @api {delete} /warehouses/:id Delete Warehouse
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