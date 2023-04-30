// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middleware/mongoose"
import Order from "@/models/Order"
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == 'POST') {
        const token = jwt.verify(req.body.token, process.env.JWT_SECRET);
        const order = await Order.find({ email: token.email , status: 'Paid' })
        return res.status(200).json(order)
        


    }
    else{
        return res.status(500).json({ error: "This method is not allowed!" })
    }

}


export default connectDB(handler)
