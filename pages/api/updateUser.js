import connectDB from "@/middleware/mongoose"
import User from "@/models/User"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const atoken = jwt.verify(req.body.token, process.env.JWT_SECRET);
        if (req.body.field == 'delivery') {
            const { name, address, phone, pincode } = req.body;
            const user = await User.findOneAndUpdate({ email: atoken.email }, { name: name, address: address, phone: phone, pincode: pincode })
            if(user)
            {

                return res.status(200).json({ success: true,user:user,message:"Updated Successfully!" })
            }
            else
            {
                return res.status(400).json({ success: false,user:user,message:"Cannot find User with this email!" })
            }
        }

        else if (req.body.field == 'password') {
            const { password, newpassword } = req.body;
            let user = await User.findOne({ email: atoken.email })
            var bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            var pass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            if (password === pass) {
                await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(JSON.stringify(newpassword), process.env.AES_SECRET).toString() })
                return res.status(200).json({ success: true,message:'Password Updated Successfully' })
            }
            else
            {
                return res.status(200).json({ success: false,message:'Your current password is wrong!' })
            }
        }
    }
    else {
        return res.status(400).json({ success: false, message: "Method cannot be fulfilled!" })
    }


}

export default connectDB(handler)