import './globals.css'
import type { Metadata } from 'next'
import { Cinzel, Fauna_One } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const cinzel = Cinzel({ subsets: ['latin'] })
export const fauna = Fauna_One({ subsets: ['latin'], weight: '400' })

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
      <body className={cinzel.className}>{children}</body>
    </html>
  )
}
