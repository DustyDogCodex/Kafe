'use client'
import NavBar from "../../components/Navbar"
import CartModal from "../../components/CartModal"
import Footer from "../../components/Footer"
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { useState } from "react"
import { useParams } from 'next/navigation'
import Image from "next/image"
import { IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material"
import { addToCart } from '@/state/cartSlice'

function page() {
    /* REDUX - dispatch & cart open/close */
    const dispatch = useAppDispatch()

    //useParams for grabbing item id
    const params = useParams()

    //local state variables
    const [ count, setCount ] = useState<number>(1)
    const [ item, setItem ] = useState<object>({})

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container pt-20">
                {/* item info */}
                <div className="flex gap-10">
                    {/* item image */}
                    <Image 
                        src={'/coffee-ai-generated.jpg'}
                        alt="coffee image"
                        height={800}
                        width={600}
                    />

                    {/* item details */}
                    <div className="pt-20">
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
            <CartModal />
            <Footer />
        </div>
    )
}

export default page