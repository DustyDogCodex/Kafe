'use client'
import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import ServerErrorMessage from "../components/ServerErrorMessage"
import { CldImage } from 'next-cloudinary'
import Link from "next/link"

function AdminPage() {
    //react hook form setup
    const { register, handleSubmit, formState: { errors } } = useForm()

    //imageID state variable for using public_id created by cloudinary after image upload
    const [ imageID, setImageID ] = useState<string>('')
    
    async function submitItemInfo(data: object) {
        axios.post('http://localhost:3000/api/items',
            { data, imageID }
        )
        .then(res => console.log(res))
        .catch(err => <ServerErrorMessage message={err.message} />)
    }

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
            <div className="container pt-20 font-fauna">
                <h1>View Store</h1>
                <Link href={'/admin/addItem'}>
                    Add a new item
                </Link>
            </div>
        </div>
    )
}

export default AdminPage