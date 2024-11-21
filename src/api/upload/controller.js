const Entity = require('./model.js');
const FunctionGeneration = require('../_utils/function.js');

let actions = FunctionGeneration(Entity);

module.exports = {
  actions
};