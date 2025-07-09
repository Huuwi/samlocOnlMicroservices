const jwt = require("jsonwebtoken")

const checkUserToken = async (req, res, next) => {


    const { accessToken } = req.cookies

    try {
        let decodeAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
        req["headers"]["X-decode"] = JSON.stringify(decodeAccessToken)
        next()
    } catch (error) {
        console.log("fail to verifyAccessToken : ", error);
        res.status(400).json({
            message: "unauthorized"
        })
        // next()
    }
}

const checkAdminToken = async (req, res, next) => {
    const { accessToken } = req.cookies

    try {
        let decodeAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
        if (!decodeAccessToken?.isAdmin) {
            return res.status(400).json({
                message: "u are not admin!"
            })
        }
        req.decodeAccessToken = decodeAccessToken
        next()
    } catch (error) {
        console.log("fail to verifyAccessToken : ", error);
        return res.status(400).json({
            message: "unauthorized!"
        })
    }
}


const authMiddleware = {
    checkUserToken, checkAdminToken
}

module.exports = authMiddleware