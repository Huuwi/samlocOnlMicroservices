const Models = require("../modelORMs/index")
const commonHelper = require("../helper/commonHelper")
const jwt = require('jsonwebtoken');
const indexServices = require("../services/indexServices")

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                message: "missing data!"
            })
        }

        let hashedPass = commonHelper.md5(password)

        let findedUser = await Models.Users.findOne({
            where: {
                username,
                password: hashedPass
            }
        })

        if (!findedUser) {
            return res.status(400).json({
                message: "username or password not correct!"
            })
        }

        const customItems = await indexServices.customItemService.getCustomItemById(findedUser.customItemsId)

        const token = jwt.sign({
            userId: findedUser.userId,
            nickName: findedUser.nickName,
            isAdmin: findedUser.isAdmin,
            rankPoint: findedUser.rankPoint,
            customItems
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })

        res.cookie("accessToken", token, {})

        return res.status(200).json({
            message: "ok",
            userData: findedUser,
            refreshToken: jwt.sign({
                userId: findedUser.userId,
                nickName: findedUser.nickName,
                isAdmin: findedUser.isAdmin
            }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })
        })
    } catch (error) {
        console.log("have wrong when login : ", error)
        res.status(500).json({
            message: "have wrong!"
        })
    }

}

const register = async (req, res) => {
    try {
        const { username, password, nickName } = req.body

        if (!username || !password || !nickName) {
            return res.status(400).json({
                message: "missing data!"
            })
        }

        let hashedPass = commonHelper.md5(password)

        let findedUser = await Models.Users.findOne({
            where: {
                username
            }
        })

        if (findedUser) {
            return res.status(400).json({
                message: "username already exist!"
            })
        }

        let newCustomItems = await indexServices.customItemService.createCustomItem({})
        const newUser = await indexServices.userService.createUser({
            username, password: hashedPass, nickName, customItemsId: newCustomItems.customItemsId
        })


        const token = jwt.sign({
            userId: newUser.userId,
            nickName: newUser.nickName,
            isAdmin: newUser.isAdmin,
            rankPoint: findedUser.rankPoint,
            customItems: newCustomItems
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 })

        res.cookie("accessToken", token, {})

        return res.status(200).json({
            message: "ok",
            userData: newUser,
            customItems: newCustomItems,
            refreshToken: jwt.sign({
                userId: findedUser.userId,
                nickName: findedUser.nickName,
                isAdmin: findedUser.isAdmin
            }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 })
        })
    } catch (error) {
        console.log("have wrong when register : ", error)
        return res.status(500).json({
            message: "have wrong!"
        })
    }
}

const getNewAccesToken = async (req, res) => {

}

const getNewRefreshToken = async (req, res) => {

}


const authControler = { login, register, getNewAccesToken, getNewRefreshToken }

module.exports = authControler