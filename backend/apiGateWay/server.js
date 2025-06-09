const express = require("express");
const configServer = require("./src/config/configServer")
require("dotenv").config({ path: "./.env" });
const { createServer } = require("http");

const services = require("./src/services/services")

//init value for roundrobin
const valueRobin = {}
Object.keys(services).forEach((serviceName) => {
    valueRobin[serviceName] = 0 // total use service
})
globalThis.valueRobin = valueRobin


const app = express()


configServer(app)


const httpServer = createServer(app);


httpServer.listen(1111, () => {
    console.log("httpServer is running on port:", 1111);
});


