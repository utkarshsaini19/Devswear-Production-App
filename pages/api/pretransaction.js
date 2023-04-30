import Razorpay from "razorpay"
import connectDB from "@/middleware/mongoose"
import Order from "@/models/Order"
import Product from "@/models/Product"
import pincodes from '../../pincodes'

const handler = async (req, res) => {

    if (req.method === 'POST') {

        const { subtotal,cart,email,name,address,pincode,phone } = req.body;

        if(!Object.keys(pincodes).includes(pincode))
        {
            return res.status(400).json({success: false,error:"Item not serviceable to this pincode",cartClear:false})
        }

        let product,sumtotal=0;
        for(let item in cart)
        {
            product = await Product.findOne({slug:item})
            // Check if the cart is tampered or price is changed
            if(product.price !== cart[item].price)
            {
                return res.status(400).json({success: false,error:"Price of some items in cart have changed! Please try again!",cartClear:true})
            }
            // Check if cart items are out of stock
            if(product.availableQty < cart[item].qty)
            {
                return res.status(400).json({success: false,error:"Some items in your cart went out of Stock! Will be back soon!",cartClear:false})
            }

        }





        
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        var options = {
            amount: Number(subtotal * 100),  // amount in the smallest currency unit
            currency: "INR"
        };
        const order = await instance.orders.create(options)
        let iorder = await Order.create({
            email,orderId:order.id,address,amount:subtotal,products:cart
        })
        return res.status(200).json({ success: true, order,cartClear:false })
    }
    else {
        return res.status(400).json({success: false, error: 'Request cannot be fulfilled',cartClear:false })
    }
}

export default connectDB(handler)
