import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"
import { NextResponse } from "next/server"
import { NextApiRequest } from "next"

//connect to database
connectMongo()

/* ---------------GET ALL ITEMS---------------------------------------------------- */
export async function GET(req: any) {
    try {
        const { itemID } = req.query
        //grab all items in database
        const itemInfo = await Item.findById(itemID)
        console.log('api query', itemID)
        /* send allItems to client for display */
        return NextResponse.json(itemID)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}