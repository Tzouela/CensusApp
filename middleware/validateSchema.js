const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, strict: false });
require('ajv-formats')(ajv);

const schemaPath = path.join(__dirname, '../schemas/participantSchema.json');
const schema     = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validateFn = ajv.compile(schema);

const validateSchema = (req, res, next) => {
  const { body } = req;

  // Validate the request body against the JSON schema
  const isValid = validateFn(body);

  if (!isValid) {
    // If validation fails, return a 400 Bad Request response with error details
    return res.status(400).json({
      message: 'Validation failed',
      errors: validateFn.errors,
    });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
};
module.exports = validateSchema;