const Sequelize = require("sequelize");
const configVariable = require("../utilis/utilis.config");

const sequelize = new Sequelize(
  configVariable.dbName,
  configVariable.userName,
  configVariable.password,
  {
    dialect: configVariable.dbmsName,
    host: configVariable.host,
    logging: false,
  }
);

module.exports = sequelize;
