import Stripe from "stripe"
import { stripe } from "@/utils/stripe"
import { connectMongo } from "@/utils/mongodb"
import { headers } from 'next/headers'
import { NextResponse } from "next/server"
import { env } from 'node:process'
import Order from "@/models/orderModel"

connectMongo()

export async function POST(req: Request){
    //req.text() instead of req.json() as this is a special case for webhook
    const body = await req.text()
    const signature = headers().get("Stripe-Signatire") as string

    let event: Stripe.Event

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            env.WEBHOOK_SECRET!
        )
    } catch(error: any) {
        return NextResponse.json({ status: 400, message: `Stripe WebHook Error: ${error.message}` })
    }

    //retrieving stripe checkout session
    const session = event.data.object as Stripe.Checkout.Session

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object
            // Then define and call a function to handle the event payment_intent.succeeded
            // if payment succeeded, update order isPaid property in database
            const order = await Order.findByIdAndUpdate(
                { _id: session?.metadata?.orderID},
                {
                    isPaid: true
                }
            )
            break
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return new NextResponse(null, { status: 500 })
}