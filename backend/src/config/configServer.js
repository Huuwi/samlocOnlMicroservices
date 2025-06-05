const express = require('express');


function configServer(app) {
    app.use(express.static('./src/public'))
}

module.exports = configServer