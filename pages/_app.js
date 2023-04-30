import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [cart, setCart] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  const [user, setUser] = useState({ value: null, email: null })
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('email')
      if (token) {
        setUser({ value: token, email: email })
      }
    } catch (error) {
      console.error(error)
      localStorage.removeItem('cart')
    }
  }, [router.query])




  const buyNow = (itemCode, qty, name, price, size, color) => {
    saveCart({})
    let newCart = {};
    newCart[itemCode] = { qty, name, price, size, color }
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0;
    const keys = Object.keys(myCart);

    for (let i = 0; i < keys.length; i++) {
      subt = subt + myCart[keys[i]].qty * myCart[keys[i]].price;
    }
    setSubtotal(subt)
  }

  const addToCart = (itemCode, qty, name, price, size, color) => {
    let mycart = cart;
    if (itemCode in mycart) {
      mycart[itemCode].qty = mycart[itemCode].qty + qty;
    }
    else {
      mycart[itemCode] = { qty, name, price, size, color }
    }
    setCart(mycart)
    saveCart(mycart)

  }
  const removeFromCart = (itemCode, qty, name, price, size, color) => {
    let mycart = cart;
    mycart[itemCode].qty = mycart[itemCode].qty - qty;
    if (mycart[itemCode].qty <= 0) {
      delete mycart[itemCode]
    }
    setCart(mycart)
    saveCart(mycart)

  }

  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser({ value: null })
    router.push('/')
  }

  return <>
    <LoadingBar
      color='black'
      height={3}
      progress={progress}
      waitingTime={100}
      onLoaderFinished={() => setProgress(0)}
    />
    <Navbar user={user} logout={logout} buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
    <Component user={user} buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
    <Footer />
  </>
}
