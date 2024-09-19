'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardBody } from '@nextui-org/react'

import AboutUs from '../aboutUs/page'

import '../home/home.css'
import publication from '../../services/publication'
import { PublicationCard } from '../../../components/publicationcard'

const Home = () => {
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            const result = await publication()

            setData(result)
            console.log('asdasd', result)
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
