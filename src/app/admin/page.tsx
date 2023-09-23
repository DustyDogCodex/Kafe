'use client'
import axios from "axios"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import FormErrorMessage from "../components/FormErrorMessage"
import ServerErrorMessage from "../components/ServerErrorMessage"
import { CldUploadButton } from 'next-cloudinary'
import { CldImage } from 'next-cloudinary'

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
                <h1 className="text-2xl text-center font-cinzel">Add new item</h1>
                {/* form for adding a new item to collection */}
                <form className="flex flex-col" onSubmit={handleSubmit(submitItemInfo)}>
                    <input 
                        {...register('name', { required: true })}
                        type="text" 
                        placeholder="Item name"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    {errors.name && (
                        errors.name.type === 'required' && <FormErrorMessage message="Item name is required" />
                    )}

                    <input 
                        {...register('price', { required: true })}
                        type="number" 
                        placeholder="Item price"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    {errors.price && (
                        errors.price.type === 'required' && <FormErrorMessage message="Item price is required" />
                    )}

                    <textarea
                        {...register('description', { required: true })}
                        placeholder="Item description"
                        rows={6}
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />
                    {errors.description && (
                        errors.description.type === 'required' && <FormErrorMessage message="Item description is required" />
                    )}

                    {/* cloudinary image upload */}
                    <label htmlFor="image">Item Image:</label>
                    <CldUploadButton 
                        uploadPreset="dxrlpvpi"
                        className="border w-fit py-2 px-5 my-3 rounded-xl"
                        onUpload={(result: any) => {
                            setImageID(result.info.public_id)
                        }}
                    />
                    {/* uploaded image preview */}
                    {imageID && (
                        <CldImage
                            width="400"
                            height="600"
                            src={imageID}
                            sizes="100vw"
                            alt="uploaded image preview"
                        />
                    )}

                    <input 
                        type="text" 
                        placeholder="Add category"
                        className="p-2 border border-sky-300 rounded-lg my-3"
                    />

                    {/* submit button */}
                    <div className="flex items-center justify-center">
                        <button 
                            type="submit"
                            className="bg-orange-500 text-white px-5 py-2 rounded-xl w-fit"
                        >
                            Create new item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminPage