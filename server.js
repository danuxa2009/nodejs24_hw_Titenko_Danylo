require("dotenv").config();

const { OK, NOT_FOUND } = require("./constants/statusCodes");
const { healthcheck } = require("./constants/routes");
const { port } = require("./config/default");

const http = require("http");
const logger = require("./utils/logger")("server");
const server = http.createServer();
server.listen(port);

server.on("error", (error) => logger.error(`Server error: ${error}`));
server.on("listening", () => logger.info(`Server waiting on ${port} port`));

server.on("request", (req, res) => {
  if (req.method === "GET" && req.url === healthcheck) {
    res.writeHead(OK, { "Content-Type": "text/plain" });
    res.write("healthcheck passed");
    logger.info(`${req.method} ${req.url} ${res.statusCode}`);
  } else {
    res.writeHead(NOT_FOUND);
    logger.warn(`${req.method} ${req.url} ${res.statusCode}`);
  }

  res.end();
});

module.exports = server;
