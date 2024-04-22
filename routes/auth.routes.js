const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register/user", authController.registerController);
router.post("/login/user", authController.loginController);

module.exports = router;
