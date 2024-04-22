const service = require("../../services/project.service");
const serverNameModel = require("../../models/serverName.models");
const metricNameModel = require("../../models/metric.models");

jest.mock("../../models/serverName.models", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
}));

jest.mock("../../models/metric.models", () => ({
  create: jest.fn(),
}));
  
describe("saveDataIntabels", () => {
  it("should create new server and metric", async () => {
    const payload = {
      serverName: "21.31.41.51",
      metricData: {                                                         
        date: "2010-01-01T18:30:00.000Z",
        month: "jan",
        cpuUtilization: 47.7,
        memoryUtilization: 67.8,
        loadAverage: 47.5,
        networkTraffic: 67.5,
        diskOps: 5,
        diskCapacity: 45,
      },
    };

    await serverNameModel.findOne.mockResolvedValue(null);
    await serverNameModel.create.mockResolvedValue({ id: 20 });
    await metricNameModel.create.mockResolvedValue({
      dataValues: {
        id: 37,
        ServerId: 20,
        date: "2010-01-01T18:30:00.000Z",
        month: "jan",
        cpuUtilization: 47.7,
        memoryUtilization: 67.8,
        loadAverage: 47.5,
        networkTraffic: 67.5,
        diskOps: 5,
        diskCapacity: 45,
      },
    });

    const result = await service.saveDataIntabels(payload);
    expect(result).toStrictEqual({
      id: 37,
      ServerId: 20, 
      date: "2010-01-01T18:30:00.000Z",
      month: "jan",
      cpuUtilization: 47.7,
      memoryUtilization: 67.8,
      loadAverage: 47.5,
      networkTraffic: 67.5,
      diskOps: 5,
      diskCapacity: 45,
    });
  });

  it("should update existing server with new metric", async () => {
    const payload = {
      serverName: "21.31.41.51",
      metricData: {
        date: "2010-01-01T18:30:00.000Z",
        month: "jan",
        cpuUtilization: 47.7,
        memoryUtilization: 67.8,
        loadAverage: 47.5,
        networkTraffic: 67.5,
        diskOps: 5,
        diskCapacity: 45,
       },
    };

    serverNameModel.findOne.mockResolvedValue({
      id: 20,
    });
    metricNameModel.create.mockResolvedValue({
      dataValues: {
        id: 37,
        ServerId: 20,
        date: "2010-01-01T18:30:00.000Z",
        month: "jan",
        cpuUtilization: 47.7,
        memoryUtilization: 67.8,
        loadAverage: 47.5,
        networkTraffic: 67.5,
        diskOps: 5,
        diskCapacity: 45,
      },
    });

    const result = await service.saveDataIntabels(payload);

    expect(result).toEqual({
      id: 37,
      ServerId: 20,
      date: "2010-01-01T18:30:00.000Z",
      month: "jan",
      cpuUtilization: 47.7,
      memoryUtilization: 67.8,
      loadAverage: 47.5,
      networkTraffic: 67.5,
      diskOps: 5,
      diskCapacity: 45,
    });
  });

  it("fetch data from the tabels", async () => {
    const payload = {
      serverName: "21.31.41.51",
    };

    serverNameModel.findOne.mockResolvedValue({ id: 20 });
    serverNameModel.findByPk.mockResolvedValue({
      allServerData: {
        id: 20,
        serverName: "21.31.41.51",
        createdAt: "2024-04-15T05:05:20.000Z",
        updatedAt: "2024-04-15T05:05:20.000Z",
        Metrics: [
          {
            id: 37,
            date: "2010-01-01T18:30:00.000Z",
            month: "jan",
            cpuUtilization: 47.7,
            memoryUtilization: 67.8,
            loadAverage: 47.5,
            networkTraffic: 67.5,
            diskOps: 5,
            diskCapacity: 45,
            createdAt: "2024-04-15T05:05:20.000Z",
            updatedAt: "2024-04-15T05:05:20.000Z",
            ServerId: 20,
          },
          {
            id: 38,
            date: "2010-01-01T18:30:00.000Z",
            month: "feb",
            cpuUtilization: 47.7,
            memoryUtilization: 67.8,
            loadAverage: 47.5,
            networkTraffic: 67.5,
            diskOps: 5,
            diskCapacity: 45,
            createdAt: "2024-04-15T09:37:15.000Z",
            updatedAt: "2024-04-15T09:37:15.000Z",
            ServerId: 20,
          },
          {
            id: 39,
            date: "2010-01-01T18:30:00.000Z",
            month: "march",
            cpuUtilization: 47.7,
            memoryUtilization: 67.8,
            loadAverage: 47.5,
            networkTraffic: 67.5,
            diskOps: 5,
            diskCapacity: 45,
            createdAt: "2024-04-15T09:38:43.000Z",
            updatedAt: "2024-04-15T09:38:43.000Z",
            ServerId: 20,
          },
        ],
      },
    });

    const result = await service.getALLMetricByServerName(payload);

    expect(serverNameModel.findOne).toHaveBeenCalledWith({
      where: { serverName: payload.serverName },
    });

    expect(result).toEqual({
      allServerData: {
        id: 20,
        serverName: "21.31.41.51",
        createdAt: "2024-04-15T05:05:20.000Z",
        updatedAt: "2024-04-15T05:05:20.000Z",
        Metrics: [
          {
            id: 37,
            date: "2010-01-01T18:30:00.000Z",
            month: "jan",
            cpuUtilization: 47.7,
            memoryUtilization: 67.8,
            loadAverage: 47.5,
            networkTraffic: 67.5,
            diskOps: 5,
            diskCapacity: 45,
            createdAt: "2024-04-15T05:05:20.000Z",
            updatedAt: "2024-04-15T05:05:20.000Z",
            ServerId: 20,
          },
          {
            id: 38,
            date: "2010-01-01T18:30:00.000Z",
            month: "feb",
            cpuUtilization: 47.7,
            memoryUtilization: 67.8,
            loadAverage: 47.5,
            networkTraffic: 67.5,
            diskOps: 5,
            diskCapacity: 45,
            createdAt: "2024-04-15T09:37:15.000Z",
            updatedAt: "2024-04-15T09:37:15.000Z",
            ServerId: 20,
          },
          {
            id: 39,
            date: "2010-01-01T18:30:00.000Z",
            month: "march",
            cpuUtilization: 47.7,
            memoryUtilization: 67.8,
            loadAverage: 47.5,
            networkTraffic: 67.5,
            diskOps: 5,
            diskCapacity: 45,
            createdAt: "2024-04-15T09:38:43.000Z",
            updatedAt: "2024-04-15T09:38:43.000Z",
            ServerId: 20,
          },
        ],
      },
    });
  });
});
