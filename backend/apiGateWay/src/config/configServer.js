const express = require('express');
var cookieParser = require('cookie-parser')


function configServer(app) {
    app.use(express.static('./src/public'))
    app.use(cookieParser())


}

module.exports = configServer