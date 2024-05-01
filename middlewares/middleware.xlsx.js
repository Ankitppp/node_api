const xlsx = require("xlsx");

exports.excelFileToJson = async(req,res) => 
{
    if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "file upload failed " });
    }
    const workbook = await xlsx.readFile(req.file.path)
    //  workbook = 5
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data
}
