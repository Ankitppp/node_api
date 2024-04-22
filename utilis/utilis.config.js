require("dotenv").config();

const configVariable = {
  dbName: process.env.TB_Name,
  userName: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.PORT,
  dbmsName: process.env.DBMS_NAME,
  isAllowed: process.env.IS_ALLOWED,
};

module.exports = configVariable;
