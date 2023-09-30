'use client'
import { useAppSelector } from '@/state/hooks'
import { TextField } from "@mui/material"
import { CldImage } from 'next-cloudinary'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'
import { useForm } from 'react-hook-form'

//stripe publishable key
const stripePromise = loadStripe(
    'pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc'
)

function page() {
    //use react hook form for form data
    const { register, handleSubmit, formState: { errors } } = useForm()

    //access items in cart
    const cart = useAppSelector((state) => state.cart.cart)
    
    //cart total price calculation
    const totalPrice = cart.reduce((sum: number, item: { count: number, price: number }) => {
        return sum + (item.count * item.price)
    }, 0)

    //fucntion for starting stripe session to make payment
    async function makePayment(data: object) {
        const stripe = await stripePromise
        const products = cart.map(({ _id, count }) => ({
            _id,
            count,
        }))
        
        /* post request for starting stripe checkout session */
        axios.post("http://localhost:3000/api/checkout", 
            { data, products } 
        )
        /* redirecting to stripe checkout session provided in response */
        .then(res => window.location.assign(res.data.url))
        .catch(err => console.log(err))
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="container pt-20 font-fauna flex items-start justify-center gap-10">
                {/* address & shipping information */}
                <div className="mt-10 w-1/2">
                    {/* user info and address */}
                    <form>
                        {/* first and last name */}
                        <h1 className="text-3xl font-cinzel">Shipping Information</h1>
                        <div className="flex items-center gap-5">
                            <TextField
                                {...register('firstName', { required: true })}
                                fullWidth
                                variant="outlined"
                                label="First Name"
                                className="my-2 rounded-xl"
                            />
                            <TextField 
                                {...register('lastName', { required: true })}
                                fullWidth
                                variant="outlined"
                                label="Last Name"
                                className="my-2 rounded-xl"
                            />
                        </div>

                        {/* email */}
                        <TextField
                            {...register('email', { required: true })}
                            fullWidth
                            variant="outlined"
                            label="Email"
                            className="my-2 rounded-xl"
                        />
                        
                        {/* shipping address */}
                        <h3 className='mt-5 text-xl font-cinzel'>Shipping Address</h3>
                        <div>
                            <TextField 
                                {...register('line1', { required: true })}
                                fullWidth
                                variant="outlined"
                                label="Address Line 1"
                                className="my-2 rounded-xl"
                            />
                            <TextField 
                                {...register('line2', { required: true })}
                                fullWidth
                                variant="outlined"
                                label="Address Line 2"
                                className="my-2 rounded-xl"
                            />
                            <div className="flex items-center gap-5">
                                <TextField 
                                    {...register('city', { required: true })}
                                    fullWidth
                                    variant="outlined"
                                    label="City"
                                    className="my-2 rounded-xl"
                                />
                                <TextField 
                                    {...register('state', { required: true })}
                                    fullWidth
                                    variant="outlined"
                                    label="State"
                                    className="my-2 rounded-xl"
                                />
                                <TextField 
                                    {...register('zipCode', { required: true })}
                                    fullWidth
                                    variant="outlined"
                                    label="Zip Code"
                                    className="my-2 rounded-xl"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* simple cart summary? */}
                <div className="mt-10 w-1/2">
                    <h1 className="text-3xl font-cinzel">Cart Summary</h1>
                    
                    {/* current items in cart */}
                    <div className='bg-neutral-100 p-2 rounded-xl'>
                        {cart.map((item) => (
                            <div 
                                key={item._id}
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

                    {/* redirect to Stripe for payment and checkout */}
                    <div className='flex items-center justify-center'>
                        <button 
                            type='submit'
                            className='mt-5 px-5 py-2 text-lg font-fauna bg-orange-500 hover:bg-emerald-500 transition duration-500 rounded-xl text-white'
                            onClick={handleSubmit(makePayment)}
                        >
                            Make Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page