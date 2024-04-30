const Sequelize = require("sequelize");
const sequelize = require("../configs/database.config");
const Server = sequelize.define("Server", {
  serverName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Server;
  