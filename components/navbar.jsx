'use client'
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { useState } from 'react'

import {
    AboutUsLogo,
    ContactUsLogo,
    HomeLogo,
    ProfileLogo,
    LogoutLogo,
} from '@/components/styledIcons'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
    const [token, setToken] = useState('')
    const router = useRouter()
    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        window.location.reload()
        router.push('pages/profile')
    }
    return (
        <NextUINavbar isBordered maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link
                        className="flex justify-start items-center gap-1"
                        href="/pages/home"
                    >
                        <HomeLogo />
                        <p className="font-bold text-inherit">HOME</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <Link aria-label="Twitter" href="/pages/aboutUs">
                        <AboutUsLogo className="text-default-500" />
                    </Link>
                    <Link aria-label="Discord" href="/pages/profile">
                        <ProfileLogo className="text-default-500" />
                    </Link>
                    <Link aria-label="Github" href="/pages/contactUs">
                        <ContactUsLogo className="text-default-500" />
                    </Link>
                    {/* <ThemeSwitch /> */}
                </NavbarItem>

                {token && (
                    <NavbarItem className="hidden md:flex">
                        <Button
                            as={Link}
                            className="text-sm font-normal text-default-600 bg-default-100"
                            startContent={<LogoutLogo />}
                            variant="flat"
                            onClick={handleLogout}
                        >
                            CERRAR SESIÓN
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>
        </NextUINavbar>
    )
}
