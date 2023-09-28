'use client'
import { useAppSelector } from '@/state/hooks'
import { TextField, Checkbox } from "@mui/material"
import { useState } from 'react'
import { CldImage } from 'next-cloudinary'

function page() {
    const [ checked, setChecked ] = useState<boolean>(true)

    //access items in cart
    const cart = useAppSelector((state) => state.cart.cart)

    //cart total price calculation
    const totalPrice = cart.reduce((sum: number, item: { count: number, price: number }) => {
        return sum + (item.count * item.price)
    }, 0)

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="container pt-20 font-fauna flex items-start justify-center gap-10">
                {/* address & shipping information */}
                <div className="mt-10 w-1/2">
                    {/* user info and address */}
                    <form className="">
                        {/* first and last name */}
                        <h1 className="text-3xl font-cinzel">Shipping Address</h1>
                        <div className="flex items-center gap-5">
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                className="my-2 rounded-xl"
                            />
                            <TextField 
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                className="my-2 rounded-xl"
                            />
                        </div>
                        
                        {/* shipping address */}
                        <div>
                            <TextField 
                                fullWidth
                                variant="outlined"
                                label="Line 1"
                                className="my-2 rounded-xl"
                            />
                            <TextField 
                                fullWidth
                                variant="outlined"
                                label="Line 2"
                                className="my-2 rounded-xl"
                            />
                            <div className="flex items-center gap-5">
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    label="City"
                                    className="my-2 rounded-xl"
                                />
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    label="State"
                                    className="my-2 rounded-xl"
                                />
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    label="Zip Code"
                                    className="my-2 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Payment information */}
                        <h1 className="text-3xl font-cinzel mt-5">Credit Card Information</h1>
                        <div className="flex items-center gap-5">
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                className="my-2 rounded-xl"
                            />
                            <TextField 
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                className="my-2 rounded-xl"
                            />
                        </div>
                        <div>
                           <TextField 
                                fullWidth
                                variant="outlined"
                                label="Card Number"
                                className="my-2 rounded-xl"
                            />
                            <div className="flex items-center gap-5 w-full">
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Expiration Date"
                                    className="my-2 rounded-xl"
                                />
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    label="CVV Code"
                                    className="my-2 rounded-xl"
                                />
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    label="ZIP Code"
                                    className="my-2 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* checkbox for setting shipping address === billing address */}
                        <div className="flex items-center">
                            <Checkbox 
                                defaultChecked
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                            />
                            <span>Billing address is same as shipping address</span>
                        </div>

                        {/* display billing address section if user unchecks checkbox */}
                        {!checked && (
                            /* billing address */
                            <div>
                                <h1 className="text-xl font-cinzel">Billing Address</h1>
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    label="Line 1"
                                    className="my-2 rounded-xl"
                                />
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    label="Line 2"
                                    className="my-2 rounded-xl"
                                />
                                <div className="flex items-center gap-5">
                                    <TextField 
                                        fullWidth
                                        variant="outlined"
                                        label="City"
                                        className="my-2 rounded-xl"
                                    />
                                    <TextField 
                                        fullWidth
                                        variant="outlined"
                                        label="State"
                                        className="my-2 rounded-xl"
                                    />
                                    <TextField 
                                        fullWidth
                                        variant="outlined"
                                        label="Zip Code"
                                        className="my-2 rounded-xl"
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* simple cart summary? */}
                <div className="mt-10 w-1/2">
                    <h1 className="text-3xl font-cinzel">Cart Summary</h1>
                    
                    {/* current items in cart */}
                    <div className='bg-neutral-100 p-2 rounded-xl'>
                        {cart.map((item) => (
                            <div 
                                key={item.id}
                                className='flex items-center justify-between w-full pb-3 border-b border-b-neutral-300'
                            >
                                {/* item image */}
                                <div className='flex w-2/5'>
                                    <CldImage
                                        width="150"
                                        height="200"
                                        src={item.image}
                                        sizes="100vw"
                                        alt={`${item.name}`}
                                    />
                                </div>

                                {/* item info */}
                                <div className='flex items-center justify-between w-3/5'>
                                    <p className='font-bold'>
                                        <span>{item.count}x</span> {item.name}
                                    </p>
                            
                                    {/* item price */}
                                    <span className='font-bold'>
                                        ${item.price * item.count}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* cart total */}
                        <div className='w-full flex items-center justify-between text-lg font-semibold mt-5'>
                            <p>TOTAL:</p>
                            <p>${totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page