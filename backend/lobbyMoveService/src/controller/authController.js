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
            nickName: findedUser.nickName
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })

        res.cookie("token", token, {})

        return res.status(200).json({
            message: "ok",
            userData: findedUser
        })
    } catch (error) {
        console.log("have wrong when login : ", error)
        res.status(500).json({
            message: "have wrong!"
        })
    }

}

const register = async (req, res) => {

}

const getNewAccesToken = async (req, res) => {

}

const getNewRefreshToken = async (req, res) => {

}


const authControler = { login, register, getNewAccesToken, getNewRefreshToken }

module.exports = authControler