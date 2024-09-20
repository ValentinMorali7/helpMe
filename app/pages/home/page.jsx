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
    console.log(user)
    useEffect(() => {
        async function fetchData() {
            const result = await publications()

            setData(result)
        }
        fetchData()
    }, [])
    if (!data) {
        return <Spinner color="warning" label="Cargando..." />
    }

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
                <div className="container">
                    {data &&
                        data.map((lists, index) => (
                            <PublicationCard key={index} prop={lists} />
                        ))}
                </div>
            </div>
        </>
    )
}

export default Home
