const express = require("express");
const router = express.Router();

const {
  validateCreateSchema,
  validateGetSchema,
  validateUpdateSchema,
  validatedeleteSchema,
} = require("../middlewares/middelwares.validations");
const {
  saveDataIntabels,
  getALLMetricByServerName,
  updateServerName,
  deleteServerDetails,
} = require("../controllers/project.controller");

const auth = require("../middlewares/middlewares.jwtAuth");

router.post(
  "/save/dataToTable",
  auth.jwt,
  validateCreateSchema,
  saveDataIntabels
);

router.get(
  "/getAll/metric",
  auth.jwt,
  validateGetSchema,
  getALLMetricByServerName
);

router.put(
  "/update/serverName",
  auth.jwt,
  validateUpdateSchema,
  updateServerName
);

router.delete(
  "/delete/serverDetails",
  auth.jwt,
  validatedeleteSchema,
  deleteServerDetails
);

module.exports = router;
