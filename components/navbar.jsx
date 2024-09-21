'use client'
import { useContext, useEffect, useState } from 'react'
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

import UserContext from '../app/UserContext'

import {
    AboutUsLogo,
    ContactUsLogo,
    ProfileLogo,
    LogoutLogo,
} from '@/components/styledIcons'

export const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(true) // Estado de carga
    const router = useRouter()
    const dataUser = JSON.parse(window.localStorage.getItem('loggedUser'))

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        window.location.reload()
        router.push('pages/profile')
    }

    const handleCrearPublicacion = () => {
        router.push('pages/publicacion')
    }

    useEffect(() => {
        if (user === null) {
            const loggedUserJSON = window.localStorage.getItem('loggedUser')

            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)

                setUser(user)
            } else {
                router.push('/') // Si no hay usuario, redirige
            }
        }
        setLoading(false) // Indica que la carga ha finalizado
    }, [user, setUser, router])

    if (loading) {
        return <p>Cargando...</p> // Muestra un indicador de carga mientras se obtiene el usuario
    }

    if (!user || !user.token) {
        router.push('/')

        return null
    }

    return (
        <NextUINavbar
            isBordered
            className="bg-slate-200	"
            color="primary"
            maxWidth="xl"
            position="sticky"
        >
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link
                        className="flex justify-start items-center gap-1"
                        href="/pages/home"
                    >
                        <p className="font-bold text-inherit">HOME</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    {dataUser.usuario.tipoDeUsuario === 'organizacion' && (
                        <Button
                            as={Link}
                            className="text-sm font-normal text-default-600 bg-default-100"
                            variant="flat"
                            onClick={handleCrearPublicacion}
                        >
                            Crear Nueva Publicacion
                        </Button>
                    )}
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
                {
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
                }
            </NavbarContent>
        </NextUINavbar>
    )
}
