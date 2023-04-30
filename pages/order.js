import { useRouter } from "next/router"
import mongoose from 'mongoose';
import Order from "@/models/Order";
import { useEffect } from "react";

const MyOrder = ({ order,clearCart }) => {

    const router = useRouter();

    useEffect(() => {
      
        if(router.query.clearCart == 1)
        {
            clearCart();
        }
    }, [])
    
    
    return (
        order ? <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        {order && <h2 className="text-sm title-font text-gray-500 tracking-widest">DEVSWEAR.COM</h2>}
                        {order && <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID : #{order.orderId}</h1>}
                        {order && <h2 className="text-xl title-font text-green-500 tracking-widest">Your Order has been Successfully Placed</h2>}
                        {order && <h4 className="text-xl title-font text-gray-500 tracking-widest">Your Payment Status is : <span className="font-semibold text-green-500">{order.status}</span></h4>}
                        <div className="flex mb-4">
                            <a className="flex-grow text-center border-b-2  py-2 text-lg px-1">Item Description</a>
                            <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                            <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
                        </div>
                        {
                            order && Object.keys(order.products).length!=0 && Object.keys(order.products).map((key) => {
                                return <div key={key} className="flex border-b border-gray-200 py-2">
                                    <span className="text-gray-500">{order.products[key].name}({order.products[key].size}/{order.products[key].color})</span>
                                    <span className="ml-auto text-gray-900">{order.products[key].qty}</span>
                                    <span className="ml-auto text-gray-900">₹{order.products[key].price}</span>
                                </div>
                            })
                        }


                    {order && <div className="flex flex-col">
                        <span className="title-font font-medium text-2xl text-gray-900">Subtotal : ₹{order.amount}</span>
                        <div>

                            <button className="flex mt-3 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded">Track Order</button>
                        </div>

                    </div>}
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://m.media-amazon.com/images/I/51eZAuTWrjL._UL1100_.jpg" />
                </div>
            </div>
        </section> : <div className="text-center font-bold py-5">Select order from MyOrder Section to View!</div>
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }
    const order = await Order.findById(context.query.id)





    return {
        props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
    }
}

export default MyOrder
