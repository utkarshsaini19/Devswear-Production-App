import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
          router.push('/')
        }
      }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, password }
        const response = await fetch(`https://devswear-production-app.vercel.app/api/signup`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        toast.success('Your Account Has been Created!', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setName('');
        setEmail('');
        setPassword('');

    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }
    return (
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <ToastContainer
                position="bottom-center"
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
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img style={{ borderRadius: '50%' }} className="mx-auto h-20 w-20" src="/logo.svg" alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> SignIn</Link>
                    </p>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="mt-8 space-y-6" method="POST">
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className="mb-1">
                            <input onChange={(e) => handleChange(e)} value={name} id="name" name="name" type="text" required className="relative block w-full rounded-t-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter Name" />
                        </div>
                        <div style={{ marginBottom: '3px' }}>
                            <input onChange={(e) => handleChange(e)} value={email} id="email" name="email" type="email" required className="relative block w-full rounded-t-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address" />
                        </div>
                        <div style={{ marginBottom: '3px' }}>
                            <input onChange={(e) => handleChange(e)} value={password} id="password" name="password" type="password" required className="relative block w-full rounded-b-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
                        </div>
                    </div>


                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
