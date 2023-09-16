import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"
import { NextResponse } from "next/server"

//connect to database
connectMongo()

export async function POST(request: Request) {
    try {
        /* wait for req body to be received */
        const reqBody = await request.json()

        //extracting item info from reqBody
        const { name, price, description, image, category } = reqBody

        const newItem = new Item({
            name,
            price,
            description,
            image,
            category
        })

        //save to database
        await newItem.save()

        return NextResponse.json({ status: 200, message: 'Item successfully created', success: true })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}