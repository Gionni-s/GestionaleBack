import express from 'express';
import { actions } from './controller';
import { bodySchema } from './model';
import { token } from '../../services/token';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /budget-groups-template/ get All budget-groups-template
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
 * @api {get} /budget-groups-template/kpi get All budget-groups-template
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.get('/kpi', query(bodySchema.query), token({ required: true }), actions.kpi);

/**
 * @api {get} /budgets/chart get All Budgets
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} last name  Last name of the User.
 */
router.get('/chart', query(bodySchema.query), token({ required: true }), actions.getChart);

/**
 * @api {get} /budget-groups-template/:id Get Specific budget-group
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
 * @api {post} /budget-groups-template/:id Create budget-group
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
 * @api {put} /budget-groups-template/:id Update budget-group
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
 * @api {delete} /budget-groups-template/:id Destroy budget-group
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