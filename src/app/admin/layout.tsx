'use client'
import { store } from '@/state/store'
import { Cinzel, Fauna_One } from 'next/font/google'
import { Provider } from 'react-redux'
 
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>Admin Dashboard</title>
            </head>
            <body className={`${cinzel.variable} ${fauna.variable}`}>
                {/* redux provider wrapper for access to global state variables */}
                <Provider store={store}>
                    {children}
                </Provider>
            </body>
        </html>
    )
}