import * as React from 'react'

export const HomeLogo = (props) => {
    const { width, height = 40 } = props

    return (
        <svg
            fill="none"
            height="24"
            stroke="#006FEE"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
        </svg>
    )
}

export const ProfileLogo = (props) => {
    const { width, height = 40 } = props

    return (
        <svg
            fill="none"
            height="24"
            stroke="#006FEE"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
            <circle cx="12" cy="10" r="3" />
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
}

export const AboutUsLogo = (props) => {
    const { width, height = 40 } = props

    return (
        <svg
            fill="none"
            height="24"
            stroke="#006FEE"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="16" y2="12" />
            <line x1="12" x2="12.01" y1="8" y2="8" />
        </svg>
    )
}

export const ContactUsLogo = (props) => {
    const { width, height = 40 } = props

    return (
        <svg
            fill="none"
            height="24"
            stroke="#006FEE"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
    )
}

export const LogoutLogo = (props) => {
    const { width, height = 40 } = props

    return (
        <svg
            fill="none"
            height="24"
            stroke="#006FEE"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6" />
        </svg>
    )
}
