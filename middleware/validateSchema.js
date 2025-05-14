const fs         = require('fs');
const path       = require('path');
const Ajv        = require('ajv');
const addFormats = require('ajv-formats');

// 1) single AJV instance with allErrors on
const ajv = new Ajv({ allErrors: true });

// 2) install formats so "email", "date" etc. work
addFormats(ajv);

// 3) load & compile your JSON schema
const schemaPath = path.join(__dirname, '../schemas/participantSchema.json');
const schema     = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validateFn = ajv.compile(schema);

// 4) wrap it in a named function
function validateSchema(req, res, next) {
  const valid = validateFn(req.body);
  if (!valid) {
    const err = new Error('Validation error');
    err.status = 400;
    // attach AJV’s errors array so your error‐handler can send them back
    err.errors = validateFn.errors;
    return next(err);
  }
  next();
}

// 5) export that function by name
module.exports = validateSchema;