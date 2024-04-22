const sequelize = require("../configs/database.config");
require("./metric.models");
require("./serverName.models");
require("./user.model");

sequelize.sync();
