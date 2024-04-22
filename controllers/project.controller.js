const projectService = require("../services/project.service");
const {
  handleValidResponse,
  handleErrorResponse,
} = require("../utilis/utilis.function");

exports.saveDataIntabels = async (req, res) => {
  const payload = req.body;
  try {
    const data = await projectService.saveDataIntabels(payload);
    handleValidResponse(res, data);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.getALLMetricByServerName = async (req, res) => {
  try {
    const allServerData = await projectService.getALLMetricByServerName(
      req.body
    );
    handleValidResponse(res, allServerData);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.updateServerName = async (req, res) => {
  try {
    const server = await projectService.updateServerName(req.body);
    handleValidResponse(res, server);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

exports.deleteServerDetails = async (req, res) => {
  const payload = req.body;
  try {
    const responseValue = await projectService.deleteServerDetails(payload);
    res.status(200).json({ message: "succesfully deleted" });
  } catch (err) {
    handleErrorResponse(res, err);
  }
};
