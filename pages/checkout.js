import Link from 'next/link'
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ user, cart, addToCart, clearCart, removeFromCart, subtotal }) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        console.log("Inside use Effect");
        if (name && address && phone.length === 10 && pincode.length === 6 && city && state) {
            setFlag(false)
        }
        else {
            setFlag(true)
        }
    }, [name, address, phone, pincode, city, state])



    const checkoutHandler = async () => {


        const data = { subtotal, cart, email: user.email, name, address, pincode, phone }
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const Data = await response.json();
        if (Data.success) {
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: subtotal,
                currency: "INR",
                name: "DevsWear",
                description: "Your Order",
                image: "https://example.com/your_logo",
                order_id: Data.order.id,
                callback_url: "http://localhost:3000/api/postransaction",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    "address": "DevsWear Office Lucknow"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            var razor = new window.Razorpay(options);
            razor.open();
        }
        else {
            localStorage.removeItem('cart')
            if (Data.cartClear) {

                clearCart()
            }
            toast.error(Data.error, {
                position: "top-center",
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

    const handleChange = async (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name === 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name === 'pincode') {

            setPincode(e.target.value)
            if (e.target.value.length === 6) {
                const data = await fetch('/api/pincode');
                const pins = await data.json();
                if (Object.keys(pins).includes(e.target.value)) {
                    setCity(pins[e.target.value][0])
                    setState(pins[e.target.value][1])
                }
                else {
                    setCity("Kindly fill correct Pin!")
                    setState("Kindly fill correct State!")
                }
            }
            else {
                setCity('')
                setState('')
            }
        }


    }
    return (
        <div className="container m-auto">
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />

            </Head>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h1 className="text-center font-bold text-3xl">Shopping Cart</h1>
            <h2 className="mx-2 font-bold text-xl">1. Delivery Details</h2>
            <div className="mx-auto flex">

                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="name" className="leading-7 text-sm font-semibold text-gray-600">Name</label>
                        <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    {user.email && <div className="mb-4 block">
                        <label htmlFor="email" className="leading-7 text-sm font-semibold text-gray-600">Email</label>
                        <input readOnly value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>}
                </div>
            </div>
            <div className="px-2 w-full">
                <div className="mb-4 block">
                    <label htmlFor="email" className="leading-7 text-sm font-semibold text-gray-600">Address</label>
                    <textarea value={address} onChange={handleChange} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" cols="20" rows="3"></textarea>
                </div>
            </div>
            <div className="mx-auto flex">

                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="phone" className="leading-7 text-sm font-semibold text-gray-600">Phone</label>
                        <input value={phone} onChange={handleChange} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="pincode" className="leading-7 text-sm font-semibold text-gray-600">Pincode</label>
                        <input value={pincode} onChange={handleChange} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>


                </div>
            </div>
            <div className="mx-auto flex">

                <div className="px-2 w-1/2">

                    <div className="mb-4 block">
                        <label htmlFor="city" className="leading-7 text-sm font-semibold text-gray-600">City</label>
                        <input readOnly value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>


                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="state" className="leading-7 text-sm font-semibold text-gray-600">State</label>
                        <input readOnly value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <h2 className="mx-2 font-bold text-xl">2. Review Cart Items</h2>

            <div className="w-75 z-10 mt-3 h-full sidebar bg-gray-400 px-6 py-6">

                <ul className='list-decimal'>
                    {
                        Object.keys(cart).length != 0 ? Object.keys(cart).map((k) => {
                            return <li key={k}>
                                <div className="item flex my-2">

                                    <div className='mr-5 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].color})</div>
                                    <div className='flex justify-center items-center'><AiFillMinusCircle onClick={() => removeFromCart(k, 1, 'The Catcher in the Rye XL', 499, 'XL', 'white')} className='cursor-pointer' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => addToCart(k, 1, 'The Catcher in the Rye XL', 499, 'XL', 'white')} className='cursor-pointer ' /></div>
                                </div>
                            </li>
                        }) : <div className='font-semibold my-4 text-center'>Your Cart is Empty</div>
                    }

                </ul>
                <div className='font-bold'>Subtotal : ₹{subtotal}</div>

            </div>
            <button disabled={flag} onClick={checkoutHandler} className="disabled:bg-gray-400 flex mt-3 text-white  bg-black border-0 py-3 px-4 focus:outline-none hover:bg-gray-500 rounded text-sm">Pay Now</button>

        </div>
    )
}

export default Checkout
