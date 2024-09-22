'use client'
import { Button } from '@nextui-org/button'
import React from 'react'
import { LogoutLogo } from '@/components/styledIcons'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import NavbarContext from '../../NavbarContext'

// asd
const Profile = () => {
    const router = useRouter()
    const { navbar, setNavbar } = useContext(NavbarContext)
    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        router.push('/')
        setNavbar(false)
    }
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                startContent={<LogoutLogo />}
                variant="flat"
                onClick={handleLogout}
            >
                CERRAR SESIÓN
            </Button>
        </section>
    )
}

export default Profile
