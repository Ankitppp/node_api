
const XLSX   = require('xlsx')
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


exports.upload = async(req,res) =>{
  try{
        if(!req.file ||!req.file.path)
       {
             return res.status(400).json({message:"file upload failed "})
       }
       const workbook  = XLSX.readFile(req.file.path);
       const sheetName = workbook.SheetNames[0];
       const worksheet  =  workbook.Sheets[sheetName];
       const data = XLSX.utils.sheet_to_json(worksheet);
       await projectService.upload(data);
       res.status(200).json({message :"succesfully  created"})
  }
  catch(error)
  {
       res.status(500).json({message : error.message})
  }
}   
