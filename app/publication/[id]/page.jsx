'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Button,
    useDisclosure,
    Spinner,
} from '@nextui-org/react'
import moment from 'moment'

import { publicationById } from '../../services/publication'
import ModalMP from '../../../components/modalmp'

const Page = ({ params: { id } }) => {
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            const result = await publicationById(id)

            setData(result)
            console.log('FALOPA', result)
        }
        fetchData()
    }, [])

    const fechaFormateada = moment(data?.fechaCreacion).format('DD/MM/YYYY')
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (!data) {
        return <Spinner color="warning" label="Cargando..." />
    }

    return (
        <Card className="w-full h-full">
            <CardHeader className="flex justify-between flex-gap-3 p-5">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                />
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
                    DONAR por Mercado Pago !
                </Button>
                <ModalMP isOpen={isOpen} onClose={onClose} />
            </CardFooter>
        </Card>
    )
}

export default Page
