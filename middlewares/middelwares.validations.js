const {
  createSchema,
  getSchema,
  updateSchema,
  deleteSchema,
} = require("../joi/joi.schema");

// eslint-disable-next-line consistent-return
exports.validateCreateSchema = (req, res, next) => {
  const result = createSchema.validate(req.body);
  if (result.error) {
    return res
      .status(400)
      .json({ error: result.error.details.map((detail) => detail.message) });
  }
  next();
};

// eslint-disable-next-line consistent-return
exports.validateGetSchema = (req, res, next) => {
  const result = getSchema.validate(req.body);
  if (result.error) {
    return res
      .status(400)
      .json({ error: result.error.details.map((detail) => detail.message) });
  }
  next();
};

// eslint-disable-next-line consistent-return
exports.validateUpdateSchema = (req, res, next) => {
  const result = updateSchema.validate(req.body);
  if (result.error) {
    return res
      .status(400)
      .json({ error: result.error.details.map((detail) => detail.message) });
  }
  next();
};

// eslint-disable-next-line consistent-return
exports.validatedeleteSchema = (req, res, next) => {
  const result = deleteSchema.validate(req.body);
  if (result.error) {
    return res
      .status(400)
      .json({ error: result.error.details.map((detail) => detail.message) });
  }
  next();
};
