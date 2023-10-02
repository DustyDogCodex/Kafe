'use client'
import { useState, useEffect } from 'react'
import NewUserModal from '@/app/components/NewUserModal'

function page() {
    //modal for creating new admin account for access to admin dashboard
    const [ newUser, setNewUser ] = useState<boolean>(false)

    function closeModal() {
        setNewUser(!newUser)
    }

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-between">
            {/* {error && <ServerErrorMessage message={error} />} */}
            <div className="container pt-20 font-fauna flex flex-col items-start relative">
                <h1 className="text-4xl mt-5 font-cinzel font-bold">Admin Settings</h1>   
                <span className="text-xl">Manage admin settings for the store</span>

                <button 
                    className="bg-orange-500 py-2 px-5 rounded-xl text-white text-xl mt-5"
                    onClick={() => setNewUser(!newUser)}     
                >
                    Create new admin
                </button>
            </div>

            {/* modal for creating a new admin account */}
            {newUser && (
                <NewUserModal closeModal={closeModal}/>
            )}
        </div>
    )
}

export default page