import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myaccount = ({ user }) => {
    const router = useRouter()

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [newpassword, setNewpassword] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
        else {
            fetchData();
        }
    }, [])

    const fetchData = async () => {
        const token = localStorage.getItem('token')
        const data = { token }
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        setName(res.user.name)
        setAddress(res.user.address)
        setPhone(res.user.phone)
        setPincode(res.user.pincode)
    }

    const handleChange = (e) => {
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
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name === 'newpassword') {
            setNewpassword(e.target.value)
        }
        else if (e.target.name === 'cpassword') {

            setCpassword(e.target.value)
        }
    }

    const handledeliveryUpdate = async () => {
        const token = localStorage.getItem('token')
        const data = { field: "delivery", token, name, address, phone, pincode }
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
            if (res.success) {

                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                toast.error(res.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
    }
    const handlepasswordUpdate = async () => {
        const token = localStorage.getItem('token')
        const data = { field: "password", token, password, newpassword }
        if (newpassword === cpassword) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.success) {

                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                toast.error(res.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        }
        else {
            toast.error('Password and Confirm Password does not match', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }


    return (
        <div className='container m-auto'>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h2 className="mx-2 font-bold text-xl text">1. Delivery Details</h2>
            <div className="mx-auto flex">

                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="name" className="leading-7 text-sm font-semibold text-gray-600">Name</label>
                        <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    {user.email && <div className="mb-4 block">
                        <label htmlFor="email" className="leading-7 text-sm font-semibold text-gray-600">Email(cannot be modified)</label>
                        <input readOnly value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>}
                </div>
            </div>
            <div className="px-2 w-full">
                <div className="mb-4 block">
                    <label htmlFor="address" className="leading-7 text-sm font-semibold text-gray-600">Address</label>
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
            <button onClick={handledeliveryUpdate} disabled={!name || !address || !phone || !pincode} className="disabled:bg-gray-400 flex mx-2 mt-3 mb-3 text-white  bg-black border-0 py-3 px-5 focus:outline-none hover:bg-gray-500 rounded text-sm">Submit</button>


            <h2 className="mx-2 font-bold text-xl">2. Change Password</h2>
            <div className="mx-auto flex">

                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="password" className="leading-7 text-xs font-semibold text-gray-600">Password</label>
                        <input value={password} onChange={handleChange} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="newpassword" className="leading-7 text-xs font-semibold text-gray-600">New Password</label>
                        <input value={newpassword} onChange={handleChange} type="password" id="newpassword" name="newpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4 block">
                        <label htmlFor="cpassword" className="leading-7 text-xs font-semibold text-gray-600">Confirm Password</label>
                        <input value={cpassword} onChange={handleChange} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>


                </div>
            </div>
            <button onClick={handlepasswordUpdate} disabled={!password || !newpassword || !cpassword} className="disabled:bg-gray-400 flex mx-2 mt-3 text-white  bg-black border-0 py-3 px-5 focus:outline-none hover:bg-gray-500 rounded text-sm">Submit</button>
        </div>
    )
}

export default Myaccount