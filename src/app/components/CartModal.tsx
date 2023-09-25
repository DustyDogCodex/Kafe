'use client'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { increaseCount, decreaseCount, removeFromCart, setIsCartOpen } from '@/state/cartSlice'
import { IconButton } from '@mui/material'
import { Close, Delete, Remove, Add } from '@mui/icons-material'
import { CldImage } from 'next-cloudinary'

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
        <div className={`${isCartOpen ? 'block' : 'hidden'} bg-slate-800/50 fixed z-40 w-full h-full left-0 top-0 overflow-auto`}>
            {/* actual cart modal */}
            <div className='fixed right-0 bottom-0 w-[400px] md:w-[25%] h-full bg-white'>
                <div className='p-8 overflow-auto h-full'>
                    {/* header & close cart button */}
                    <div className='flex justify-between items-center mb-4'>
                        <h3>COFFEE CART {cart.length}</h3>
                        <IconButton onClick={() => dispatch(setIsCartOpen())}>
                            <Close />
                        </IconButton>
                    </div>

                    {/* items in cart */}
                    <div>
                        {cart.map((item) => (
                            <div 
                                key={item.id}
                            >
                                {/* item image */}
                                <div className='flex w-2/5'>
                                    {/* item image */}
                                    <CldImage
                                        width="300"
                                        height="400"
                                        src={item.image}
                                        sizes="100vw"
                                        alt={`${item.name}`}
                                    />
                                </div>

                                {/* item info */}
                                <div className='flex w-3/5'>
                                    <div>
                                        <p className='font-bold mb-5'>{item.name}</p>

                                        {/* remove item from cart */}
                                        <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                            <Delete />
                                        </IconButton>
                                    </div>

                                    {/* increase & decrease item count */}
                                    <div>
                                        <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                                            <Remove />
                                        </IconButton>
                                        <span>{item.count}</span>
                                        <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                                            <Add />
                                        </IconButton>
                                    </div>
                                    
                                    {/* item price */}
                                    <span className='font-bold'>{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* total price and checkout */}
                    <div className='my-5'>
                        <div className='flex items-center justify-between'>
                            <span>SUBTOTAL</span>
                            <span>${totalPrice}</span>
                        </div>
                        <button 
                            className='bg-orange-500 px-5 py-2 text-white rounded-lg'
                            onClick={() => setIsCartOpen()}
                        >
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal