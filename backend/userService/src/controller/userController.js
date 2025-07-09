const Models = require("../modelORMs/index")
const commonHelper = require("../helper/commonHelper")


module.exports = {
    async getInforOwn(req, res) {
        try {
            const decodeAccessToken = JSON.parse(req.headers["x-decode"])
            const userFound = await Models.Users.findOne({
                where: {
                    userId: Number(decodeAccessToken.userId)
                }
            })
            if (!userFound) {
                return res.status(400).json({
                    message: "not found user"
                })
            }

            let customItems = null
            if (userFound.customItemsId) {
                customItems = await Models.CustomItems.findOne({
                    where: {
                        customItemsId: Number(userFound.customItemsId)
                    }
                })
            }

            return res.status(200).json({
                userFound, customItems
            })
        } catch (error) {
            console.log("err when getInforOwn : ", error)
        }
    },


}
