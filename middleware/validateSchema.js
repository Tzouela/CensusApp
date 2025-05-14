const fs         = require('fs');
const path       = require('path');
const Ajv        = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });

addFormats(ajv);

const schemaPath = path.join(__dirname, '../schemas/participantSchema.json');
const schema     = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validateFn = ajv.compile(schema);

function validateSchema(req, res, next) {
  const valid = validateFn(req.body);
  if (!valid) {
    const err = new Error('Validation error');
    err.status = 400;
    err.errors = validateFn.errors;
    return next(err);
  }
  next();
}

module.exports = validateSchema;