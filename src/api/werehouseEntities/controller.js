const Entity = require('./model');
const FunctionGeneration = require('../_utils/function.js');

let actions = FunctionGeneration(Entity);

module.exports = {
  actions
};