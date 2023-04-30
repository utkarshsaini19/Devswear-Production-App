import Link from "next/link"
import Product from "@/models/Product"
import mongoose from 'mongoose';

const Tshirts = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font mx-auto">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-wrap -m-4 mx-auto">
                        {
                            Object.keys(products).map((item) => {
                                return <div key={products[item]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg cursor-pointer ">
            
                                    <Link href={`/product/${products[item].slug}`} className="block relative  rounded overflow-hidden">

                                        <img alt="ecommerce" className="h-[30vh] md:h-[36vh] block m-auto" src={products[item].img} />

                                        <div className="mt-4 text-center">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{item}</h2>
                                            <p className="mt-1">₹{products[item].price}</p>
                                            <div className="mt-1">
                                                {products[item].size.includes('S') && <span className="border mx-0.5 border-black px-1">S</span>}
                                                {products[item].size.includes('M') && <span className="border mx-0.5 border-black px-1">M</span>}
                                                {products[item].size.includes('L') && <span className="border mx-0.5 border-black px-1">L</span>}
                                                {products[item].size.includes('XL') && <span className="border mx-0.5 border-black px-1">XL</span>}
                                                {products[item].size.includes('XXL') && <span className="border mx-0.5 border-black px-1">XXL</span>}
                                            </div>
                                            <div className="mt-1">
                                            {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                
                                            </div>
                                        </div>

                                    </Link>
                                </div>
                            })
                        }





                    </div>
                </div>
            </section>
        </div>
    )
}


export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }

    let products = await Product.find({category:'tshirts'});
    let data = {};
    for (let item of products) {
        if (item.title in data) {
            if (item.availableQty > 0 && !data[item.title].size.includes(item.size)) {

                data[item.title].size.push(item.size)
            }
            if (item.availableQty > 0 && !data[item.title].color.includes(item.color)) {

                data[item.title].color.push(item.color)
            }

        }
        else {

            data[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                data[item.title].size = [item.size]
                data[item.title].color = [item.color]
            }
            else{
                data[item.title].size = []
                data[item.title].color = []
            }
        }
    }


    return {
        props: { products: JSON.parse(JSON.stringify(data)) }, // will be passed to the page component as props
    }
}

export default Tshirts
