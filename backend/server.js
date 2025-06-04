const express = require("express");
require("dotenv").config({ path: "./.env" });
const { createServer } = require("http");
const { authApi } = require("./src/api/authApi.js")
require('dotenv').config()
const Connection = require("./src/database/connection.js")


globalThis.connection = new Connection()
globalThis.connection.connect()


const app = express();
const httpServer = createServer(app);


//use API route
app.use("/api", authApi)


// Run the app
let PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log("httpServer is running on port:", PORT);
});
