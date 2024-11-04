const Entity = require('./model');
const FunctionGeneration = require('../_utils/function.js');
const { show } = require('./aggregate/show.js');

let actions = FunctionGeneration(Entity);

module.exports = {
  actions
};

actions.index = async (req, res) => {
  return res.status(200).send(await Entity.aggregate(show()));
};

actions.show = async (req, res) => {
  return res.status(200).send(await Entity.aggregate(show()));
};