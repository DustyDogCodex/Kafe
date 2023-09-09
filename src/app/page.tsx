import Hero from "./components/Hero"
import NavBar from "./components/Navbar"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container pt-20 w-full">
                <Hero />
            </div>
        </main>
    )
}
