import { connectMongo } from "@/utils/mongodb"
import Admin from "@/models/adminModel"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

//connect to database
connectMongo()

export async function POST(req: Request){
    const reqBody = await req.json()
    
    //extract user info from req
    const { username, password } = reqBody.data
    
    try {
        const user = await Admin.findOne({ username })
        
        //check if username already exists
        if(user){
            return NextResponse.json({ status: 400, message: 'duplicate' })
        } else {
            //if valid username, create new account in database
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(password, salt)

            const newAdmin = new Admin({
                username,
                password: hashedPassword
            })

            //save new admin to database
            await newAdmin.save()

            return NextResponse.json({ status: 200, message: 'success' })
        }
    } catch(err: any) {
        return NextResponse.json({ status: 500, message: err.message })
    }
}