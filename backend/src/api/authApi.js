const authApi = require("express").Router()

authApi.get("/", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})


//auth
// authApi.post()


module.exports = { authApi }
