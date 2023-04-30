import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>DevsWear.com - Closet for Developers</title>
        <meta name="description" content="DevsWear.com - Fashion Hub for Developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{display:'flex',justifyContent:'center'}}>
        <img style={{width: '90vw',height: '60vh'}} src="/home.jpeg" alt="" />
      </div>
      
    </>
  )
}
