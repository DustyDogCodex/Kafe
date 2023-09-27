import Stripe from "stripe"
import { stripe } from "@/utils/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    const reqBody = await req.json()

    //getting productIDs from req
    const { productIDs } = reqBody
    
    if(!productIDs || productIDs.length === 0){
        return new NextResponse("Product ID's are missing", { status: 400 })
    }
}