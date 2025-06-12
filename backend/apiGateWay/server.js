const express = require("express");
const configServer = require("./src/config/configServer");
require("dotenv").config({ path: "./.env" });
const { createServer } = require("http");
const services = require("./src/handleServices/services");
const { healInterval } = require("./src/handleServices/healServices");
const { routingServices } = require("./src/handleServices/routingServices");
const indexMiddleware = require("./src/middleware/index")

const valueRobin = {};
Object.keys(services).forEach((serviceName) => {
    valueRobin[serviceName] = 0;
});
globalThis.valueRobin = valueRobin;
globalThis.services = services;

const app = express();

configServer(app);

const httpServer = createServer(app);


//midlleware
// app.use("*", indexMiddleware.rateLimiter)


routingServices(app);


healInterval();

httpServer.listen(1111, () => {
    console.log("httpServer is running on port:", 1111);
});
