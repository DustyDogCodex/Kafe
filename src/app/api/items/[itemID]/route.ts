import { connectMongo } from "@/utils/mongodb"
import Item from "@/models/itemModel"
import { NextResponse } from "next/server"

//connect to database
connectMongo()

/* ---------------GET ITEM INFO FROM ITEMID ----------------------------------- */
export async function GET(req: Request) {
    try {
        /* grab itemID from req url */
        const itemID = req.url.slice(req.url.lastIndexOf('/') + 1)
        
        //find selected item in database
        const itemInfo = await Item.findById(itemID)
        
        /* send itemInfo to client */
        return NextResponse.json({ itemInfo })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

/* ---------------UPDATE ITEM INFO FROM ITEMID ----------------------------------- */
export async function PUT(req: Request) {
    try {
        /* grab itemID from req url */
        const itemID = req.url.slice(req.url.lastIndexOf('/') + 1)
        
        const reqBody = await req.json()

        //extract info from data object
        const { name, price, description } = reqBody.data
        const { imageID } = reqBody 
        
        //find relevant item in database
        //selecting it this way to be able to access image property for this object
        const selectedItem = await Item.findById(itemID)

        //update selected item in database
        await selectedItem.updateOne(
            {
                name,
                price,
                description,
                image: imageID ? imageID : selectedItem.image
            }
        )
        
        /* send itemInfo to client */
        return NextResponse.json({ status: 200, message: 'Item updated!' })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}