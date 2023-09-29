import Stripe from "stripe"
import { stripe } from "@/utils/stripe"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    const reqBody = await req.json()

    //getting productIDs from req
    const { userName, email, products } = reqBody
    
}