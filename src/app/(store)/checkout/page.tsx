function page() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="container pt-20 font-fauna">
                {/* address & shipping information */}
                <div className="w-1/2">
                    {/* user info and address */}
                    <form className="">
                        {/* first and last name */}
                        <h1 className="text-3xl font-cinzel">Shipping Address</h1>
                        <div className="flex items-center gap-5">
                            <input 
                                type="text" 
                                placeholder="First Name"
                                className="my-2 p-2 border border-sky-400 rounded-xl"
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name"
                                className="my-2 p-2 border border-sky-400 rounded-xl"
                            />
                        </div>
                        
                        {/* address */}
                        <div>
                            <input 
                                type="text" 
                                placeholder="Address Line 1"
                                className="my-2 p-2 border border-sky-400 rounded-xl w-full"
                            />
                            <input 
                                type="text" 
                                placeholder="Address Line 2"
                                className="my-2 p-2 border border-sky-400 rounded-xl w-full"
                            />
                            <div className="flex items-center gap-5">
                                <input 
                                    type="text" 
                                    placeholder="City"
                                    className="my-2 p-2 border border-sky-400 rounded-xl"
                                />
                                <input 
                                    type="text" 
                                    placeholder="State"
                                    className="my-2 p-2 border border-sky-400 rounded-xl"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Zip Code"
                                    className="my-2 p-2 border border-sky-400 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Payment information */}
                        <h1 className="text-3xl font-cinzel mt-5">Credit Card Information</h1>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Card Number"
                                className="my-2 p-2 border border-sky-400 rounded-xl w-full"
                            />
                        </div>
                    </form>
                </div>

                {/* simple cart summary? */}
                <div></div>
            </div>
        </div>
    )
}

export default page