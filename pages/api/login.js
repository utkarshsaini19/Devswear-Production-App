// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middleware/mongoose"
import User from "@/models/User"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { email, password } = req.body
        let user = await User.findOne({ email: email })
        var bytes = CryptoJS.AES.decrypt(user.password,process.env.AES_SECRET);
        var pass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (user) {

            if (email === user.email && password === pass) {
                var token = jwt.sign({email: user.email, name: user.name }, process.env.JWT_SECRET);
                return res.status(200).json({ success: true, token: token,email:email})
            }
            else {
                return res.status(400).json({ success: false, error: "Invalid credentials!" })
            }
        }
        else {
            return res.status(400).json({ success: false, error: "User does not exist!" })
        }
    }
    else {
        res.status(500).json({ error: "This method is not allowed!" })
    }

}


export default connectDB(handler)
