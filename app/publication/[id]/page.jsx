'use client'
import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/navigation'

import { publicationById } from '../../services/publication'
import ModalMP from '../../../components/modalmp'

const Page = ({ params: { id } }) => {
    const [data, setData] = useState()
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            const result = await publicationById(id)

            setData(result)
        }
        fetchData()
    }, [])

    const fechaFormateada = moment(data?.fechaCreacion).format('DD/MM/YYYY')
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (!data) {
        return <Spinner color="warning" label="Cargando..." />
    }

    const handleNavOrgClick = () => {
        router.push(`/organizacion/${data?.organizacionId}`)
    }

    console.log({ data })

    return (
        <Card className="w-full h-full">
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
                <Button color="primary" onClick={onOpen}>
                    DONAR !
                </Button>
                <ModalMP
                    body={data?.descripcionDonacion}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            </CardFooter>
        </Card>
    )
}

export default Page
