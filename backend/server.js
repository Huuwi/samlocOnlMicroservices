const express = require("express");
require("dotenv").config({ path: "./.env" });
const { createServer } = require("http");
const { api } = require("./src/api/api.js")

const app = express();
const httpServer = createServer(app);


//use API route
app.use("/api", api)


// Run the app
let PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log("httpServer is running on port:", PORT);
});
