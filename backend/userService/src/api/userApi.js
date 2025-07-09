const userApi = require("express").Router()
const userController = require("../controller/userController")

userApi.get("/user/getInforOwn", userController.getInforOwn)
userApi.post("/user/updateCustomItemsOwn", userController.updateCustomItemsOwn)



module.exports = userApi