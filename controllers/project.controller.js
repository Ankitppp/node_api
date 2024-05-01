
const XLSX   = require('xlsx')
const projectService = require("../services/project.service");
const etj = require("../middlewares/middleware.xlsx")
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


// exports.upload = async(req,res) =>{
//   try{
//        const data =  await etj.excelFileToJson(req,res)
//        await projectService.upload(data);
//        res.status(200).json({message :"succesfully  created"})
//   }
//   catch(error)
//   {
//        console.log(error.message)
//        res.status(500).json({ message : "failed to  save data, " + error.message})
//   }
// }   

exports.upload = (req, res) => {
  etj.excelFileToJson(req, res)
      .then(data => {
          return projectService.upload(data);
      })
      .then(() => {
          res.status(200).json({ message: "successfully created" });
      })
      .catch(error => {
          console.log(error.message);
          res.status(500).json({ message: "failed to save data, " + error.message });
      });
}
