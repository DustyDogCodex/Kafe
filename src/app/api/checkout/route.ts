import Stripe from "stripe"
import { NextResponse } from "next/server"
import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"
import Order from "@/models/orderModel"

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

        /* create stripe session */
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/checkout/success',
            cancel_url: 'http://localhost:3000/checkout/canceled',
        })

        //create order in database?
        const newOrder = new Order({
            userName: firstName.trim() + " " + lastName.trim(),
            email,
            address: [ line1,line2,city,state,zipcode ].join(','),
            orderItems: lineItems,
            isPaid: false,
        })

        NextResponse.redirect(session.url)
    } catch(error: any) {
        NextResponse.json({ status: 500, message: error.message })
    }
}