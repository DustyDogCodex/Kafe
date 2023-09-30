import Stripe from "stripe"
import { stripe } from "@/utils/stripe"
import { connectMongo } from "@/utils/mongodb"
import { headers } from 'next/headers'
import { NextResponse } from "next/server"

connectMongo()

export async function POST(req: Request){
    //req.text() instead of req.json() as this is a special case for webhook
    const body = await req.text()
    const signature = headers().get("Stripe-Signatire") as string

    let event: Stripe.Event

    try{

    } catch(error: any) {
        return NextResponse.json({ status: 500, message: error.message })
    }
}