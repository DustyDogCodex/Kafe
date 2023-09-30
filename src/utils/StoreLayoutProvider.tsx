'use client'
import NavBar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import CartModal from "../app/components/CartModal"

/* this provider sets the layout, redux state and Toaster component (for react hot toast notifications) for customer facing store */
function StoreLayoutProvider({ children }: any) {
    return (
        <>
            <NavBar />
            <CartModal />
                {children}
            <Footer />
        </>
    )
}

export default StoreLayoutProvider