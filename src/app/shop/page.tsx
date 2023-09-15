import CartModal from "../components/CartModal"
import NavBar from "../components/Navbar"

function Shop() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container pt-20">
                this is the shop page
            </div>
            <CartModal />
        </div>
    )
}

export default Shop