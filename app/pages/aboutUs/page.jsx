import React from 'react'

import './aboutUs.module.css'

const AboutUs = () => {
    return (
        <div>
            <ul>
                <li className="text-center text-blue-500">
                    <strong>¿Qué es "HelpMe!"?</strong>
                </li>
                <li className="text-center mt-1">
                    HelpMe! es un espacio para brindar ayuda de manera rápida y
                    sencilla a quienes más lo necesitan.
                </li>

                <li className="text-center text-blue-500">
                    <strong>Nuestra historia</strong>
                </li>
                <li className="text-center mt-1">
                    Surgimos en un momento de gran necesidad como lo fue la
                    pandemia por Covid-19. Pero no planeamos dejar de ayudar.
                </li>

                <li className="text-center text-blue-500">
                    <strong>Nuestra misión</strong>
                </li>
                <li className="text-center mt-1">
                    Queremos que cada organización que necesite de ayuda
                    económica pueda recibirla de todos aquellos que están
                    dispuestos a ofrecerla.
                </li>
            </ul>
        </div>
    )
}

export default AboutUs
