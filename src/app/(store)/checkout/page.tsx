'use client'
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import CartModal from "../../components/CartModal"

function page() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container pt-20">
                this is the checkout page
            </div>
            <CartModal />
            <Footer />
        </div>
    )
}

export default page