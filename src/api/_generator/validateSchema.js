export default function ValidateSchema(mongooseSchema) {
  let query = {};

  function parseSchema(schema, path = '') {
    for (const [key, value] of Object.entries(schema)) {
      const fullPath = path ? `${path}.${key}` : key;

      if (value.instance) {
        query[fullPath] = mapType(value.instance);
      } else if (value.schema) {
        parseSchema(value.schema, fullPath);
      } else if (value.caster && value.caster.instance) {
        query[fullPath] = `array<${mapType(value.caster.instance)}>`;
      }
    }
  }

  function mapType(type) {
    const typeMap = {
      'String': 'string',
      'Number': 'number',
      'Boolean': 'boolean',
      'Date': 'date',
      'ObjectId': 'objectId',
      'Array': 'array',
      'Mixed': 'mixed'
    };
    return typeMap[type] || 'unknown';
  }

  parseSchema(mongooseSchema);

  return { create: {}, query };
}