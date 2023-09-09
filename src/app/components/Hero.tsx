function Hero() {
    return (
        <div className="relative">
            {/* coffee roasting video set as background on homepage */}
            <video autoPlay muted loop>         
                <source 
                    src='/coffee.mp4' 
                    type="video/mp4"
                />       
            </video>

            {/* white text  */}
            <div className="flex flex-col w-1/3 absolute top-[40%] left-10 text-white font-fauna">
                <h1 className="text-5xl">
                    Discover better coffee, delivered fresh from the best roasters in the country
                </h1>

                {/* buttons */}
                <div className="mt-5 flex items-center justify-start gap-10">
                    <button className="bg-orange-500 py-3 px-8 rounded-xl font-bold">
                        GET STARTED
                    </button>
                    <button className="bg-black py-3 px-8 rounded-xl font-bold">
                        VIEW ROASTERS
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero