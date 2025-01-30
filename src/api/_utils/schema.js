module.exports = function SchemaGeneration(entitySchema) {
  for (let element in entitySchema) {

    if (entitySchema[element].type.schemaName == 'ObjectId') {
      entitySchema[element].ref = element.slice(0, 1).toUpperCase() + element.slice(1, -2);
    }

    if (!_.isNil(entitySchema[element].type[0])) {
      for (let sub in entitySchema[element].type[0].obj) {
        if (entitySchema[element].type[0].obj[sub].type.schemaName == 'ObjectId') {
          entitySchema[element].type[0].obj[sub].ref = sub.slice(0, 1).toUpperCase() + sub.slice(1, -2);
        }
      }
    }
  }

  return entitySchema;
};