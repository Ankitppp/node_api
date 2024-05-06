const serverModel = require("../models/serverName.models");
const metricModel = require("../models/metric.models");
const sequelize = require("../configs/database.config");

exports.saveDataIntabels = async (payload) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    let serverData = await serverModel.findOne({
      where: { serverName: payload.serverName },
      transaction,
    });
    if (!serverData) {
      serverData = await serverModel.create(
        { serverName: payload.serverName },
        { transaction },
      );
    }
    const { dataValues } = await metricModel.create(
      {
        ServerId: serverData.id,
        ...payload.metricData,
      },
      { transaction },
    );
    await transaction.commit();
    return dataValues;
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new Error(error.message);
  }
};

exports.getALLMetricByServerName = async (payload) => {
  try {
    const server = await serverModel.findOne({
      where: { serverName: payload.serverName },
    });
    if (!server) {
      throw new Error("server does not exist");
    }
    const allServerData = await serverModel.findByPk(server.id, {
      include: metricModel,
    });
    return allServerData;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateServerName = async (payload) => {
  try {
    const server = await serverModel.findOne({
      where: { serverName: payload.oldServerName },
    });
    if (!server) {
      throw new Error("server does not exist");
    }
    server.serverName = payload.newServerName;
    await server.save();
    return server;
  } catch (error) {
    throw new Error(` Failed !! ${error.message}`);
  }
};

exports.deleteServerDetails = async (payload) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const server = await serverModel.findOne({
      where: { serverName: payload.serverName },
      transaction,
    });
    if (!server) {
      throw new Error("server does not exist ");
    }
    await metricModel.destroy({
      where: {
        serverId: server.id,
      },
      transaction,
    });
    await server.destroy({ transaction });

    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw new Error(`failed to delete , ${error.message} !!!`);
  }
};

exports.upload = async (data) => {
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const payload of data) {
      // eslint-disable-next-line no-await-in-loop
      let serverData = await serverModel.findOne({
        where: { serverName: payload.Server },
      });

      if (!serverData) {
        // eslint-disable-next-line no-await-in-loop
        serverData = await serverModel.create({ serverName: payload.Server });
      }
      // eslint-disable-next-line no-await-in-loop
      await metricModel.create({
        ServerId: serverData.id,
        date: payload.Date,
        month: payload.Month,
        memoryUtilization: payload["memoryUtilization "],
        cpuUtilization: payload["CpuUtilization "],
        loadAverage: payload.loadAverage,
        networkTraffic: payload["networkTraffic "],
        diskOps: payload.diskOps,
        diskCapacity: payload.diskCapacity,
      });
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
