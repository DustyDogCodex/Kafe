'use client'
import axios from "axios"
import ServerErrorMessage from "../components/ServerErrorMessage"
import { CldImage } from 'next-cloudinary'
import Link from "next/link"
import { useEffect, useState } from "react"
import ItemCard from "../components/ItemCard"

//prop types for item objects retrieved from server
type ItemProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category: string[]
}

function AdminPage() {
    //state variable containing all items in store
    const [ storeItems, setStoreItems ] = useState<ItemProps[]>([])
    
    /* api call to retrieve all current items in store for display */
    async function getItems() {
        axios.get('http://localhost:3000/api/items')
        .then(res => setStoreItems(res.data.store))
        .catch(err => { 
            if(err){
                return <ServerErrorMessage message={err.message} />
            }
        })
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
            <div className="container pt-20 font-fauna">
                <h1 className="mb-5">Current Store</h1>

                {/* displaying current items in store */}
                <div>
                    {storeItems.map((item, index) => 
                        <div 
                            key={index}
                            id={item.id} 
                            className=""
                        >
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <CldImage
                                width="300"
                                height="400"
                                src={item.image}
                                sizes="100vw"
                                alt={`image for ${item.name}`}
                                className="rounded-xl hover:shadow-xl hover:shadow-orange-400 transition duration-300"
                            />
                        </div>
                    )}
                </div>

                {/* link to page for adding items */}
                <div className="mt-5">
                    <Link 
                        href={'/admin/addItem'}
                        className="bg-orange-500 text-white px-5 py-2 rounded-xl w-fit"
                    >
                        Add a new item
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminPage