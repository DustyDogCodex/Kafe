'use client'
import { useAppDispatch } from '@/state/hooks'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { addToCart } from '@/state/cartSlice'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

type ItemProps =  { 
    item: {
        _id: string, 
        name: string, 
        image: string,  
        price: number
    }
}

function ItemCard({ item }: ItemProps) {
    /* REDUX - dispatch & cart open/close */
    const dispatch = useAppDispatch()

    //set count for number of items to be added to cart
    const [ count, setCount ] = useState<number>(1)
    const [ isHovering, setIsHovering ] = useState<boolean>(false)
    
    return (
        <div 
            className='relative cursor-pointer'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* item image */}
            <Link href={`/item/${item._id}`}>
                <CldImage
                    width="300"
                    height="400"
                    src={item.image}
                    sizes="100vw"
                    alt={`${item.name}`}
                />
            </Link>

            {/* small box with item count and option to add to cart */}
            <div className={`${isHovering ? 'block' : 'hidden'} absolute bottom-5 left-0 w-full px-5`}>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center bg-neutral-300 rounded-lg'>
                        <IconButton onClick={() => setCount(Math.max(count-1, 1))}>
                            <Remove />
                        </IconButton>
                        <span>{count}</span>
                        <IconButton onClick={() => setCount(count+1)}>
                            <Add />
                        </IconButton>
                    </div>

                    {/* add to cart button */}
                    <button 
                        onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                        className="bg-orange-500 text-white py-2 px-5 rounded-lg"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard