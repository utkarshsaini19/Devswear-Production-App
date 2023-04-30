import Link from "next/link"

const Stickers = () => {
    return (
        <div>
            <section className="text-gray-600 body-font mx-auto">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-wrap -m-4 mx-auto">

                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg cursor-pointer ">
                            <Link href={'/product/dev-tshirt'} className="block relative  rounded overflow-hidden">

                                <img alt="ecommerce" className="h-[30vh] md:h-[36vh] block m-auto" src="https://ih1.redbubble.net/image.841842603.0959/st,small,507x507-pad,600x600,f8f8f8.u2.jpg" />

                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                    <p className="mt-1">₹499</p>
                                </div>

                            </Link>
                        </div>




                    </div>
                </div>
            </section>
        </div>
    )
}

export default Stickers
