// create the express server here
const { PORT = 3000 } = process.env;
const express = require("express");
const cors = require("cors");
const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
const client = require("./db/client");

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

server.use("/api", apiRouter);
server.get("/api", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

client.connect();

server.listen(PORT, () => {
  console.log("Server is live on port:", PORT);
});
