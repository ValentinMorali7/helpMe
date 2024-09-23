/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import { useContext, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'

import UserContext from '../../UserContext'
import loginService from '../../services/login'

import { title, subtitle } from '@/components/primitives'

const LoginPage = () => {
    const { user, setUser } = useContext(UserContext)
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    // useEffect(() => {
    //     const token = window.localStorage.getItem('loggedUser')

    //     if (token) {
    //         setUser('')
    //     }
    // }, [token])

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await loginService.login({
                user: email,
                password,
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(response))
            setUser(response)
            router.push('/pages/home')
        } catch (error) {
            setError('Wrong credentials')
            setIsLoading(false)
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
                {!user && (
                    <>
                        <div className={subtitle({ class: 'mt-4' })}>
                            Por favor, inicia sesión o regístrate.
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <Input
                                isRequired
                                label="Email"
                                placeholder="Ingresa tu email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                isRequired
                                label="Contraseña"
                                placeholder="Ingresa tu contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            className="my-5 mr-5"
                            isLoading={isLoading}
                            onClick={handleLogin}
                        >
                            Iniciar sesión
                        </Button>
                        <a
                            className="cursor-pointer"
                            onClick={() => router.push('/pages/register')}
                        >
                            No tienes cuenta? Regístrate!
                        </a>
                    </>
                )}
            </div>
        </section>
    )
}

export default LoginPage
