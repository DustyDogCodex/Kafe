'use client'
import { useParams } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from 'react'
import { CldImage } from "next-cloudinary"

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
                <h1 className="text-center text-3xl mt-5">
                    Item Information for {selectedItem?.name}
                </h1>   

                {/* section with item info and ability to update info */}
                <div className="mt-10 flex flex-col items-center w-full md:w-3/5 p-2">
                    {/* item name */}
                    <div className="flex items-center justify-between gap-5 w-full my-3">
                        <p className="text-xl font-cinzel font-bold">Name</p>
                        <p>{selectedItem?.name}</p>
                    </div>

                    {/* item price */}
                    <div className="flex items-center justify-between gap-5 w-full my-3">
                        <p className="text-xl font-cinzel font-bold">Price</p>
                        <p>{selectedItem?.price}</p>
                    </div>

                    {/* item description */}
                    <div className="flex items-center justify-between gap-5 w-full my-3">
                        <p className="text-xl font-cinzel font-bold">Description</p>
                        <p>{selectedItem?.description}</p>
                    </div>

                    {/* item image */}
                    <div className="flex items-center justify-between gap-5 w-full my-3">
                        <p className="text-xl font-cinzel font-bold">Image</p>
                        <CldImage
                            width='300'
                            height='400'
                            src={selectedItem!.image}
                            alt={selectedItem!.name}
                            className="rounded-xl"
                        />
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
            </div>
        </div>
    )
}

export default EditPage