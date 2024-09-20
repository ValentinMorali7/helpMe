'use client'
import useTheme from './use-theme'

export default function ThemeDetails() {
    const { theme, setTheme } = useTheme()

    return (
        <div
            className={`w-full h-screen flex justify-center items-center ${
                theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
        >
            <div>
                <h1>Current theme</h1>
                <p>Theme: {theme}</p>
                <button
                    onClick={() => {
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }}
                >
                    Toggle theme
                </button>
            </div>
        </div>
    )
}
