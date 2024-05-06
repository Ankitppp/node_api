const jwt = require("jsonwebtoken");
const { secretKey } = require("../utilis/utilis.config").secretKey;

// eslint-disable-next-line consistent-return
exports.jwt = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({
      message: "authroiztion failed",
    });
  }
  const { token } = req.cookies.token.token;
  const user = jwt.verify(token, secretKey);
  req.user = user;
  next();
};
