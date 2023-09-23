import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"
import { NextResponse } from "next/server"

//connect to database
connectMongo()

/* ---------------GET ALL ITEMS---------------------------------------------------- */
export async function GET() {
    try {
        //grab all items in database
        const allItems = await Item.find()

        /* send allItems to client for display */
        return NextResponse.json({ status: 200, items: allItems })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

/* ---------------CREATE NEW ITEM------------------------------------------------------- */
export async function POST(request: Request) {
    try {
        /* wait for req body to be received */
        const reqBody = await request.json()

        //extracting item info from reqBody
        const { name, price, description, category } = reqBody.data
        const { imageID } = reqBody
        
        const newItem = new Item({
            name,
            price,
            description,
            image: imageID,
            category: category ? category : []
        })

        //save to database
        await newItem.save()

        return NextResponse.json({ status: 200, message: 'Item successfully created', success: true })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

/* ---------------DELETE AN ITEM---------------------------------------------------- */
export async function DELETE(req: Request) {
    try {
        /* wait for req body to be received */
        const reqBody = await req.json()

        //extracting item info from reqBody
        const { id } = reqBody

        //delete any associated images?????

        //find and delete relevant item
        await Item.findByIdAndDelete(id)

        return NextResponse.json({ status: 200, message: 'Item deleted!' })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}