const Models = require("../modelORMs/index")
const commonHelper = require("../helper/commonHelper")
const indexServices = require("../services/indexServices")

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
            return res.status(500).json({
                message: "have wrong"
            })
        }
    },

    async updateCustomItemsOwn(req, res) {
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

            const customItemsId = Number(userFound.customItemsId)
            const customItemsFound = await indexServices.customItemService.getCustomItemById(customItemsId)
            if (!customItemsFound) {
                return res.status(400).json({
                    message: "not found customItems"
                })
            }

            const customItems = req.body.customItems

            if (!customItems) {
                return res.status(400).json({
                    message: "missing data"
                })
            }
            for (let property of Object.keys(customItems)) {
                if (customItems[property]) {
                    customItemsFound[property] = customItems[property]
                }
            }

            let updated = await indexServices.customItemService.updateCustomItem(customItemsId, customItems)
            return res.status(200).json({
                message: "update successfully",
                updated
            })
        } catch (error) {
            console.log("err when updateCustomItemsOwn : ", error)
            return res.status(500).json({
                message: "have wrong"
            })
        }

    }


}
