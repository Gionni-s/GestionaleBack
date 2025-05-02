import express from 'express';
import { actions } from './controller';
import { token } from '../../services/token';
import { bodySchema } from './model';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /warehouse-entities Get All warehouseEntity
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
 * @api {get} /warehouse-entities/:id Get specific warehouseEntity
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
 * @api {post} /warehouse-entities Create WarehouseEntity
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
 * @api {put} /warehouse-entities/:id Update WarehouseEntity
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
 * @api {delete} /warehouse-entities/:id Delete WarehouseEntity
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