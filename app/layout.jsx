import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'

export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
}

export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
}

export default function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Providers
                    themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
                >
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                            {children}
                        </main>
                        <footer className="w-full flex items-center justify-center py-3">
                            <span className="text-default-600">
                                Somos&nbsp;
                            </span>

                            <p className="text-primary"> HelpMe!</p>
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
