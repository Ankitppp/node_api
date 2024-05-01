const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const configVariable = require("./utilis/utilis.config");
const port = configVariable.port;
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");

require("./models/index.model");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors( 
  {
  origin: 'http://localhost:5173',
  credentials: true
}
));
app.use(cookieParser());
app.use("/", projectRoutes);
app.use("/auth", authRoutes);

const server = app.listen(port, () => {
  console.info(`Node Server Running on port ${port}`);
});

server.on("error", (error) => {
  console.error("error occured", error);
});
