'use client'
import { MarkEmailReadOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from 'react'

function Subscribe() {
    const [ email, setEmail ] = useState<string>('')

    return (
        <div className="w-full md:w-4/5 my-10 mx-auto flex flex-col items-center justify-center bg-neutral-200 rounded-lg">
            <IconButton>
                <MarkEmailReadOutlined fontSize="large" />
            </IconButton>

            <h3 className="text-2xl font-bold">Subscribe To Our Newsletter</h3>
            <p>and get $20 off your first order when your checkout!</p>

            {/* input */}
            <div className="flex items-center py-1 px-2 my-4 mx-auto">
                <input 
                    type="text" 
                    placeholder="Enter your email"    
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white p-2 rounded-xl placeholder:text-black"
                />
                <button className="bg-orange-500 text-white px-5 py-2 rounded-lg ml-2">Subscribe</button>
            </div>
        </div>
    )
}

export default Subscribe