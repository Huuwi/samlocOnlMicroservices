const testApi = require("express").Router()
const authControler = require("../controller/authController")

testApi.get("/", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})



module.exports = { testApi }
