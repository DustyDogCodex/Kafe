'use client'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { useState } from 'react'
import Image from 'next/image'

type ItemProps =  { 
    id: string, 
    name: string, 
    img: string, 
    count: number, 
    price: number
}

function ItemCard({ id, name, img, price }: ItemProps) {
    /* REDUX - dispatch & cart open/close */
    const dispatch = useAppDispatch()
    const cart = useAppSelector((state) => state.cart.cart)

    //set count for number of items to be added to cart
    const [ count, setCount ] = useState<number>(1)

    return (
        <div>
            <Image 
                src={`http://localhost:3000/${img}`}
                alt={`${name}`}
                width={300}
                height={400}
            />
        </div>
    )
}

export default ItemCard