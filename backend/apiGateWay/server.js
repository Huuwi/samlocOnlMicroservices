const express = require("express");
const configServer = require("./src/config/configServer")
require("dotenv").config({ path: "./.env" });
const { createServer } = require("http");
const services = require("./src/services/services")
const { healInterval } = require("./src/services/healServices")
const { routingServices } = require("./src/services/routingServices")

//init value for roundrobin
const valueRobin = {}
Object.keys(services).forEach((serviceName) => {
    valueRobin[serviceName] = 0 // total use service
})
globalThis.valueRobin = valueRobin

globalThis.services = services


//init restful
const app = express()

//configserver restful
configServer(app)
routingServices(app)

const httpServer = createServer(app);

healInterval()

httpServer.listen(1111, () => {
    console.log("httpServer is running on port:", 1111);
});


