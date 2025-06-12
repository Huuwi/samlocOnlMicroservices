const authMiddleware = require("./auth")
const rateLimiter = require("./rateLimit")

const indexMiddleware = {
    authMiddleware, rateLimiter
}

module.exports = indexMiddleware