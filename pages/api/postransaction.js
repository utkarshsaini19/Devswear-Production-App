import crypto from 'crypto'
import connectDB from "@/middleware/mongoose"
import Order from "@/models/Order"
import Product from '@/models/Product';

const handler = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (razorpay_signature === expectedSignature) {

        let order = await Order.findOneAndUpdate({orderId:razorpay_order_id},{status:'Paid',paymentInfo:JSON.stringify(req.body)})
        let products = order.products;
        for(let slug in products)
        {
            await Product.findOneAndUpdate({slug:slug},{$inc : {'availableQty' : -products[slug].qty}})
        }
        res.status(200).redirect(`${process.env.NEXT_PUBLIC_HOST}/order?id=${order._id}&clearCart=1`)
    }
    else {
        res.status(400).json({ error: "Some error occured!" })
    }
}

export default connectDB(handler)
