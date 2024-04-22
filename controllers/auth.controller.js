const authService = require("../services/auth.service");

exports.registerController = async (req, res) => {
  const payload = req.body;
  try {
    const result = await authService.registerService(payload);
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.loginController = async (req, res) => {
  const payload = req.body;
  try {
    const result = await authService.loginService(payload);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
