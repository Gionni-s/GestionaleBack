// Funzione di utilità per controllare se un campo è un array di oggetti
const isArrayOfObjects = (field) =>
  Array.isArray(field.type) && field.type.length > 0 && field.type[0]?.obj;

// Funzione di utilità per capitalizzare i riferimenti
const capitalizeRef = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1, -2);

function schemaGeneration(entitySchema) {
  Object.entries(entitySchema).forEach(([element, field]) => {

    // Rimozione campi virtuali
    delete field.virtual;
    delete field.virtualPopulation;

    // Aggiunge ref per ObjectId
    if (field.type?.schemaName === 'ObjectId') {
      field.ref = capitalizeRef(element);
    }

    // Gestione degli array di oggetti nidificati
    if (isArrayOfObjects(field)) {
      Object.entries(field.type[0].obj).forEach(([sub, subField]) => {
        if (subField.type?.schemaName === 'ObjectId') {
          subField.ref = capitalizeRef(sub);
        }
      });
    }
  });

  return entitySchema;
}

function createPopulate(entitySchema) {
  const populate = [];

  Object.entries(entitySchema).forEach(([element, field]) => {
    if (field.ref && !field.virtual) {
      populate.push({ path: element });
    }

    if (isArrayOfObjects(field)) {
      Object.entries(field.type[0].obj).forEach(([sub, subField]) => {
        if (subField.ref) {
          populate.push({ path: `${element}.${sub}`, model: subField.ref });
        }
      });
    }
  });

  return populate;
}

function createVirtuals(entitySchema) {
  const virtuals = [];

  Object.entries(entitySchema).forEach(([elementName, field]) => {
    if (field.virtualPopulation) {
      virtuals.push({
        as: elementName.slice(0, -2),
        options: field.virtualPopulation.options,
        autoPopulate: field.virtualPopulation.odinAutoPopulation
      });
    }

    if (isArrayOfObjects(field)) {
      Object.entries(field.type[0].obj).forEach(([subName, subField]) => {
        if (subField.virtualPopulation) {
          virtuals.push({
            as: subName.slice(0, -2),
            options: subField.virtualPopulation,
            autoPopulate: field.virtualPopulation.odinAutoPopulation
          });
        }
      });
    }
  });
  return virtuals;
}

module.exports = { schemaGeneration, createPopulate, createVirtuals };
