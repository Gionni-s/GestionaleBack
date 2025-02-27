const Entity = require('./model.js');
const FunctionGeneration = require('../_generator/function.js');

let actions = FunctionGeneration(Entity);

module.exports = {
  actions
};