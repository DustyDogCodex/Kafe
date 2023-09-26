'use client'
import { useParams } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from 'react'
import { CldImage, CldUploadButton } from "next-cloudinary"
import { Check, Close, Edit } from '@mui/icons-material'
import { IconButton } from "@mui/material"
import Loading from "@/app/components/Loading"
import { useForm } from "react-hook-form"
import FormErrorMessage from "@/app/components/FormErrorMessage"
import ServerErrorMessage from "@/app/components/ServerErrorMessage"

type ItemProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category: string[]
}

function EditPage() {
    const itemID = useParams().itemID

    //react hook form for validating and submitting user info
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    //item info
    const [ selectedItem, setSelectedItem ] = useState<ItemProps>()
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<string>('')

    //toggle controls for input fields
    const [ editName, SetEditName ] = useState<boolean>(false)
    const [ editPrice, SetEditPrice ] = useState<boolean>(false)
    const [ editDesc, SetEditDesc ] = useState<boolean>(false)
    const [ editImage, SetEditImage ] = useState<boolean>(false)

    //imageID from cloudinary image upload
    const [ imageID, setImageID ] = useState<string>('')

    //get item info for display
    async function getItemInfo() {
        axios.get(`http://localhost:3000/api/items/${itemID}`)
        .then(res => { 
            setSelectedItem(res.data.itemInfo)
            setLoading(false)
        })
        .catch(err => setError(err.message))
    }

    //put request to update item info
    async function updateItemInfo(data: object) {
        axios.put(`http://localhost:3000/api/items/${itemID}`, { data, imageID })
        .then(res => {
            if(res) window.location.reload()
        })
        .catch(err => setError(err.message))
    }

    //delete request to delete item info
    async function deleteItemInfo() {
        axios.delete(`http://localhost:3000/api/items/${itemID}`)
        .then(res => {
            if(res) window.location.reload()
        })
        .catch(err => setError(err.message))
    }

    useEffect(() => {
        getItemInfo()
    }, [])

    //reset input fields with fetched values using react hook form
    useEffect(() => {
        reset(selectedItem)
    }, [ selectedItem ])

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
            {/* {error && <ServerErrorMessage message={error} />} */}
            <div className="container pt-20 font-fauna flex flex-col items-center justify-center">
                {loading
                    ?
                    <Loading />
                    :
                    <>
                        <h1 className="text-center text-3xl mt-5">
                            Item Information for {selectedItem?.name}
                        </h1>   

                        {/* section with item info and ability to update info */}
                        <div className="mt-10 flex flex-col items-center w-full md:w-3/5 p-2">
                            {/* item name */}
                            <div className="flex items-center justify-between gap-5 w-full my-3">
                                <p className="text-xl font-cinzel font-bold">Name</p>
                        
                                {/* contains edit icons and item info. When user clicks the edit button, it will change to an input element with info in that the user can edit */}
                                <div className="flex items-center">
                                    <div className={`${editName ? 'hidden' : 'flex'} items-center`}>
                                        <p>{selectedItem?.name}</p>
                                        {/* edit icon to display input for updating info */}
                                        <IconButton 
                                            className="flex items-center justify-center ml-2 cursor-pointer"
                                            style={{ color: 'orange' }}
                                            onClick={() => SetEditName(!editName)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </div>
                            
                                    {/* input for updating name. Only displayed after user clicks edit icon above  */}
                                    <div className={`${editName ? 'flex' : 'hidden'} flex-col items-center`}>
                                        <div className="flex items-center">
                                            <input 
                                                {...register('name', { required: true })}
                                                type="text" 
                                                className="border border-sky-400 p-2 rounded-xl"
                                            />

                                            <IconButton 
                                                className="flex items-center justify-center cursor-pointer"
                                                style={{ color: 'green' }}
                                                onClick={handleSubmit(updateItemInfo)}
                                            >
                                                <Check />
                                            </IconButton>
                                            <IconButton 
                                                className="flex items-center justify-center cursor-pointer"
                                                style={{ color: 'red' }}
                                                onClick={() => SetEditName(!editName)}
                                            >
                                                <Close />
                                            </IconButton>
                                        </div>
                                        {errors.name && (
                                            errors.name.type === 'required' && <FormErrorMessage message="Item name is required" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* item price */}
                            <div className="flex items-center justify-between gap-5 w-full my-3">
                                <p className="text-xl font-cinzel font-bold">Price</p>

                                <div className="flex items-center">
                                    <div className={`${editPrice ? 'hidden' : 'flex'} items-center`}>
                                        <p>{selectedItem?.price}</p>
                                        {/* edit icon to display input for updating info */}
                                        <IconButton 
                                            className="flex items-center justify-center ml-2 cursor-pointer"
                                            style={{ color: 'orange' }}
                                            onClick={() => SetEditPrice(!editPrice)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </div>
                            
                                    {/* input for updating price. Only displayed after user clicks edit icon above  */}
                                    <div className={`${editPrice ? 'flex' : 'hidden'}   items-center`}>
                                        <div className="flex items-center">
                                            <input 
                                                {...register('price', { required: true })}
                                                type="text" 
                                                className="border border-sky-400 p-2 rounded-xl"
                                            />

                                            <IconButton 
                                                className="flex items-center justify-center cursor-pointer"
                                                style={{ color: 'green' }}
                                                onClick={handleSubmit(updateItemInfo)}
                                            >
                                                <Check />
                                            </IconButton>
                                            <IconButton 
                                                className="flex items-center justify-center cursor-pointer"
                                                style={{ color: 'red' }}
                                                onClick={() => SetEditPrice(!editPrice)}
                                            >
                                                <Close />
                                            </IconButton>
                                        </div>
                                        {errors.price && (
                                            errors.price.type === 'required' && <FormErrorMessage message="Item price is required" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* item description */}
                            <div className="flex items-center justify-between gap-5 w-full my-3">
                                <p className="text-xl font-cinzel font-bold">Description</p>
                        
                                <div className="flex items-center">
                                    <div className={`${editDesc ? 'hidden' : 'flex'} items-center`}>
                                        <p>{selectedItem?.description}</p>
                                        {/* edit icon to display input for updating info */}
                                        <IconButton 
                                            className="flex items-center justify-center ml-2 cursor-pointer"
                                            style={{ color: 'orange' }}
                                            onClick={() => SetEditDesc(!editDesc)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </div>
                            
                                    {/* input for updating description. Only displayed after user clicks edit icon above  */}
                                    <div className={`${editDesc ? 'flex' : 'hidden'}   items-center`}>
                                        <div className="flex items-center">
                                            <textarea 
                                                {...register('description', { required: true })}
                                                rows={6}
                                                className="border border-sky-400 p-2 rounded-xl"
                                            />

                                            <IconButton 
                                                className="flex items-center justify-center cursor-pointer"
                                                style={{ color: 'green' }}
                                                onClick={handleSubmit(updateItemInfo)}
                                            >
                                                <Check />
                                            </IconButton>
                                            <IconButton 
                                                className="flex items-center justify-center cursor-pointer"
                                                style={{ color: 'red' }}
                                                onClick={() => SetEditDesc(!editDesc)}
                                            >
                                                <Close />
                                            </IconButton>
                                        </div>
                                        {errors.description && (
                                            errors.description.type === 'required' && <FormErrorMessage message="Item description is required" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* item image */}
                            {/* setting containing dive to h-[420px] to prevent div from resizing when user removes image to upload a new image */}
                            <div className="flex items-center justify-between gap-5 w-full h-[420px] my-3">
                                <p className="text-xl font-cinzel font-bold">Image</p>

                                <div className="flex items-center">
                                    <div className={`${editImage ? 'hidden' : 'flex'} items-center`}>
                                        {selectedItem?.image &&
                                            <CldImage
                                                width='300'
                                                height='400'
                                                src={selectedItem!.image}
                                                alt={selectedItem!.name}
                                                className="rounded-xl"
                                            />
                                        }
                                        {/* edit icon to display input for updating info */}
                                        <IconButton 
                                            className="flex items-center justify-center ml-2 cursor-pointer"
                                            style={{ color: 'orange' }}
                                            onClick={() => SetEditImage(!editImage)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </div>
                            
                                    {/* input for updating name. Only displayed after user clicks edit icon above  */}
                                    <div className={`${editImage ? 'flex' : 'hidden'}   items-center`}>
                                        {/* if user has not uploaded an image yet, the upload button is displayed. Once a new image has been uploaded, the CldImage component with the new image is displayed */}
                                        {!imageID && 
                                            <CldUploadButton 
                                                uploadPreset="dxrlpvpi"
                                                onUpload={(result: any) => {
                                                    setImageID(result.info.public_id)
                                                }}
                                                className="border border-sky-400 p-2 rounded-xl"
                                            />
                                        }
                                        {imageID && 
                                            <CldImage 
                                                width='300'
                                                height='400'
                                                src={imageID}
                                                alt="new uploaded image"
                                                className="rounded-xl"
                                            />
                                        }

                                        <IconButton 
                                            className="flex items-center justify-center cursor-pointer"
                                            style={{ color: 'green' }}
                                            onClick={handleSubmit(updateItemInfo)}
                                        >
                                            <Check />
                                        </IconButton>
                                        <IconButton 
                                            className="flex items-center justify-center cursor-pointer"
                                            style={{ color: 'red' }}
                                            onClick={() => { 
                                                setImageID('')
                                                SetEditImage(!editImage)
                                            }}
                                        >
                                            <Close />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* delete or archive item from inventory */}
                        <div className="my-5 flex items-center gap-5 text-xl">
                            <button className="bg-sky-400 py-2 px-5 rounded-xl text-white">
                                Archive
                            </button>
                            <button 
                                className="bg-red-500 py-2 px-5 rounded-xl text-white"
                                onClick={deleteItemInfo}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default EditPage