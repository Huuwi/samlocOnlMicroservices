const Models = require("../modelORMs/index")
const commonHelper = require("../helper/commonHelper")
const jwt = require('jsonwebtoken');


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

        const token = jwt.sign({
            userId: findedUser.userId,
            nickName: findedUser.nickName,
            isAdmin: findedUser.isAdmin
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

        let newUser = await Models.Users.create({
            username,
            password: hashedPass,
            nickName
        })

        return res.status(200).json({
            message: "ok",
            userData: newUser
        })
    } catch (error) {
        console.log("have wrong when register : ", error)
        res.status(500).json({
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