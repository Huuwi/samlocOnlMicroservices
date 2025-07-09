const userApi = require("express").Router()
const userController = require("../controller/userController")


userApi.get("/user/getInforOwn", userController.getInforOwn)



module.exports = userApi