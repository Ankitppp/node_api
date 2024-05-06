const Joi = require("joi");
const monthArray = require("../utilis/utilis.constant");

const createSchema = Joi.object().keys({
  serverName: Joi.string()
    .ip({ version: ["ipv4"] })
    .required(),
  metricData: Joi.object()
    .keys({
      date: Joi.date().iso().required(),
      month: Joi.string()
        .valid(...monthArray)
        .required(),
      cpuUtilization: Joi.number().min(0).max(100).required(),
      memoryUtilization: Joi.number().min(0).max(100).required(),
      loadAverage: Joi.number().required(),
      networkTraffic: Joi.number().required(),
      diskOps: Joi.number().integer().required(),
      diskCapacity: Joi.number().required(),
    })
    .required(),
});

const getSchema = Joi.object().keys({
  serverName: Joi.string()
    .ip({ version: ["ipv4"] })
    .required(),
});

const updateSchema = Joi.object().keys({
  oldServerName: Joi.string()
    .ip({ version: ["ipv4"] })
    .required(),
  newServerName: Joi.string()
    .ip({ version: ["ipv4"] })
    .required(),
});

const deleteSchema = Joi.object().keys({
  serverName: Joi.string()
    .ip({ version: ["ipv4"] })
    .required(),
});

module.exports = {
  createSchema,
  getSchema,
  updateSchema,
  deleteSchema,
};
