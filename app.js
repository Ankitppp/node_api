const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const configVariable = require("./utilis/utilis.config");
const port = configVariable.port;
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./Routes/project.routes");
app.use(bodyParser.json());
app.use(cors());
app.use("/", projectRoutes);
app.use("/auth", authRoutes);
app.post("/excel", (req, res) => {
  res.status(200).json({ message: "succeded is it" });
});

const server = app.listen(port, () => {
  console.info(`Node Server Running on port ${port}`);
});

server.on("error", (error) => {
  console.error("error occured", error);
});
