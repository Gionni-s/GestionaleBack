const FunctionGeneration = require('../_generator/function.js');
const Entity = require('./model');
const WarehouseEntities = require('../werehouseEntities/model');
const recipeIngridients = require('../recipe-ingridients/model');
const moment = require('moment');
const { generateBulkOperations } = require('../_utils/function.js');

let actions = FunctionGeneration(Entity);

actions.create = async ({ body, userId }, res) => {
  try {
    const bodyCopy = { ...body };
    delete body.ingridients;

    const recipe = await Entity.create({ ...body, userId });
    const ingridients = bodyCopy.ingridients.map(ing => ({ ...ing, userId, recipeId: recipe._id }));
    const bulkOps = generateBulkOperations(ingridients);

    await recipeIngridients.bulkWrite(bulkOps);
    const newRecipe = await Entity.view({ _id: recipe._id });
    return res.status(200).send(newRecipe);
  } catch (e) {
    console.log(e)
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

actions.update = ({ params: { id }, userId, body }, res) => {
  return res.status(200).send('endpoint in implementazione');
};

actions.searchRecipe = async ({ query: { foodIds } }, res) => {
  try {
    const foodIdsJson = JSON.parse(foodIds);
    const result = await Entity.find({ 'ingridients.foodId': { $in: foodIdsJson } });
    return res.status(200).send({ foodIdsJson, result });
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

// funzione che mi ritorna le ricette che contengono i cibi che stanno per scadere
actions.searchRecipeForExpiringFoods = async ({ query: { fromDate, toDate }, userId }, res) => {
  try {
    if (_.isNil(fromDate)) {
      fromDate = moment().toDate();
    }
    if (_.isNil(toDate)) {
      toDate = moment().add(10, 'day').toDate();
    }
    const today = moment(fromDate).startOf('day').toDate();
    const tenDaysFromNow = moment(toDate).startOf('day').toDate();

    const warehouseEntity = await WarehouseEntities.find(
      {
        scadenza: {
          $gte: today,
          $lte: tenDaysFromNow
        },
        userId
      },
      { foodId: 1 }
    );
    const foodIds = warehouseEntity.map(val => val.foodId);
    const result = await Entity.view({ 'ingridients.foodId': { $in: foodIds } });
    return res.status(200).send(result);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

module.exports = {
  actions
};