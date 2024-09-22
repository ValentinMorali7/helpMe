import React, { createContext, useState } from 'react'

const NavbarContext = createContext()

export const NavbarProvider = ({ children }) => {
    const [navbar, setNavbar] = useState(false)

    return (
        <NavbarContext.Provider value={{ navbar, setNavbar }}>
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarContext
