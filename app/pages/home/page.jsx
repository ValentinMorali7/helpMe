'use client'
import React, { useState, useEffect, useContext, use } from 'react'
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
        <>
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
                        <Pagination
                            className="mt-4 place-self-center"
                            initialPage={1}
                            totalPages={10}
                        ></Pagination>
                    </>
                ) : (
                    <div className="grid justify-items-center mt-20">
                        <Spinner color="warning" label="Cargando..." />
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
