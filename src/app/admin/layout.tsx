import { Cinzel, Fauna_One } from 'next/font/google'
import AdminNavBar from '../components/AdminNavbar'
 
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
                <AdminNavBar />
                {children}
            </body>
        </html>
    )
}