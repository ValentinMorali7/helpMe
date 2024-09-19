'use client'
import { title, subtitle } from '@/components/primitives'
import { Input } from '@nextui-org/input'
import { useEffect, useState } from 'react'
import loginService from './services/login'
import { Button } from '@nextui-org/button'

export default function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    // const dispatch = useDispatch()

    useEffect(() => {
        const token = window.localStorage.getItem('loggedUser')
        if (token) {
            setUser('')
        }
    }, [token])

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(user, password)

        try {
            const response = await loginService.login({
                user: email,
                password,
            })
            console.log(response)
            window.localStorage.setItem('loggedUser', JSON.stringify(response))
            setUser(response)
            // dispatch(login(response))
        } catch (error) {
            setError('Wrong credentials')
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>Somos&nbsp;</span>
                <span className={title({ color: 'blue' })}>HelpMe!&nbsp;</span>
                <br />
                {user ? (
                    <p> usuario logeadoooo</p>
                ) : (
                    <>
                        <div className={subtitle({ class: 'mt-4' })}>
                            Por favor, inicia sesión o regístrate.
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <Input
                                isRequired
                                type="email"
                                label="Email"
                                placeholder="Ingresa tu email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
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
                        <Button className="my-5" onClick={handleLogin}>
                            Iniciar sesión
                        </Button>
                    </>
                )}
            </div>
        </section>
    )
}
