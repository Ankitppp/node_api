const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretVariable = require("../utilis/utilis.config");

exports.registerService = async (payload) => {
  try {
    const { name, userName, email, password } = payload;
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await user.create({
      name: name,
      username: userName,
      email: email,
      password: hashPassword,
    });
    return {
      message: "succesfully created",
      user: {
        name: data.name,
        userName: data.username,
      },
    };
  } catch (error) {
    throw new Error("Regisration failed: " + error.message);
  }
};

exports.loginService = async (payload) => {
  try {
    const { userName, password } = payload;
    const userExist = await user.findOne({ where: { username: userName } });
    if (!userExist) {
      throw new Error("uses does not exist ! ");
    }
    const passwordMatching = await bcrypt.compare(password, userExist.password);
    if (!passwordMatching) {
      throw new Error("wrong password");
    }
    const token = jwt.sign({ userId: user.id }, secretVariable.secretKey, {
      expiresIn: "1h",
    });
    return { token };
  } catch (error) {
    throw new Error("login failed !!!" + error.message);
  }
};
