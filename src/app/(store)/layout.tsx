import { Cinzel, Fauna_One } from 'next/font/google'
import StateProvider from '@/utils/StateProvider'
import StoreLayoutProvider from '@/utils/StoreLayoutProvider'
import { ToastProvider } from '@/utils/ToastProvider'
 
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

export default function StoreLayout({
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
                <StateProvider>
                    <ToastProvider />
                    <StoreLayoutProvider>
                        {children}
                    </StoreLayoutProvider>
                </StateProvider>
            </body>
        </html>
    )
}