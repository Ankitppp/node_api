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

router.post("/save/dataToTable", validateCreateSchema, saveDataIntabels);

router.get("/getAll/metric", validateGetSchema, getALLMetricByServerName);

router.put("/update/serverName", validateUpdateSchema, updateServerName);

router.delete(
  "/delete/serverDetails",
  validatedeleteSchema,
  deleteServerDetails
);

module.exports = router;
