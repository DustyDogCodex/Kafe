'use client'
import axios from "axios"
import ServerErrorMessage from "../components/ServerErrorMessage"
import { CldImage } from 'next-cloudinary'
import Link from "next/link"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"

//prop types for item objects retrieved from server
type ItemProps = {
    _id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category: string[]
}

function AdminPage() {
    //state variable containing all items in store
    const [ storeItems, setStoreItems ] = useState<ItemProps[]>([])

    //loading animation controller
    const [ loading, setLoading ] = useState<boolean>(true)

    //server error message
    const [ error, setError ] = useState<string>('')
    
    /* api call to retrieve all current items in store for display */
    async function getItems() {
        axios.get('http://localhost:3000/api/items')
        .then(res => { 
            setStoreItems(res.data.store)
            setLoading(false)
        })
        .catch(err => { 
            setError(err.message)
        })
    }

    //display error message if server responds with error
    if(error){
        return <ServerErrorMessage message={error} />
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
            <div className="container pt-20 font-fauna">
                <h1 className="mb-5">Current Store</h1>

                {/* display loading screen while data is being fetched from server */}
                {loading
                    ?
                        <Loading />
                    :
                    /* displaying current items in store */
                    <div>
                        {storeItems.map((item, index) => 
                            <Link 
                                key={index}
                                href={`/admin/edit/${item._id}`} 
                                className="w-fit flex flex-col items-center bg-slate-200 rounded-xl hover:shadow-xl hover:shadow-orange-400 transition duration-300"
                            >
                                <CldImage
                                    width="300"
                                    height="400"
                                    src={item.image}
                                    sizes="100vw"
                                    alt={`image for ${item.name}`}
                                    className="rounded-t-xl"
                                />
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                            </Link>
                        )}
                    </div>
                }

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