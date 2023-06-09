import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const router = useRouter()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token:localStorage.getItem('token')}),
      });
      const orders=await res.json();
      setData(orders)
    }
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
    else {
      fetchData();
    }
  }, [])

  return (
    <div>
      <div className="container mx-auto">
        <h1 className='font-bold text-xl py-5'>My Orders</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">#Order Id</th>
                      <th scope="col" className="px-6 py-4">Email</th>
                      <th scope="col" className="px-6 py-4">Amount</th>
                      <th scope="col" className="px-6 py-4">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    data.length!=0 && data.map((item)=>{
                      return <tr key={item._id} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                      <td className="font-semibold text-black whitespace-nowrap px-6 py-4"><Link href={`${process.env.NEXT_PUBLIC_HOST}/order?id=${item._id}`}>Details</Link></td>
                    </tr>
                    })
                  }
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Orders