'use client'
import { useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import { Icon } from '@mui/material'
import { Menu, Close } from '@mui/icons-material'
import Link from 'next/link'
import { signOut } from "next-auth/react"

function AdminNavBar() {
    //using state to toggle navbar menu
    const [ menuToggled, setMenuToggled ] = useState<boolean>(false)

    //checking to see if window is above a small screen with custom hook
    const aboveSmallScreens: boolean = useMediaQuery("(min-width: 768px)")

    return (
        <nav
            className="fixed top-0 z-20 bg-black w-full flex items-center justify-center text-amber-400 font-cinzel"
        >
            <div
                className='w-full flex items-center justify-between py-5 px-10 xl:w-4/5'
            >
                {/* brand logo and name */}
                <div
                    className='flex items-center justify-center'
                >  
                    <Link
                        href={'/admin'}
                        className='text-base md:text-2xl font-bold'
                    >
                        Welcome, Supreme Leader
                    </Link>
                </div>

                {/* menu options */}
                {aboveSmallScreens
                    ?
                    <>
                    <div className="flex justify-between items-center gap-4 text-xl">
                        <Link
                            href={'/admin'}
                        >
                            Store
                        </Link>
                        <Link
                            href={'/admin/orders'}
                        >
                            Orders
                        </Link>
                        <Link
                            href={'/admin/settings'}
                        >
                            Settings
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
                        >
                            Logout
                        </button>
                    </div>
                    </>
                    :
                    /* this is what NavBar will look like for smaller screens when menu is toggled off */
                    <Icon
                        className="rounded-full p-2 flex items-center justify-center hover:scale-125 transition duration-300"
                        onClick={() => setMenuToggled(true)}
                    >    
                        <Menu />
                    </Icon>
                }

                {/* toggleable side menu for small/mobile screens */}
                {/* menu will slide in from top when user clicks the menu icon */}
                {/* after user clicks on a link, the menu will close automatically */}
                {(
                    <div 
                        className={`${ aboveSmallScreens ? 'hidden' : '' } fixed ${ menuToggled ? 'top-0' : '-top-[275px]'} h-[275px] right-0 w-full bg-black rounded-b-xl ease-in-out duration-700`}
                    >
                        {/* X button on top to close menu */}
                        <div className="flex justify-end p-2">
                            <Icon 
                                onClick={() => setMenuToggled(!menuToggled)}
                                className="p-2 rounded-full flex items-center justify-center mr-5 mt-2"
                            >
                                <Close />
                            </Icon>
                        </div>

                        {/* links inside menu */}
                        <div 
                            className="flex flex-col items-center gap-8 text-xl"
                            /* closes menu after a link is clicked */
                            onClick={() => setMenuToggled(!menuToggled)}
                        >
                            <Link
                                href={'/admin'}
                            >
                                Store
                            </Link>
                            <Link
                                href={'/admin/orders'}
                            >
                                Orders
                            </Link>
                            <Link
                                href={'/admin/settings'}
                            >
                                Settings
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default AdminNavBar