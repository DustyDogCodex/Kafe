'use client'
import { store } from '@/state/store'
import './globals.css'
import type { Metadata } from 'next'
import { Cinzel, Fauna_One } from 'next/font/google'
import { Provider } from 'react-redux'
import NavBar from "./components/Navbar"
import Footer from "./components/Footer"
import CartModal from "./components/CartModal"
 
// setting up multiple fonts for use
const fauna = Fauna_One({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fauna',
    weight: '400'
})

const cinzel = Cinzel({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'Kafe',
  description: 'Ecommerce store built using Next.js, Typescript and TailwindCSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>Kafe: Craft Coffee Store</title>
            </head>
            <body className={`${cinzel.variable} ${fauna.variable}`}>
                {/* redux provider wrapper for access to global state variables */}
                <Provider store={store}>
                    <NavBar />
                    <CartModal />
                    {children}
                    <Footer />
                </Provider>
            </body>
        </html>
    )
}
