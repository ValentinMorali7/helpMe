'use client'
import { Button } from '@nextui-org/button'
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext } from 'react'

import UserContext from '../../UserContext'

import { LogoutLogo } from '@/components/styledIcons'
import {
    asyncMercadoPago,
    organizacionByIDUSUARIO,
} from '@/app/services/publication'

const Profile = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get('code') // Extraer el código de MercadoPago
    const state = searchParams.get('state') // Extraer el estado de MercadoPago
    const [organizacion, setOrganizacion] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingMercadoPago, setLoadingMercadoPago] = useState(false)
    const { user } = useContext(UserContext)
    const handleVincularMercadoPago = () => {
        router.push(
            `https://auth.mercadopago.com/authorization?response_type=code&client_id=90814232312033&state=${organizacion.id}`
        )
    }

    useEffect(() => {
        if (code && state) {
            asyncMercadoPago({ code, state })
        }
    }, [code, state])

    const fetchOrganizacionById = async () => {
        try {
            const response = await organizacionByIDUSUARIO(
                user.usuario.id,
                user.token
            )

            setOrganizacion(response)
        } catch (error) {
            console.error('Error al obtener la organización:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user && user.usuario.id) {
            fetchOrganizacionById()
        }
    }, [user])

    if (loading) {
        return <p>Cargando...</p>
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            {user && user.usuario.tipoDeUsuario === 'organizacion' && (
                <Button
                    className="text-sm font-normal text-default-600 bg-default-100"
                    disabled={
                        organizacion && organizacion.mercadoPagoCode.length > 0
                    }
                    startContent={<LogoutLogo />}
                    variant="flat"
                    onClick={handleVincularMercadoPago}
                >
                    {organizacion?.mercadoPagoCode
                        ? 'Actualmente vinculado a MercadoPago'
                        : 'Vincular con MercadoPago'}
                </Button>
            )}
        </section>
    )
}

export default Profile
