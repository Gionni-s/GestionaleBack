import Entity from './model.js';
import FunctionGeneration from '../_generator/function.js';
import BudgetGroupTemplate from '../budget-groups-template/model.js';
import BudgetGroup from '../budget-groups/model.js';
import moment from 'moment';
import { generateStartEndDate } from './utils/index.js';

const actions = FunctionGeneration(Entity);

actions.create = async ({ body, user }, res) => {
  try {
    const groupTemplate = await BudgetGroupTemplate.findOne({ _id: body.groupTemplateId });
    if (_.isNil(groupTemplate)) {
      return res.status(404).send({ message: 'no Group template found with id:' + body.groupTemplateId });
    }

    const today = moment();

    let budgetGroup = await BudgetGroup.findOne({
      groupTemplateId: body.groupTemplateId,
      'resetPeriod.start': { $gte: today },
      'resetPeriod.end': { $lte: today },
      user: user._id
    });

    if (_.isNil(budgetGroup)) {
      const { startDate, endDate } = generateStartEndDate(groupTemplate, body.dateTime);

      budgetGroup = await BudgetGroup.create({
        budgetGroupTemplateId: groupTemplate._id,
        name: groupTemplate.name,
        max: groupTemplate.max,
        validationPeriod: {
          start: startDate,
          end: endDate
        },
        userId: user._id
      });
    }

    const created = await Entity.create({ ...body, groupId: budgetGroup._id, userId: user._id });
    return res.status(201).send(created);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).send({ message: err.message });
  }
};

export { actions };