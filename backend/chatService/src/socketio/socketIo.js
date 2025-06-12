const { Server } = require("socket.io");

require("dotenv").config({ path: "./.env" })
const authMiddleware = require("../middleware/authMiddleWare")

function parseCookie(cookieString) {

    if (typeof cookieString != "string") {
        return {}
    }

    return cookieString
        .split('; ')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => {
            acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
            return acc;
        }, {})
}



const configSocketIo = {
    cors: {
        origin: (origin, callback) => {
            const allowedOrigins = [
                process.env.FONT_END_URL,
                'http://localhost:1111' <
                'http://localhost:5173/'
            ];

            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('CORS không được phép từ domain này'));
            }
        },
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }

}

module.exports = { configSocketIo }


class SocketServer extends Server {
    socketArr = new Map()
    io

    constructor(httpServer, config = configSocketIo) {
        super(httpServer, configSocketIo)

        this.use((socket, next) => {
            let cookie = parseCookie(socket.request.headers?.cookie)
            console.log(cookie);

            let accessToken = cookie?.accessToken

            if (!accessToken) {
                next(new Error("not found token"))
                return
            }
            next()
        })

        this.on("connect", (socket) => {
            console.log(socket.id);

            this.emit("hello", "hellllo")

        })

    }


}


module.exports = SocketServer