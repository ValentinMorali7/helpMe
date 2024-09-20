'use client'
import { Input } from '@nextui-org/input'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import loginService from './services/login'
import registerService from './services/register'

import { title, subtitle } from '@/components/primitives'

export default function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useState('')
    const [toggleLogin, setToggleLogin] = useState(true)
    const [toggleOrganization, setToggleOrganization] = useState(false)
    const [state, setState] = useState(false)

    const [regOrganizationName, setRegOrganizationName] = useState('')
    const [regOrganizationEmail, setRegOrganizationEmail] = useState('')
    const [regOrganizationPassword, setRegOrganizationPassword] = useState('')
    const [regOrganizationDescription, setRegOrganizationDescription] =
        useState('')
    const [regOrganizationCUIT, setRegOrganizationCUIT] = useState('')
    const [regOrganizationLocality, setRegOrganizationLocality] = useState('')
    const [regOrganizationCP, setRegOrganizationCP] = useState('')
    const [regOrganizationProvince, setRegOrganizationProvince] = useState('')
    const [regOrganizationCreationDate, setRegOrganizationCreationDate] =
        useState('')

    const [regContributorName, setRegContributorName] = useState('')
    const [regContributorLastname, setRegContributorLastname] = useState('')
    const [regContributorBirthdate, setRegContributorBirthdate] = useState('')
    const [regContributorEmail, setRegContributorEmail] = useState('')
    const [regContributorPassword, setRegContributorPassword] = useState('')

    const router = useRouter()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            setUser(user)
        }
    }, [])

    useEffect(() => {
        const token = window.localStorage.getItem('loggedUser')

        if (token) {
            setUser('')
        }
    }, [token])

    // const handleLogin = async (e) => {
    //     e.preventDefault()

    //     try {
    //         const response = await loginService.login({
    //             user: email,
    //             password,
    //         })
    //         window.localStorage.setItem('loggedUser', JSON.stringify(response))
    //         setUser(response)
    //         router.push('/pages/home')
    //     } catch (error) {
    //         setError('Wrong credentials')
    //         setTimeout(() => {
    //             setError('')
    //         }, 5000)
    //     }
    // }

    const handleLogin = async (e) => {
        e.preventDefault()

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
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log('hola')

        if (toggleOrganization) {
            try {
                const formattedOrganizationDate = new Date(
                    regOrganizationCreationDate
                ).toISOString()
                const response = await registerService.register({
                    user: regOrganizationEmail,
                    nombreOrganizacion: regOrganizationName,
                    tipoDeUsuario: 'organizacion',
                    password: regOrganizationPassword,
                    cuit: regOrganizationCUIT,
                    descripcion: regOrganizationDescription,
                    localidad: regOrganizationLocality,
                    provincia: regOrganizationProvince,
                    codigoPostal: regOrganizationCP,
                    fechaDeCreacion: formattedOrganizationDate,
                })

                console.log(response)

                alert('Registro Exitoso'), setToggleLogin(true)
            } catch (error) {
                setError('Wrong credentials')
                setTimeout(() => {
                    setError('')
                }, 5000)
            }
        } else {
            try {
                const formattedContributorDate = new Date(
                    regContributorBirthdate
                ).toISOString()
                const response = await registerService.register({
                    nombre: regContributorName,
                    apellido: regContributorLastname,
                    fechaNacimiento: formattedContributorDate,
                    user: regContributorEmail,
                    password: regContributorPassword,
                    tipoDeUsuario: 'contribuyente',
                })

                console.log(response)

                alert('Registro Exitoso'), setToggleLogin(true)
            } catch (error) {
                setError('Wrong credentials')
                setTimeout(() => {
                    setError('')
                }, 5000)
            }
        }
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>Somos&nbsp;</span>
                <span className={title({ color: 'blue' })}>HelpMe!&nbsp;</span>
                <br />
                {user ? (
                    <p>logeado normalmente</p>
                ) : toggleLogin ? (
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
                        <Button className="my-5 mr-5" onClick={handleLogin}>
                            Iniciar sesión
                        </Button>
                        <a
                            className="cursor-pointer"
                            onClick={() => setToggleLogin(false)}
                        >
                            No tienes cuenta? Regístrate!
                        </a>
                    </>
                ) : (
                    <>
                        <div className={subtitle({ class: 'mt-4' })}>
                            Por favor, regístrate.
                        </div>
                        <Button
                            className="my-5 mr-5 min-w-40"
                            color="primary"
                            variant={toggleOrganization ? 'ghost' : 'solid'}
                            onClick={() => setToggleOrganization(false)}
                        >
                            CONTRIBUYENTE
                        </Button>

                        <Button
                            className="my-5 mr-5  min-w-40"
                            color="primary"
                            variant={toggleOrganization ? 'solid' : 'ghost'}
                            onClick={() => setToggleOrganization(true)}
                        >
                            ORGANIZACIÓN
                        </Button>
                        <div className="w-full flex flex-col gap-4">
                            {toggleOrganization ? (
                                <>
                                    <Input
                                        isRequired
                                        label="Email"
                                        placeholder="Ingresa tu email"
                                        type="email"
                                        value={regOrganizationEmail}
                                        onChange={(e) =>
                                            setRegOrganizationEmail(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Input
                                        isRequired
                                        label="Nombre de la organización"
                                        placeholder="Ingresa el nombre de la organización"
                                        type="text"
                                        value={regOrganizationName}
                                        onChange={(e) =>
                                            setRegOrganizationName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Input
                                        isRequired
                                        label="Contraseña"
                                        placeholder="Ingresa tu contraseña"
                                        type="password"
                                        value={regOrganizationPassword}
                                        onChange={(e) =>
                                            setRegOrganizationPassword(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Input
                                        isRequired
                                        label="Descripción"
                                        placeholder="Ingresa la descripción"
                                        type="text"
                                        value={regOrganizationDescription}
                                        onChange={(e) =>
                                            setRegOrganizationDescription(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="CUIT"
                                        placeholder="Ingresa el CUIT"
                                        type="text"
                                        value={regOrganizationCUIT}
                                        onChange={(e) =>
                                            setRegOrganizationCUIT(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Localidad"
                                        placeholder="Ingresa la localidad"
                                        type="text"
                                        value={regOrganizationLocality}
                                        onChange={(e) =>
                                            setRegOrganizationLocality(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Código Postal"
                                        placeholder="Ingresa el código postal"
                                        type="text"
                                        value={regOrganizationCP}
                                        onChange={(e) =>
                                            setRegOrganizationCP(e.target.value)
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Provincia"
                                        placeholder="Ingresa la provincia"
                                        type="text"
                                        value={regOrganizationProvince}
                                        onChange={(e) =>
                                            setRegOrganizationProvince(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Input
                                        isRequired
                                        label="Fecha de creación"
                                        placeholder="Ingresa la fecha de creación de tu organización"
                                        type="date"
                                        value={regOrganizationCreationDate}
                                        onChange={(e) =>
                                            setRegOrganizationCreationDate(
                                                e.target.value
                                            )
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <Input
                                        isRequired
                                        label="Nombre"
                                        placeholder="Ingresa tu nombre"
                                        type="text"
                                        value={regContributorName}
                                        onChange={(e) =>
                                            setRegContributorName(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Apellido"
                                        placeholder="Ingresa tu apellido"
                                        type="text"
                                        value={regContributorLastname}
                                        onChange={(e) =>
                                            setRegContributorLastname(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Fecha de nacimiento"
                                        placeholder="Ingresa tu fecha de nacimiento"
                                        type="date"
                                        value={regContributorBirthdate}
                                        onChange={(e) =>
                                            setRegContributorBirthdate(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Email"
                                        placeholder="Ingresa tu email"
                                        type="email"
                                        value={regContributorEmail}
                                        onChange={(e) =>
                                            setRegContributorEmail(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Input
                                        isRequired
                                        label="Contraseña"
                                        placeholder="Ingresa tu contraseña"
                                        type="password"
                                        value={regContributorPassword}
                                        onChange={(e) =>
                                            setRegContributorPassword(
                                                e.target.value
                                            )
                                        }
                                    />
                                </>
                            )}
                        </div>
                        <Button
                            className="my-5 mr-5"
                            color="primary"
                            onClick={handleRegister}
                        >
                            Registrarse
                        </Button>
                        <a
                            className="cursor-pointer"
                            onClick={() => setToggleLogin(true)}
                        >
                            Ya te has registrado? Inicia sesión!
                        </a>
                    </>
                )}
            </div>
        </section>
    )
}
