import { Tabs, Tab } from "@mui/material"
import CartModal from "../components/CartModal"
import NavBar from "../components/Navbar"
import ShopCarousel from "../components/ShopCarousel"
import ItemCard from "../components/ItemCard"
import Subscribe from "../components/Subscribe"

function Shop() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container pt-20">
                <ShopCarousel />
                <div className="flex flex-col items-center w-full">
                    <h1 className="text-2xl mt-5">Our Current Selection</h1>

                    {/* tabs for filtering products */}
                    <Tabs>
                        <Tab label='ALL' value='all' />
                        <Tab label='BEST SELLERS' value='bestSellers' />
                        <Tab label='TOP RATED' value='topRated' />
                    </Tabs>
                </div>
                <Subscribe />
            </div>
            <CartModal />
        </div>
    )
}

export default Shop