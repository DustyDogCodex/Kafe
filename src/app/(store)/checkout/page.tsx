import { TextField } from "@mui/material"

function page() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="container pt-20 font-fauna flex items-center justify-start gap-5">
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
                        
                        {/* address */}
                        <h2 className="text-xl">Address</h2>
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
                    </form>
                </div>

                {/* simple cart summary? */}
                <div className="mt-10 w-1/2">
                    <h1 className="text-3xl font-cinzel">Cart Summary</h1>
                </div>
            </div>
        </div>
    )
}

export default page