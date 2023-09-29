import Stripe from "stripe"
import { NextResponse } from "next/server"
import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"

//connect to database
connectMongo()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(req: Request){
    const reqBody = await req.json()

    //getting extracting data from reqBody
    const { firstName, lastName, email, line1, line2, city, state, zipcode } = reqBody.data
    const { products } = reqBody
    
    try {
        //retrieve item information
        const lineItems = await Promise.all(
            products.map(async(product: { id: string, count: number }) => {
                const item = await Item.findById(product.id)

                /* returning information in the format specified in stripe docs */
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: product.count
                }
            })
        )
    } catch(err) {
        NextResponse.json({ status: 500, message: "Oops our servers made a boo boo!" })
    }
}