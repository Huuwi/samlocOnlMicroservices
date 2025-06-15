const express = require('express');
var cookieParser = require('cookie-parser')


function configServer(app) {
    app.use(express.json());
    app.use(express.static('./src/public'))
    app.use(
        express.urlencoded({
            extended: true,
            inflate: true,
            limit: "1mb",
            parameterLimit: 5000,
            type: "application/x-www-form-urlencoded",
        })
    );
    app.use(cookieParser())

}

module.exports = configServer