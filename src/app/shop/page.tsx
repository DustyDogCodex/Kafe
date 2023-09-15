import CartModal from "../components/CartModal"
import NavBar from "../components/Navbar"
import ShopCarousel from "../components/ShopCarousel"

function Shop() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container pt-20">
                <ShopCarousel />
            </div>
            <CartModal />
        </div>
    )
}

export default Shop