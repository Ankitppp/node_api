const jwt = require("jsonwebtoken");
const secretKey = require("../utilis/utilis.config").secretKey;

exports.jwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      message: "authroiztion failed",
    });
  }
  const token = authHeader.split(" ")[1];
  const user = jwt.verify(token, secretKey);
  req.user = user;
  next();
};
