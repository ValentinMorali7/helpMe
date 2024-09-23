import React from 'react'
import {
    FacebookLogo,
    InstagramLogo,
    TwitterLogo,
} from '../../../components/styledIcons'
import { title } from '../../../components/primitives'

// asd
const ContactUs = () => {
    return (
        <>
            <div className="flex flex-row justify-center ">
                <span className={title()}>Somos&nbsp;</span>
                <span className={title({ color: 'blue' })}>HelpMe!&nbsp;</span>
            </div>
            <div className="flex flex-row items-center justify-center mt-20">
                <a href="https://instagram.com">
                    <InstagramLogo size={150} />
                </a>
                <a href="https://facebook.com">
                    <FacebookLogo size={150} />
                </a>
                <a href="https://twitter.com">
                    <TwitterLogo size={150} />
                </a>
            </div>
            <div className="flex flex-row justify-center mt-20">
                <p className="text-lg">
                    Para más información, contactanos por mail:&nbsp;
                </p>
                <a className="text-cyan-600 text-lg" href="www.gmail.com">
                    soporte@helpme.com
                </a>
            </div>
        </>
    )
}

export default ContactUs
