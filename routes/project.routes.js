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
  upload,
} = require("../controllers/project.controller");

// const { jwt } = require("../middlewares/middlewares.jwtAuth");
const uploadStorage = require("../middlewares/middlewares.multer");

router.post("/save/dataToTable", validateCreateSchema, saveDataIntabels);

router.post("/upload/excel/file", uploadStorage.single("file"), upload);
router.post("/getAll/metric", validateGetSchema, getALLMetricByServerName);

router.put("/update/serverName", validateUpdateSchema, updateServerName);

router.delete(
  "/delete/serverDetails",
  validatedeleteSchema,
  deleteServerDetails,
);

module.exports = router;
