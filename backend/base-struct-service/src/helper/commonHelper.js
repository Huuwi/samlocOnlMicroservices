const crypto = require("crypto")



function sha256(string, typeHash = "hex") {
    try {
        let sha256 = crypto.createHash("sha256")
        return sha256.update(string).digest(typeHash)
    } catch (error) {
        console.log("err when sha256 : ", error);
    }
}

function md5(string, typeHash = "hex") {
    try {
        let md5 = crypto.createHash("md5")
        return md5.update(string).digest(typeHash)
    } catch (error) {
        console.log("err when md5 : ", error);
    }
}

const commonHelper = { sha256, md5 }


module.exports = commonHelper