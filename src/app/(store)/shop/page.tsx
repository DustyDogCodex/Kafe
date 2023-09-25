'use client'
import { Tabs, Tab } from "@mui/material"
import ShopCarousel from "../../components/ShopCarousel"
import ItemCard from "../../components/ItemCard"
import Subscribe from "../../components/Subscribe"
import { useState, useEffect } from 'react'
import axios from "axios"
import ServerErrorMessage from "../../components/ServerErrorMessage"
import { CldImage } from 'next-cloudinary'
import Loading from "@/app/components/Loading"

//prop types for item objects retrieved from server
type ItemProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category: string[]
}

function Shop() {
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
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="container pt-20">
                <ShopCarousel />
                <div className="flex flex-col items-center w-full">
                    <h1 className="text-2xl mt-5">Our Current Selection</h1>

                    {/* tabs for filtering products */}
                    <Tabs>
                        <Tab label='ALL' value='all' />
                        <Tab label='BEST SELLERS' value='bestSellers' />
                        <Tab label='TOP RATED' value='topRated' />
                    </Tabs>

                    {/* loading screen while fetching data */}
                    {loading
                        ?
                            <Loading />
                        :
                        /* displaying current items in store */
                        <div>
                            {storeItems.map((item, index) => 
                                <ItemCard 
                                    key={index}
                                    item={item}
                                />
                            )}
                        </div>
                    }
                </div>
                <Subscribe />
            </div>
        </div>
    )
}

export default Shop