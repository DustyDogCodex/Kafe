'use client'
import { useParams } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from 'react'
import { CldImage } from "next-cloudinary"
import { Check, Close, Edit } from '@mui/icons-material'
import { Icon, IconButton } from "@mui/material"
import Loading from "@/app/components/Loading"

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

    //item info
    const [ selectedItem, setSelectedItem ] = useState<ItemProps>()
    const [ loading, setLoading ] = useState<boolean>(true)

    //edit info variables
    const [ editName, SetEditName ] = useState<boolean>(false)
    const [ editPrice, SetEditPrice ] = useState<boolean>(false)
    const [ editDesc, SetEditDesc ] = useState<boolean>(false)
    const [ editImage, SetEditImage ] = useState<boolean>(false)

    //get item info for display
    async function getItemInfo() {
        axios.get(`http://localhost:3000/api/items/${itemID}`)
        .then(res => { 
            setSelectedItem(res.data.itemInfo)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getItemInfo()
    }, [])

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
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
                                    <div className={`${editName ? 'flex' : 'hidden'} items-center`}>
                                        <input 
                                            type="text" 
                                            value={selectedItem?.name}
                                            className="border border-sky-400 p-2 rounded-xl"
                                        />

                                        <IconButton 
                                            className="flex items-center justify-center cursor-pointer"
                                            style={{ color: 'green' }}
                                            onClick={() => SetEditName(!editName)}
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
                                        <input 
                                            type="text" 
                                            value={selectedItem?.price}
                                            className="border border-sky-400 p-2 rounded-xl"
                                        />

                                        <IconButton 
                                            className="flex items-center justify-center cursor-pointer"
                                            style={{ color: 'green' }}
                                            onClick={() => SetEditPrice(!editPrice)}
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
                                        <input 
                                            type="text" 
                                            value={selectedItem?.description}
                                            className="border border-sky-400 p-2 rounded-xl"
                                        />

                                        <IconButton 
                                            className="flex items-center justify-center cursor-pointer"
                                            style={{ color: 'green' }}
                                            onClick={() => SetEditDesc(!editDesc)}
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
                                </div>
                            </div>

                            {/* item image */}
                            <div className="flex items-center justify-between gap-5 w-full  my-3">
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
                                        <input 
                                            type="text" 
                                            value={selectedItem?.price}
                                            className="border border-sky-400 p-2 rounded-xl"
                                        />

                                        <IconButton 
                                            className="flex items-center justify-center cursor-pointer"
                                            style={{ color: 'green' }}
                                            onClick={() => SetEditPrice(!editPrice)}
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
                                </div>
                            </div>
                        </div>

                        {/* delete or archive item from inventory */}
                        <div className="my-5 flex items-center gap-5 text-xl">
                            <button className="bg-sky-400 py-2 px-5 rounded-xl text-white">
                                Archive
                            </button>
                            <button className="bg-red-500 py-2 px-5 rounded-xl text-white">
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