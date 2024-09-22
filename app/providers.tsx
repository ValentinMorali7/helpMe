'use client'

import * as React from 'react'
import { createContext, useState } from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { UserProvider } from './UserContext'
import { NavbarProvider } from './NavbarContext'
export interface ProvidersProps {
    children: React.ReactNode
    themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter()

    return (
        <UserProvider>
            <NavbarProvider>
                <NextUIProvider navigate={router.push}>
                    <NextThemesProvider {...themeProps}>
                        {children}
                    </NextThemesProvider>
                </NextUIProvider>
            </NavbarProvider>
        </UserProvider>
    )
}
