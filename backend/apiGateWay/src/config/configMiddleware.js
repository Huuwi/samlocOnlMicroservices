const middleWareIndex = require("../middleware/index")


const apiConfig = {
    checkUser: {
        middleWare: middleWareIndex.authMiddleware.checkUserToken,
        apiPaths: ["/userService/api/user"]
    },
    checkAdmin: {
        middleWare: middleWareIndex.authMiddleware.checkAdminToken,
        apiPaths: ["/userService/api/admin"]
    },
}

const configApiMiddleWare = (app) => {
    for (let middleWareKey of Object.keys(apiConfig)) {
        for (let apiPath of apiConfig[middleWareKey].apiPaths) {
            app.use(apiPath, apiConfig[middleWareKey].middleWare)
        }
    }
}

module.exports = configApiMiddleWare
