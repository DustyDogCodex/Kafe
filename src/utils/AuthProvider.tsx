'use client'
import { SessionProvider } from 'next-auth/react'

/* you must use an AuthProvider for client components to use useSession() */
export default function AuthProvider({ children }: any) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}