const FunctionGeneration = require('../_utils/function.js');
const { searchAggregate, populateAggregate } = require('./aggregate/searchAggregate.js');
const Entity = require('./model');

let actions = FunctionGeneration(Entity);

module.exports = {
  actions
};

actions.index = async ({ params, userId }, res) => {
  let result = await Entity.aggregate(populateAggregate(userId));
  if (result.length == 0) {
    result = { message: 'No element Found' };
  }
  return res.status(200).send(result);
};

actions.searchRecipe = async ({ body: { foodIds } }, res) => {
  try {
    if (foodIds == undefined) {
      throw { status: 400, message: 'foodIds need to contains something' };
    }

    let result = await Entity.aggregate(searchAggregate(foodIds));

    if (result.length <= 0) return res.status(200).send({ 'message': 'No element found' });

    return res.status(200).send({ foodIds, result });
  } catch (e) {
    logger.error(e.message);
    return res.status(e.status || 500).send({ message: e.message });
  }
};