import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "@/src/layouts/FullLayout";
import theme from "@/src/theme/theme";
import { Grid } from "@mui/material";
import ProductPerfomance from '@/src/components/dashboard/ProductPerfomance';
import Link from "next/link"
import Product from '@/models/Product';
import mongoose from 'mongoose';

const Allproducts = ({products}) => {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
        footer {
          display : none;
        }
      `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <ProductPerfomance products={products} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
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
    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}

export default Allproducts