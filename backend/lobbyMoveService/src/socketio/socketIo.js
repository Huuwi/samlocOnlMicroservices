const { Server } = require("socket.io");
const jwt = require("jsonwebtoken")

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
                'http://localhost:1111',
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

        //use middleware for all socket
        this.use((socket, next) => {
            //get token from headers
            let cookie = parseCookie(socket.request.headers?.cookie)
            let accessToken = cookie?.accessToken

            if (!accessToken) {
                next(new Error("not found token"))
                return
            }
            //decode token
            let decodeAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
            socket.decodeAccessToken = decodeAccessToken // add token decode

            next()
        })

        //handle when socket connect
        this.on("connect", (socket) => {
            console.log(socket.id + " connected ");
            const userMetaData = socket.decodeAccessToken
            this.socketArr.set(userMetaData.userId, {
                userMetaData,
                position: [0, 0, 0],
                socketId: socket.id,
                socketPointer: socket,
            })


            socket.on("disconnect", () => {
                console.log(socket.id + " vua ngat ket noi");
                this.socketArr.delete(userMetaData.userId)
            })
        });
    }


}


module.exports = SocketServer