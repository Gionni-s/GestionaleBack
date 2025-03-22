import Entity from './model';
import FunctionGeneration from '../_generator/function.js';
import { chartAggregate, kpiAggregate } from './aggregates/index.js';

const actions = FunctionGeneration(Entity);

actions.kpi = async ({ user }, res) => {
  const kpi = await Entity.aggregate(kpiAggregate(user));
  return res.status(200).send(kpi);
};

actions.getChart = async ({ user }, res) => {
  const budgets = await Entity.aggregate(chartAggregate(user));

  return res.status(200).send(budgets);
};

export { actions };