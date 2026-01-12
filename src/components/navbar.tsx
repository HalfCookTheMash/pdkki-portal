// src/components/NavBar.tsx
"use client" 

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const path = usePathname()

    const NavLinks = [
        { link: "/", name: "Beranda" },
        { link: "/tentang", name: "Tentang" },
        { link: "/statistik", name: "Statistik" },
        { link: "/faq", name: "F.A.Q" },
    ]

    return (
        <header className='navbar-fixed top-0 w-full z-50'> 
            <div className='container mx-auto px-8'> 
                <div className='flex items-center justify-between h-24'> 

                    <div className='flex-shrink-8'>
                        <Link href="/">
                            <Image
                                src="/assets/logo-djki.png" 
                                alt='Logo DJKI'
                                width={1000}
                                height={1000} 
                                className='w-96 h-54'
                                priority
                            />
                        </Link>
                    </div>

                    <nav className='flex space-x-8'> 
                        {NavLinks.map((nav) => {
                            const isActive = path === nav.link || (path.startsWith(nav.link) && nav.link !== '/')
                            
                            return (
                                <Link
                                    key={nav.name}
                                    href={nav.link}
                                    className={`
                                        text-base 
                                        font-normal 
                                        transition duration-150 
                                        ${isActive 
                                            ? 'text-blue-900 font-semibold'
                                            : 'text-gray-700 hover:text-blue-700' 
                                        }
                                    `}
                                >
                                    {nav.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar