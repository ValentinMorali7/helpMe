'use client'
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

import {
    AboutUsLogo,
    ContactUsLogo,
    HomeLogo,
    LogoutLogo,
    ProfileLogo,
} from '@/components/styledIcons'

export const Navbar = () => {
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
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

                <NavbarItem className="hidden md:flex">
                    <Button
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        startContent={<LogoutLogo />}
                        variant="flat"
                        onClick={() => {
                            localStorage.removeItem('token')
                            window.location.reload()
                        }}
                    >
                        CERRAR SESIÓN
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    )
}
