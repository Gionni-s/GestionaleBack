const FunctionGeneration = require('../_generator/function.js');
const Entity = require('./model');
const WarehouseEntities = require('../werehouseEntities/model');
const RecipeIngridients = require('../recipe-ingridients/model');
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

    await RecipeIngridients.bulkWrite(bulkOps);
    const newRecipe = await Entity.find({ _id: recipe._id, userId });
    return res.status(200).send(newRecipe);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

actions.update = async ({ params: { id }, userId, body }, res) => {
  try {
    const bodyClone = { ...body };
    delete bodyClone.ingridients;

    await Entity.updateOne({ _id: id, userId }, bodyClone);

    const existingIngredients = await RecipeIngridients.find({ recipeId: id, userId });

    if (_.isEmpty(body.ingridients)) {
      await RecipeIngridients.deleteMany({ recipeId: id, userId });
    } else {
      const ingredientsArray = body.ingridients.map(ing => ({
        ...ing,
        recipeId: id,
        userId
      }));


      if (!_.isEmpty(existingIngredients)) {
        await RecipeIngridients.deleteMany({ recipeId: id, userId });
      }
      await RecipeIngridients.insertMany(ingredientsArray);
    }

    const updatedRecipe = await Entity.findOne({ _id: id, userId });

    return res.status(200).json(updatedRecipe);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

actions.destroy = async ({ params: { id }, userId }, res) => {
  await Entity.deleteOne({ _id: id, userId });
  await RecipeIngridients.deleteMany({ recipeId: id, userId });
  return res.status(200).send('Item successfully deleted');
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
    const result = await Entity.find({ 'ingridients.foodId': { $in: foodIds } });
    return res.status(200).send(result);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message);
  }
};

module.exports = {
  actions
};