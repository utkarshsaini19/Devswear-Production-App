// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/middleware/mongoose"
import Product from "@/models/Product"


const handler = async (req, res) => {
    let products = await Product.find({});
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

            if (item.availableQty > 0) {
                data[item.title] = JSON.parse(JSON.stringify(item));
                data[item.title].size = [item.size]
                data[item.title].color = [item.color]
            }
        }
    }

    res.status(200).json(data)
}


export default connectDB(handler)

