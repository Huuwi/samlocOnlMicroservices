const express = require("express");
require("dotenv").config({ path: "./.env" });
const { createServer } = require("http");
const { authApi } = require("./src/api/authApi.js")
require('dotenv').config()
const Connection = require("./src/database/connection.js")
const configServer = require("./src/config/configServer.js")

globalThis.connection = new Connection()
globalThis.connection.connect()




const app = express();
const httpServer = createServer(app);

//config
configServer(app)


//use API route
app.use("/api/user", authApi)




// Run the app
let PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log("httpServer is running on port:", PORT);
});
