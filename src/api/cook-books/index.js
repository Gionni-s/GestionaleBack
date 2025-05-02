import express from 'express';
import { actions } from './controller';
import { bodySchema } from './model';
import { token } from '../../services/token';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /cook-books/ get All Boods
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
 * @api {get} /cook-books/:id Get Specific Book
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
 * @api {post} /cook-books/:id Create Book
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
 * @api {put} /cook-books/:id Update Book
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
 * @api {delete} /cook-books/:id Destroy Book
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