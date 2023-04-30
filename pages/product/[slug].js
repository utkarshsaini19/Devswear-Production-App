import { useRouter } from "next/router"
import { useState } from "react";
import Link from "next/link"
import Product from "@/models/Product"
import mongoose from 'mongoose';
import Error from 'next/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Slug = ({ error, buyNow, addToCart, variants, product }) => {
    const router = useRouter();
    const { slug } = router.query
    const [pin, setPin] = useState()
    const [service, setService] = useState(null)
    const [size, setSize] = useState(product ? product.size : '')
    const [color, setColor] = useState(product ? product.color : '')

    const refreshVariants = (newcolor, newsize) => {
        let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize].slug}`
        window.location = url;
    }

    const handleChange = (e) => {

        setPin(e.target.value)

    }
    const handleClick = async () => {

        const data = await fetch('/api/pincode');
        const pins = await data.json();
        const pincode = Object.keys(pins)
        

        if (pincode.includes(pin)) {
            setService(true)
            toast.success('This Pincode is Serviceable!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            setService(false)
            toast.error('Pincode is not Serviceable!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    if (error) {
        return <Error statusCode={error} />
      }

    return (
        <>
            <section className="text-gray-600 body-font">
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="container px-5 py-20 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-50 object-cover object-center rounded" src={product.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">DEVSWEAR</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}({size}/{color})</h1>
                            <div className="flex mb-4">
                                {/* Item and Review */}
                            </div>
                            <p className="leading-relaxed">{product.desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => refreshVariants('black', size)} className={`border-2 ${color == 'black' ? 'border-red-800' : 'border-gray-300'}  bg-black rounded-full w-6 h-6 `}></button>}
                                    {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => refreshVariants('blue', size)} className={`border-2 ${color == 'blue' ? 'border-red-800' : 'border-gray-300'} border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 `}></button>}
                                    {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => refreshVariants('yellow', size)} className={`border-2 ${color == 'yellow' ? 'border-red-800' : 'border-gray-300'} border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 `}></button>}
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => refreshVariants(color, e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            {Object.keys(variants[color]).includes('S') && <option value='S'>S</option>}
                                            {Object.keys(variants[color]).includes('M') && <option value='M'>M</option>}
                                            {Object.keys(variants[color]).includes('L') && <option value='L'>L</option>}
                                            {Object.keys(variants[color]).includes('XL') && <option value='XL'>XL</option>}
                                            {Object.keys(variants[color]).includes('XXL') && <option value='XXL'>XXL</option>}

                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                                {<button disabled={product.availableQty===0} onClick={() => { buyNow(slug, 1, product.title, product.price, size, color) }} className="flex ml-3 disabled:bg-gray-400 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded">Buy Now</button>}
                                {<button disabled={product.availableQty===0} onClick={() => { addToCart(slug, 1, product.title, product.price, size, color) }} className="flex ml-3 disabled:bg-gray-400 text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded">Add to Cart</button>}
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex mt-5">
                                <input className="w-25 text-15 px-2 mx-2" onChange={(e) => handleChange(e)} type="text" placeholder="Enter the Pincode..." />
                                <button onClick={handleClick} className="flex justify-start w-25 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">Check Availability</button>
                            </div>
                            {product.availableQty===0 && <div className="flex mt-5">
                                <span className="font-semibold">Currently out of stock . Will be back soon !</span>
                            </div>}
                            {
                                service !== null && (service ? <div className="mt-4 text-green-600">This Pincode is Serviceable</div> : <div className="mt-4 text-red-600">We do not deliver to this location</div>)
                            }


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }
    const product = await Product.findOne({ slug: context.query.slug })
    if(!product)
    {
        return {
            props: { error:'404' }
        }
    }
    const variants = await Product.find({ title: product.title })
    let colorsizeslug = {};

    for (let item of variants) {
        if (Object.keys(colorsizeslug).includes(item.color)) {
            colorsizeslug[item.color][item.size] = { 'slug': item.slug };
        }
        else {
            colorsizeslug[item.color] = {};
            colorsizeslug[item.color][item.size] = { 'slug': item.slug };

        }
    }



    return {
        props: { variants: colorsizeslug, product: JSON.parse(JSON.stringify(product)) }, // will be passed to the page component as props
    }
}

export default Slug
