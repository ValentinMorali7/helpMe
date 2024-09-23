'use client'
import React, { useState, useEffect, useContext, Suspense } from 'react'
import { Card, CardBody, Spinner, Pagination } from '@nextui-org/react'

import AboutUs from '../aboutUs/page'

import '../home/home.css'
import { PublicationCard } from '../../../components/publicationcard'
import { publications } from '../../services/publication'
import UserContext from '../../UserContext'
import NavbarContext from '../../NavbarContext'

const Home = () => {
    const [data, setData] = useState()

    const user = useContext(UserContext)
    const { navbar, setNavbar } = useContext(NavbarContext)
    console.log('navbar en home', navbar)

    useEffect(() => {
        setNavbar(true)

        async function fetchData() {
            const result = await publications()

            setData(result)
        }
        fetchData()
    }, [])

    return (
        <Suspense>
            <div className="body">
                <div>
                    <Card>
                        <CardBody>
                            <AboutUs />
                        </CardBody>
                    </Card>
                </div>
                {data ? (
                    <>
                        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                            {data.map((lists, index) => (
                                <PublicationCard key={index} prop={lists} />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <Pagination
                                className="mt-4 place-self-center"
                                initialPage={1}
                                total={10}
                                isDisabled={true}
                            ></Pagination>
                        </div>
                    </>
                ) : (
                    <div className="grid justify-items-center mt-20">
                        <Spinner color="warning" label="Cargando..." />
                    </div>
                )}
            </div>
        </Suspense>
    )
}

export default Home
