const express = require('express');
var cookieParser = require('cookie-parser')
const cors = require('cors');


function configServer(app) {
    app.use(express.static('./src/public'))
    app.use(cookieParser())
    app.use(cors({
        origin: process.env.FRONT_END_URL || 'http://localhost:5173',   // Đúng origin của frontend
        credentials: true                  // Cho phép cookie/header cross-origin
    }));

}

module.exports = configServer