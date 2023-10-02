import Admin from '@/models/adminModel'
import { connectMongo } from '@/utils/mongodb'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcrypt'

//connect to database to check credentials
connectMongo()

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your-cool-username" },
                password: { label: "Password", type: "password", placeholder: "your-super-secret-password" }
            },
            async authorize(credentials, req) {
                // if credentials are empty return null
                if(!credentials) return null

                /* find relevant admin in database and check passwords */
                const user = await Admin.findOne({ username: credentials?.username })
                const passwordMatch = await bcrypt.compare(credentials?.password!, user.password)
                
                if (user && passwordMatch) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
}