function Footer() {
    return (
        <footer className="bg-slate-200 mt-10 py-10 w-full flex items-center justify-center">
            <div className="flex gap-10 w-4/5">
            <div className="flex flex-col flex-wrap">
                <h4 className="font-bold mb-4 text-orange-500 text-2xl font-bold">Kafe</h4>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam minima quo nesciunt impedit ipsa libero debitis accusantium sequi exercitationem esse.</p>
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="font-bold mb-4">About Us</h4>
                <span>Careers</span>
                <span>Our Locations</span>
                <span>Terms & Conditions</span>
                <span>Privacy Policy</span>
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="font-bold mb-4">Customer Care</h4>
                <span>Help Center</span>
                <span>Track Your Order</span>
                <span>Corporate & Bulk Orders</span>
                <span>Returns & Refunds</span>
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="font-bold mb-4">Contact Us</h4>
                <span>1234 Whatever Bro, Real City, Some State, 00000</span>
                <span>definitelynot@ascam.com</span>
                <span>(123)-456-7890</span>
            </div>
            </div>
        </footer>
    )
}

export default Footer