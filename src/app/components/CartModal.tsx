'use client'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { increaseCount, decreaseCount, removeFromCart, setIsCartOpen } from '@/state/cartSlice'
import { IconButton } from '@mui/material'
import { Close, Delete, Remove, Add } from '@mui/icons-material'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

function CartModal() {
    /* REDUX - dispatch & cart open/close */
    const dispatch = useAppDispatch()
    const cart = useAppSelector((state) => state.cart.cart)
    const isCartOpen = useAppSelector((state) => state.cart.isCartOpen)

    //cart total price calculation
    const totalPrice = cart.reduce((sum: number, item: { count: number, price: number }) => {
        return sum + (item.count * item.price)
    }, 0)

    /* this component is basically a dark overlay on top of the current page with a cart modal on the right hand side of the screen. */
    return (
        /* dark overlay over rest of screen when cart is opened */
        <div className={`${isCartOpen ? 'block' : 'hidden'} bg-slate-800/50 fixed z-40 w-full h-full left-0 top-0 overflow-auto font-fauna`}>
            {/* actual cart modal */}
            <div className='fixed right-0 bottom-0 w-[400px] md:w-[25%] h-full bg-white'>
                <div className='p-8 overflow-auto h-full'>
                    {/* header & close cart button */}
                    <div className='flex justify-between items-center mb-5'>
                        <h3 className='text-xl font-cinzel'>
                            COFFEE CART {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                        </h3>
                        <IconButton onClick={() => dispatch(setIsCartOpen())}>
                            <Close />
                        </IconButton>
                    </div>

                    {/* items in cart */}
                    <div>
                        {cart.length
                            ?                      
                            cart.map((item) => (
                                <div 
                                    key={item.id}
                                    className='flex items-center justify-between w-full pb-3 border-b border-b-neutral-300'
                                >
                                    {/* item image */}
                                    <div className='flex w-2/5'>
                                        {/* item image */}
                                        <CldImage
                                            width="150"
                                            height="200"
                                            src={item.image}
                                            sizes="100vw"
                                            alt={`${item.name}`}
                                        />
                                    </div>

                                    {/* item info */}
                                    <div className='flex flex-col w-3/5'>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-bold'>{item.name}</p>
                                        
                                            {/* remove item from cart */}
                                            <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                                <Delete />
                                            </IconButton>
                                        </div>

                                        {/* increase & decrease item count */}
                                        <div className='flex items-center justify-between'>
                                            {/* item price */}
                                            <span className='font-bold'>${item.price}</span>
                                            
                                            <div className='bg-neutral-300 w-fit rounded-xl'>
                                                <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                                                    <Remove />
                                                </IconButton>
                                                <span>{item.count}</span>
                                                <IconButton onClick={() => dispatch (increaseCount({ id: item.id }))}>
                                                    <Add />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className='w-full flex flex-col items-center justify-center'>
                                <p className='text-2xl text-neutral-300 mb-5'>
                                    Your cart is craving some delicious coffee
                                </p>
                                <Link 
                                    href={'/shop'}
                                    className='border-b-4 border-b-orange-500 text-xl'
                                    onClick={() => dispatch(setIsCartOpen())}
                                >
                                    Shop
                                </Link>
                            </div>
                        }
                    </div>

                    {/* total price and checkout */}
                    <div className='my-5 flex flex-col items-center justify-center text-xl'>
                        <div className='flex items-center justify-between mb-5 w-full'>
                            <span>SUBTOTAL</span>
                            <span className='text-xl font-bold'>${totalPrice}</span>
                        </div>
                        <Link 
                            href={'/checkout'}
                            className='bg-orange-500 px-5 py-2 text-white rounded-lg hover:bg-sky-500 transition duration-500'
                            onClick={() => dispatch(setIsCartOpen())}
                        >
                            CHECKOUT
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal