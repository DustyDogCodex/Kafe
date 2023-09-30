import Stripe from "stripe"
import { stripe } from "@/utils/stripe"
import { NextResponse } from "next/server"
import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"
import Order from "@/models/orderModel"

//connect to database
connectMongo()

//cors Headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request){
    const reqBody = await req.json()

    //getting extracting data from reqBody
    const { firstName, lastName, email, line1, line2, city, state, zipcode } = reqBody.data
    const { products } = reqBody
    console.log('products',products)
    try {
        //retrieve item information
        const lineItems = await Promise.all(
            products.map(async(product: { _id: string, count: number }) => {
                const item = await Item.findById(product._id)
                console.log('item',item)
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

        console.log('line items', lineItems)

        //create order in database
        const newOrder = new Order({
            userName: firstName.trim() + " " + lastName.trim(),
            email,
            address: [ line1,line2,city,state,zipcode ].join(','),
            orderItems: products.map((product: { _id: string, count: number }) =>  
                ({ 
                    productID: product._id, 
                    quantity: product.count 
                })
            ),
            isPaid: false,
        })

        console.log('new order', newOrder)

        /* create stripe session */
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/shop?success=1',
            cancel_url: 'http://localhost:3000/shop?canceled=1',
            metadata: {
                orderID: newOrder._id
            }
        })

        return NextResponse.json({ url: session.url }, { headers: corsHeaders })
    } catch(error: any) {
        return NextResponse.json({ status: 500, message: error.message })
    }
}