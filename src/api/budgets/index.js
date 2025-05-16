import express from 'express';
import { actions } from './controller';
import { bodySchema } from './model';
import { token } from '../../services/token';
import { middleware as query } from 'querymen';

const router = express.Router();

/**
 * @api {get} /budgets/ get All Budgets
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
 * @api {get} /budgets/kpi get kpi BudgetGroup
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
 * @api {get} /budgets/:id Get Specific Budget
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
 * @api {post} /budgets/:id Create Budget
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
 * @api {put} /budgets/:id Update Budget
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
 * @api {delete} /budgets/:id Destroy Budget
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