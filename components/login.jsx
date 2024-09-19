'use client'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useState } from 'react'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user, password)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-4">
                    <Input
                        isRequired
                        type="email"
                        label="Email"
                        placeholder="Ingresa tu email"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                    <Input
                        isRequired
                        type="password"
                        label="Contraseña"
                        placeholder="Ingresa tu contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <Button className="my-5" onClick={handleSubmit}>
                    Iniciar sesión
                </Button>
            </form>
        </div>
    )
}
