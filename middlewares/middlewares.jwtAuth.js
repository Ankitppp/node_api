const jwt = require("jsonwebtoken");
const secretKey = require("../utilis/utilis.config").secretKey;

exports.jwt = (req, res, next) => {
  console.log(req.cookies)
  //  const token = req.cookies.value.token
  const token = null
  if (!token) {
    return res.status(401).json({
      message: "authroiztion failed",
    });
  }

  const user = jwt.verify(token, secretKey);
  console.log(user)
  req.user = user;
  next();
};
