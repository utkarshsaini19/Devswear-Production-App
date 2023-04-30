import connectDB from "@/middleware/mongoose"
import User from "@/models/User"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    const { token } = req.body;
    const atoken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: atoken.email }).select('-password')
    return res.status(200).json({ user })


}

export default connectDB(handler)