// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middleware/mongoose"
import User from "@/models/User"
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == 'POST') {
        const {name,email,password}=req.body
        if(!name || !email || !password)
        {
            return res.status(400).json({ error:'Kindly fill all the fields' })
        }
         let user = await User.create({name,email,password:CryptoJS.AES.encrypt(JSON.stringify(password),process.env.AES_SECRET).toString()});
         if(user)
         {
            return res.status(200).json({ success:'User Account is Successfully Created' })
         }
        else
        {

            return res.status(400).json({ error:'Error while creating user' })
        }
    }
    else {
        res.status(200).json({ error: "This method is not allowed!" })
    }

}


export default connectDB(handler)
