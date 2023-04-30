import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subtotal }) => {
    const ref = useRef()
    const router = useRouter();
    const [dropdown, setDropdown] = useState(false)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const path = ['/checkout', '/order', '/orders']
        if (path.includes(router.pathname)) {
            setToggle(false)
        }
    }, [router])


    const toggleDropdown = () => {
        setDropdown(prev => !prev)
    }


    const toggleCart = () => {
        setToggle(!toggle)
        // if (ref.current.classList.contains('hidden')) {
        //     ref.current.classList.remove('hidden')
        //     ref.current.classList.add('block')
        // }
        // else if (!ref.current.classList.contains('hidden')) {
        //     ref.current.classList.remove('block')
        //     ref.current.classList.add('hidden')
        // }
    }
    return (
        <div className='flex flex-col md:flex-row items-center md:justify-between shadow-md sticky top-0 z-10 bg-white'>
            <Link style={{ cursor: 'pointer' }} href={'/'}>
                <div className="logo flex items-center">
                    <Image className='mx-3 my-2' src="/logo.svg" alt="logo" width={50} height={50} style={{ borderRadius: '50%' }} />
                    <span className='font-bold'>DEVSWEAR.COM</span>
                </div>
            </Link>
            <div className="nav">
                <ul className='flex space-x-2 font-bold md:text-md'>
                    <Link legacyBehavior href='/tshirts'><a><li>Tshirts</li></a></Link>
                    <Link legacyBehavior href='hoodies'><a><li>Hoodies</li></a></Link>
                    <Link legacyBehavior href='/stickers'><a><li>Stickers</li></a></Link>
                    <Link legacyBehavior href='/mugs'><a><li>Mugs</li></a></Link>
                </ul>
            </div>
            <div className="cart mx-3 my-2 cursor-pointer flex items-center">
                {user.value && dropdown && <div className="absolute right-14 top-11 bg-gray-400 rounded-md px-2 w-40">
                    <span onClick={toggleDropdown} className="absolute top-3 right-3 cursor-pointer text-xl"><AiFillCloseCircle /></span>
                    <ul>
                        <Link href={'/myaccount'}><li className='py-1 font-semibold hover:text-white'>My Account</li></Link>
                        <Link href={'/orders'}><li className='py-1 font-semibold hover:text-white'>My Orders</li></Link>
                        <li onClick={logout} className='py-1 font-semibold hover:text-white'>Logout</li>
                    </ul>
                </div>}
                {user.value && <MdAccountCircle onClick={toggleDropdown} className='md:text-2xl mx-2' />}
                {!user.value && <Link href={'/login'}>
                    <button className='bg-black px-2 py-1 text-white rounded-md mx-1'>Login</button>
                </Link>}
                <AiOutlineShoppingCart onClick={toggleCart} className='md:text-2xl' />
            </div>

            <div ref={ref} className={`w-75 z-10 h-[100vh] sidebar overflow-y-scroll absolute top-0 right-0 bg-gray-400 px-6 py-6 ${toggle ? 'block' : 'hidden'}`}>
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute top-3 right-3 cursor-pointer text-xl"><AiFillCloseCircle /></span>
                <ul className='list-decimal'>
                    {
                        Object.keys(cart).length != 0 ? Object.keys(cart).map((k) => {
                            return <li key={k}>
                                <div className="item flex my-2">

                                    <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].color})</div>
                                    <div className='w-1/3 flex justify-center items-center'><AiFillMinusCircle onClick={() => removeFromCart(k, 1, 'The Catcher in the Rye XL', 499, 'XL', 'white')} className='cursor-pointer' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => addToCart(k, 1, 'The Catcher in the Rye XL', 499, 'XL', 'white')} className='cursor-pointer ' /></div>
                                </div>
                            </li>
                        }) : <div className='font-semibold my-4 text-center'>Your Cart is Empty</div>
                    }

                </ul>
                <div className='font-bold my-3'>Subtotal : ₹{subtotal}</div>
                <div className="flex justify-evenly">

                    <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="flex disabled:bg-slate-600 text-white mx-1 bg-black border-0 py-3 px-4 focus:outline-none hover:bg-gray-500 rounded text-sm">Checkout</button></Link>
                    <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="flex disabled:bg-slate-600 text-white  bg-black border-0 py-3 px-4 focus:outline-none hover:bg-gray-500 rounded text-sm">Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar