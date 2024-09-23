/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import React, { useEffect, useState, useContext } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Button,
    useDisclosure,
    Spinner,
    Avatar,
} from '@nextui-org/react'
import moment from 'moment'
import { useRouter, useSearchParams } from 'next/navigation'

import { donadoresByIDPublicacion } from '../../services/publication'
import DonatorCard from '../../../components/donators-cards'
import { actualizarDonacion, publicationById } from '../../services/publication'
import ModalMP from '../../../components/modalmp'
import UserContext from '@/app/UserContext'

const Page = ({ params: { id } }) => {
    const [data, setData] = useState()
    const [donadores, setDonadores] = useState()
    const {user, setUser} = useContext(UserContext);
    const router = useRouter()
    const searchParams = useSearchParams()
    const donadorID = searchParams.get('donadorID') // Extraer el código de MercadoPago
    const fechaFormateada = moment(data?.fechaCreacion).format('DD/MM/YYYY')
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        async function fetchData() {
            const result = await publicationById(id)

            setData(result)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (donadorID) {
            try {
                actualizarDonacion(donadorID)
            } catch (e) {
                console.error(e)
            }
        }
    }, [donadorID])

    useEffect(() => {
        async function fetchDonadores() {
            console.log('donadores')
            const result = await donadoresByIDPublicacion(id)

            setDonadores(result)
        }
        fetchDonadores()
    }, [])

    if (!data) {
        return <Spinner color="warning" label="Cargando..." />
    }

    const handleNavOrgClick = () => {
        router.push(`/organizacion/${data?.organizacionId}`)
    }
    return (
        <>
            <Card className="w-600 h-1000">
                <CardHeader className="flex justify-between flex-gap-3 p-5">
                    <a className="cursor-pointer" onClick={handleNavOrgClick}>
                        <Avatar
                            size="lg"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        />
                    </a>

                    <b>{data?.titulo}</b>
                    <p>{fechaFormateada}</p>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>{data?.contenido}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button color="primary" onClick={onOpen} isDisabled={user.usuario.tipoDeUsuario === "organizacion"}>
                        DONAR !
                    </Button>
                    <ModalMP
                        isOpen={isOpen}
                        publicacion={data}
                        onClose={onClose}
                    />
                </CardFooter>
            </Card>
            <Divider className="my-10" />
            <p className="text-sky-400 text-xl">Contribuyentes</p>
            {donadores && (
                <div className="mt-5">
                    {donadores.map((donador, index) => (
                        <DonatorCard key={index} donador={donador} />
                    ))}
                </div>
            )}
        </>
    )
}

export default Page
