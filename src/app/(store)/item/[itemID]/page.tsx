'use client'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import { IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material"
import { addToCart } from '@/state/cartSlice'
import axios from "axios"
import ServerErrorMessage from "../../../components/ServerErrorMessage"
import Loading from '@/app/components/Loading'

//prop types for item objects retrieved from server
type ItemProps = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category: string[]
}

function page() {
    /* REDUX - dispatch & cart open/close */
    const dispatch = useAppDispatch()

    //useParams for grabbing item id
    const itemID = useParams().itemID
    
    //local state variables
    const [ count, setCount ] = useState<number>(1)
    const [ item, setItem ] = useState<ItemProps>()

    //loading animation controller
    const [ loading, setLoading ] = useState<boolean>(true)

    //server error message
    const [ error, setError ] = useState<string>('')
    
    /* api call to retrieve all current items in store for display */
    async function getItemInfo() {
        axios.get(`http://localhost:3000/api/items/${itemID}`)
        .then(res => { 
            console.log(res)
            setLoading(false)
        })
        .catch(err => { 
            setError(err.message)
        })
    }

    //display error message if server responds with error
    /* if(error){
        return <ServerErrorMessage message={error} />
    } */

    useEffect(() => {
        getItemInfo()
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">

            <div className="container pt-20">
                {/* item info */}
                <div className="flex gap-10">
                    {loading
                        ?
                            <Loading />
                        : 
                        /* item image */
                        <CldImage
                            width="300"
                            height="400"
                            src={item!.image}
                            sizes="100vw"
                            alt={`image for ${item!.name}`}
                            className="rounded-t-xl"
                        />
                    }

                    {/* item details */}
                    <div className="pt-20">
                        <h1>Item id is {itemID}</h1>
                        <h1 className="text-2xl font-semibold mb-5">Item Name</h1>
                        <span>$20</span>
                        <p className="mt-10 text-wrap">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam fugit harum quod mollitia, laborum nobis, porro id ad dolores distinctio ratione velit obcaecati, incidunt dolore magni dolorem quibusdam deserunt quaerat.
                        </p>

                        {/* add to cart & increase/decrease count */}
                        <div className="flex mt-3">
                            <div className='flex items-center bg-neutral-400 rounded-lg mr-3'>
                                <IconButton onClick={() => setCount(Math.max(count-1, 1))}>
                                    <Remove />
                                </IconButton>
                                <span>{count}</span>
                                <IconButton onClick={() => setCount(count+1)}>
                                    <Add />
                                </IconButton>
                            </div>

                            <button 
                                className="bg-orange-500 text-white py-2 px-5 rounded-lg"
                                onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* description and reviews section */}
                <div>
                    description and review tabs
                </div>

                {/* related products section */}
                <div>
                    related products
                </div>
            </div>
        </div>
    )
}

export default page