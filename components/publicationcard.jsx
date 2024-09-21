'use client'
import React from 'react'
import {
    Image,
    Card,
    CardBody,
    CardFooter,
    Divider,
    CardHeader,
    Link,
} from '@nextui-org/react'
import '../components/cardstyles.css'

const TruncatedText = ({ text, maxLength }) => {
    const truncated =
        text.length > maxLength ? text.substring(0, maxLength) + '...' : text

    return <p>{truncated}</p>
}

export const PublicationCard = ({ prop }) => {
    return (
        <Card key={prop.id} className="py-4 mt-4 h-[350px] w-[250]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
                <Link href={`/publication/${prop?.id}`}>
                    <Image
                        className="w-full object-cover h-[140px]"
                        radius="lg"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                    />
                </Link>
                <Divider />
                <b>{prop.titulo}</b>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-700 m-3">
                <TruncatedText maxLength={80} text={prop.contenido} />
            </CardBody>
            <CardFooter className="grid justify-items-center">
                <div>
                    <Link color="primary" href={`/publication/${prop?.id}`}>
                        Ver Mas..
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
