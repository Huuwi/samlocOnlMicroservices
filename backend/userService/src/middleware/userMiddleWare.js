


module.exports = {
    checkUser: async (req, res, next) => {
        const accessToken = req.cookies?.accessToken
        if (!accessToken) {
            return res.status(400).json({
                message: "not found token!"
            })
        }


    },
}