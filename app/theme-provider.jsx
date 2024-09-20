'use client'
import { useState } from 'react'
import ThemeContext from './theme-context'

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = (useState < 'dark') | ('light' > 'dark')

    return (
        <>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
        </>
    )
}
