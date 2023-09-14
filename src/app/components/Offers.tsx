import Image from "next/image"

function Offers() {
    //array for offer title, text and image
    const offersArray: { title: string, text: string, image: string, btnText: string }[] = [
        {
            title: 'Get back on your grind',
            text: 'Enjoy upto $30 off on your first purchase',
            image: '/coffee-sale.jpg',
            btnText: 'GET OFFER'
        },
        {
            title: 'Award winning roasts, just for you ❤️',
            text: 'Discover unique craft coffees from the country\'s best roaster. Roasted within 48 hrs of shipping and your first bag is free.',
            image: '/pour-over.jpg',
            btnText: 'GET STARTED'
        }
    ] 

    return (
        <section className="flex flex-col">
            {offersArray.map((offer,index) => 
                <div 
                    key={index}
                    className="flex even:flex-row-reverse items-center justify-between py-10 px-5"
                >
                    <div className="w-1/2">
                        <h2 className="text-2xl font-semibold mb-5">{offer.title}</h2>
                        <p className="text-lg font-fauna">{offer.text}</p>
                        <button className="mt-3 bg-orange-500 text-white px-5 py-2 rounded-lg">{offer.btnText}</button>
                    </div>
                    
                    <Image 
                        src={offer.image}
                        alt="offer image"
                        width={600}
                        height={450}
                        className="rounded-xl"
                    />
                </div>
            )}
        </section>
    )
}

export default Offers