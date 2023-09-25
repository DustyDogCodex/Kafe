import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"
import { NextResponse } from "next/server"

//connect to database
connectMongo()

/* ---------------GET ALL ITEMS---------------------------------------------------- */
export async function GET(req: Request) {
    try {
        /* grab itemID from req url */
        const itemID = req.url.slice(req.url.lastIndexOf('/') + 1)
        
        //find selected item in database
        const itemInfo = await Item.findById(itemID)
        
        /* send itemInfo to client */
        return NextResponse.json({itemInfo})
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}