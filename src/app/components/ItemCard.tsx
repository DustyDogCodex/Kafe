'use client'
import { useAppDispatch } from '@/state/hooks'
import { useState } from 'react'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { addToCart } from '@/state/cartSlice'

type ItemProps =  { 
    item: {
        id: string, 
        name: string, 
        img: string, 
        count: number, 
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
            className='relative'
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* item image */}
            <Image 
                src={`http://localhost:3000/${item.img}`}
                alt={`${item.name}`}
                width={300}
                height={400}
                className='cursor-pointer'
            />

            {/* small box with item count and option to add to cart */}
            <div className={`${isHovering ? 'block' : 'hidden'} absolute bottom-5 left-0 w-full px-5`}>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center bg-neutral-400 rounded-lg'>
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