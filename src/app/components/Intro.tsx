import Image from "next/image"

function Intro() {
    const titlesAndText: { title: string, text: string }[] = [
        {
            title: 'Find what you love',
            text: 'Find a flavor a fancy to capture your imagination from our wide selection'
        },
        {
            title: 'Change your flavour',
            text: 'Fine tune your palette by checking out our recommended roasts'
        },
        {
            title: 'Discover new favorites',
            text: 'Find new favorites from the many coffee roasts being added every month'
        }
    ]

    const brandLogos: string[] = [
        '/MichelinStar.svg',
        '/Bon-Appetit.png',
        '/Epicurious.png',
        '/Forbes.png',
        '/CNN.png',
        '/WSJ.svg',
    ]

    return (
        <section>
            {/* short intro blurbs */}
            <div className="flex flex-col md:flex-row items-center justify-evenly w-full px-10 py-20 text-center">
                {titlesAndText.map((info,index) => 
                    <div
                        key={index} 
                        className="border-r border-slate-300 last:border-none p-5"
                    >
                        <h2 className="text-2xl font-semibold mb-5">{info.title}</h2>
                        <p className="font-fauna text-lg">{info.text}</p>
                    </div>
                )}
            </div>

            {/* section with brands that love us */}
            <div className="bg-slate-100 flex flex-col items-center py-20 px-10">
                <h2 className="text-3xl font-bold">"The best new innovation for coffee since the French Press"</h2>
                {/* brand logos */}
                <div className="mt-5 flex items-center gap-5">
                    {brandLogos.map((brand,index) => 
                        <Image 
                            key={index}
                            src={brand}
                            alt={`${brand}'s logo`}
                            height={60}
                            width={160}
                            /* className="h-16" */
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default Intro