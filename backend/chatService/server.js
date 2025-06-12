const express = require("express");
require("dotenv").config({ path: "./.env" });
const { createServer } = require("http");
require('dotenv').config()
const configServer = require("./src/config/configServer.js")
const SocketServer = require("./src/socketio/socketIo.js")

const app = express();
const httpServer = createServer(app);

//config
configServer(app)
const io = new SocketServer(httpServer);
globalThis.io = io; // Global

//use API route



// Run the app
let PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log("httpServer is running on port:", PORT);
});
