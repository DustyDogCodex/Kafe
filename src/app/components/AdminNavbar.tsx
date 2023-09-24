'use client'
import { useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import { Badge, Icon, IconButton } from '@mui/material'
import { Menu, Close } from '@mui/icons-material'
import Link from 'next/link'

function AdminNavBar() {
    //using state to toggle navbar menu
    const [ menuToggled, setMenuToggled ] = useState<boolean>(false)

    //checking to see if window is above a small screen with custom hook
    const aboveSmallScreens: boolean = useMediaQuery("(min-width: 768px)")

    return (
        <nav
            className="fixed top-0 z-20 bg-black w-full flex items-center justify-center text-amber-400"
        >
            <div
                className='w-full flex items-center justify-between py-5 px-10 xl:w-4/5'
            >
                {/* brand logo and name */}
                <div
                    className='flex items-center justify-center'
                >  
                    <Link
                        href={'/'}
                        className='text-2xl font-bold'
                    >
                        Welcome, Supreme Leader
                    </Link>
                </div>

                {/* menu options */}
                {aboveSmallScreens
                    ?
                    <>
                    <div className="flex justify-between items-center gap-20">
                        <Link
                            href={'/'}
                        >
                            Store
                        </Link>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <Link
                            href={'/'}
                        >
                            Search
                        </Link>
                        {/* for now, login is directly redirecting to admin dashboard instead of an admin login page. Login and auth will be set up after I set up a skeleton dashboard */}
                        <Link
                            href={'/admin'}
                        >
                            Logout
                        </Link>
                    </div>
                    </>
                    :
                    /* this is what NavBar will look like for smaller screens when menu is toggled off */
                    <button
                        className="rounded-full p-2 flex items-center justify-center hover:scale-125 transition duration-300"
                        onClick={() => setMenuToggled(true)}
                    >
                        <Icon>
                            <Menu />
                        </Icon>
                    </button>
                }

                {/* toggleable side menu for small/mobile screens */}
                {/* menu will slide in from top when user clicks the menu icon */}
                {/* after user clicks on a link, the menu will close automatically */}
                {(
                    <div 
                        className={`${ aboveSmallScreens ? 'hidden' : '' } fixed ${ menuToggled ? 'top-0' : '-top-[250px]'} h-[250px] right-0 w-full bg-fuchsia-500 rounded-b-xl ease-in-out duration-700`}
                    >
                        {/* X button on top to close menu */}
                        <div className="flex justify-end px-4 pt-5 mr-8">
                            <button 
                                onClick={() => setMenuToggled(!menuToggled)}
                                className="p-2 rounded-full flex items-center"
                            >
                                <Icon>
                                    <Close />
                                </Icon>
                            </button>
                        </div>

                        {/* links inside menu */}
                        <div 
                            className="flex flex-col items-center gap-8 text-2xl"
                            /* closes menu after a link is clicked */
                            onClick={() => setMenuToggled(!menuToggled)}
                        >
                            <Link
                                href={'/'}
                            >
                                About
                            </Link>
                            <Link
                                href={'/'}
                            >
                                Shop
                            </Link>
                            <Link
                                href={'/'}
                            >
                                Roasters
                            </Link>
                            <Link
                                href={'/'}
                            >
                                Search
                            </Link>
                            <Link
                                href={'/'}
                            >
                                Login
                            </Link>
                            <Link
                                href={'/'}
                            >
                                Cart
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default AdminNavBar