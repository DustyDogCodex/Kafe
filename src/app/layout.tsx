import './globals.css'
import type { Metadata } from 'next'
import { Cinzel, Fauna_One } from 'next/font/google'

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
                {children}
            </body>
        </html>
    )
}
