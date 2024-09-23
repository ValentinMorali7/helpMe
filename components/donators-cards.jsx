import React from 'react'
import { Card, CardBody, Image } from '@nextui-org/react'

export default function DonatorCard({ donador }) {
    return (
        <Card isBlurred className="max-w-[1010px] mt-5" shadow="sm">
            <CardBody>
                <div className="grid grid-cols-3 md:grid-cols-12 md:gap-4 items-center justify-center">
                    <div>
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            height={90}
                            shadow="md"
                            src={
                                donador.imgUrlContribuyente ??
                                `https://nextui.org/images/album-cover.png`
                            }
                            width="320px"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">
                                    {donador.nombreContribuyente}{' '}
                                    {donador.apellidoContribuyente}
                                </h3>
                                <p className="text-small text-foreground/80">
                                    Ha donado ${donador.cantidad} !!!
                                </p>
                                <h1 className="text-large font-small mt-2">
                                    {donador.mensaje}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
