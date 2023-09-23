'use client'
import { Provider } from 'react-redux'
import NavBar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import CartModal from "../app/components/CartModal"
import { store } from '@/state/store'

function LayoutAndStateProvider({ children }: any) {
    return (
        <Provider store={store}>
            <NavBar />
            <CartModal />
                {children}
            <Footer />
        </Provider>
    )
}

export default LayoutAndStateProvider