const { Server } = require("socket.io");

class SocketServer {
    sockets = new Map()
    io

    constructor() {

    }

    connect() {
        const socket = new Server()
    }

}


module.exports = SocketServer