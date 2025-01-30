const { schemaGeneration, createPopulate } = require('./_utils');

function ModelGenerator(mongoose) {
  return function (modelParams) {
    const {
      schema: entitySchema,
      collectionName,
      modelName
    } = modelParams;

    let model = mongoose.model(modelName, schemaGeneration(entitySchema));

    const view = async (filter = {}) => {
      return await model.find(filter).populate(createPopulate(entitySchema));
    };

    model.view = view;

    return model;
  };
}

module.exports = ModelGenerator;