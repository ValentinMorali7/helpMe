'use client'
import React from 'react'
import { Card, CardBody } from '@nextui-org/react'

import AboutUs from '../aboutUs/page'
import { PublicationCard } from '../../../components/publicationcard'

import '../home/home.css'

const Home = () => {
    const list = [
        {
            title: 'Organizacion 1',
            img: '',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            title: 'Organizacion 2',
            img: '',
            description:
                'Lorem ipsum dolor sit amet, conidunt ut labore et dolore magna aliqua. Ut enim ad ostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            title: 'Organizacion 3',
            img: '',
            description:
                'Lorem ipsum dolor sit amet, comod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            title: 'Organizacion 4',
            img: '',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididut enim ad minim tation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            title: 'Organizacion 6',
            img: '',
            description:
                'Lorem ipsum dolor sit unt ut labore et diam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
    ]

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
                    {list.map((lists, index) => (
                        <PublicationCard key={index} prop={lists} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
