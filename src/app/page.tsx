import Hero from "./components/Hero"
import NavBar from "./components/Navbar"
import Intro from "./components/Intro"
import Offers from "./components/Offers"
import CartModal from "./components/CartModal"
import Subscribe from "./components/Subscribe"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container pt-20 w-full">
                <Hero />
                <Intro />
                <Offers />
                <Subscribe />
            </div>
            <CartModal />
        </main>
    )
}
