'use client'
import React, { useState, useEffect, useContext } from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'

import AboutUs from '../aboutUs/page'

import '../home/home.css'
import { PublicationCard } from '../../../components/publicationcard'
import { publications } from '../../services/publication'
import UserContext from '../../UserContext'

const Home = () => {
    const [data, setData] = useState()

    const user = useContext(UserContext)

    useEffect(() => {
        async function fetchData() {
            const result = await publications()

            setData(result)
        }
        fetchData()
    }, [])

    // if (!data) {
    //     return
    // }

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
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                        {data.map((lists, index) => (
                            <PublicationCard key={index} prop={lists} />
                        ))}
                    </div>
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
