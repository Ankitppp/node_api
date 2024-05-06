const Sequelize = require("sequelize");

const sequelize = require("../configs/database.config");

const serverName = require("./serverName.models");

const Metric = sequelize.define("Metric", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpuUtilization: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  memoryUtilization: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  loadAverage: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  networkTraffic: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  diskOps: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  diskCapacity: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  
}
);

serverName.hasMany(Metric);

module.exports = Metric;
