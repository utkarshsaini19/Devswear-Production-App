// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middleware/mongoose"
import Product from "@/models/Product"


const handler = async (req, res) => {
    if (req.method == 'POST') {

        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
            
        }
        res.status(200).json({ success:'Updated Successfully' })
    }
    else {
        res.status(200).json({ error: "This method is not allowed!" })
    }

}


export default connectDB(handler)
