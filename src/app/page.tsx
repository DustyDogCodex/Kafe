import Homepage from "@/pages/Home"
import NavBar from "./components/Navbar"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NavBar />
            <div className="container">
                <Homepage />
            </div>
        </main>
    )
}
