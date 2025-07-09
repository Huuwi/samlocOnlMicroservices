const express = require("express");
const { createServer } = require("http");
require('dotenv').config({ path: "./.env" })


const authApi = require("./src/api/authApi.js")
const userApi = require("./src/api/userApi.js")

const Connection = require("./src/database/connection.js")
const configServer = require("./src/config/configServer.js")

globalThis.connection = new Connection()
globalThis.connection.connect()


const app = express();
const httpServer = createServer(app);

//config
configServer(app)


//use API route
app.use("/api", authApi)
app.use("/api", userApi)


// Run the app
let PORT = process.env.PORT || 8001;
httpServer.listen(PORT, () => {
    console.log("httpServer is running on port:", PORT);
});
