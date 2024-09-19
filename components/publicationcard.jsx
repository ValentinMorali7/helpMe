'use client'
import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Button,
    Divider,
} from '@nextui-org/react'
import '../components/cardstyles.css'

const TruncatedText = ({ text, maxLength }) => {
    const truncated =
        text.length > maxLength ? text.substring(0, maxLength) + '...' : text

    return <p>{truncated}</p>
}

export const PublicationCard = ({ prop }) => {
    console.log('asDASDAS', prop)

    return (
        <div className="cardContainer">
            <Card key={prop.id} shadow="sm">
                <CardBody className="card">
                    <Image
                        className="w-full object-cover h-[140px]"
                        radius="lg"
                        shadow="sm"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                        width="100%"
                    />
                    <CardFooter className="footer">
                        <b>{prop.titulo}</b>
                        <Divider />
                        <TruncatedText maxLength={100} text={prop.contenido} />
                    </CardFooter>
                </CardBody>
                <div className="buttonCard">
                    <Button color="primary">Ver Más</Button>
                </div>
            </Card>
        </div>
    )
}
