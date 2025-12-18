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
        // Menggunakan class kustom navbar-fixed dari global.css untuk fixed position, shadow, dan background
        <header className='navbar-fixed top-0 w-full z-50'> 
            {/* 2. Container untuk lebar maksimal dan rata tengah (Sama seperti desain) */}
            <div className='container mx-auto px-8'> 
                <div className='flex items-center justify-between h-24'> 
                    
                    {/* Logo Section (Kiri) */}
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

                    {/* Navigation Menu (Kanan - Selalu Tampil) */}
                    <nav className='flex space-x-8'> {/* Jarak antar tautan 10 (sekitar 40px) */}
                        {NavLinks.map((nav) => {
                            // Cek apakah tautan ini sedang aktif
                            const isActive = path === nav.link || (path.startsWith(nav.link) && nav.link !== '/')
                            
                            return (
                                <Link
                                    key={nav.name}
                                    href={nav.link}
                                    // 3. Styling Tautan (Mengambil dari desain yang rapi)
                                    className={`
                                        text-base 
                                        font-normal 
                                        transition duration-150 
                                        ${isActive 
                                            ? 'text-blue-900 font-semibold' // Teks Aktif (Lebih tebal dan biru)
                                            : 'text-gray-700 hover:text-blue-700' // Teks Normal
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