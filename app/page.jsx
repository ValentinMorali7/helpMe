'use client'
import { title, subtitle } from '@/components/primitives'
import { Input } from '@nextui-org/input'
import { useEffect, useState } from 'react'
import loginService from './services/login'
import registerService from './services/register'
import { Button } from '@nextui-org/button'

export default function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useState('')
    const [toggleLogin, setToggleLogin] = useState(true)
    const [toggleOrganization, setToggleOrganization] = useState(false)

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
                            color="primary"
                            variant={toggleOrganization ? 'ghost' : 'solid'}
                            className="my-5 mr-5 min-w-40"
                            onClick={() => setToggleOrganization(false)}
                        >
                            CONTRIBUYENTE
                        </Button>

                        <Button
                            color="primary"
                            variant={toggleOrganization ? 'solid' : 'ghost'}
                            className="my-5 mr-5  min-w-40"
                            onClick={() => setToggleOrganization(true)}
                        >
                            ORGANIZACIÓN
                        </Button>
                        <div className="w-full flex flex-col gap-4">
                            {toggleOrganization ? (
                                <>
                                    <Input
                                        isRequired
                                        type="email"
                                        label="Email"
                                        placeholder="Ingresa tu email"
                                        onChange={(e) =>
                                            setRegOrganizationEmail(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationEmail}
                                    />

                                    <Input
                                        isRequired
                                        type="text"
                                        label="Nombre de la organización"
                                        placeholder="Ingresa el nombre de la organización"
                                        onChange={(e) =>
                                            setRegOrganizationName(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationName}
                                    ></Input>

                                    <Input
                                        isRequired
                                        type="password"
                                        label="Contraseña"
                                        placeholder="Ingresa tu contraseña"
                                        onChange={(e) =>
                                            setRegOrganizationPassword(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationPassword}
                                    />

                                    <Input
                                        isRequired
                                        type="text"
                                        label="Descripción"
                                        placeholder="Ingresa la descripción"
                                        onChange={(e) =>
                                            setRegOrganizationDescription(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationDescription}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="CUIT"
                                        placeholder="Ingresa el CUIT"
                                        onChange={(e) =>
                                            setRegOrganizationCUIT(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationCUIT}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Localidad"
                                        placeholder="Ingresa la localidad"
                                        onChange={(e) =>
                                            setRegOrganizationLocality(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationLocality}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Código Postal"
                                        placeholder="Ingresa el código postal"
                                        onChange={(e) =>
                                            setRegOrganizationCP(e.target.value)
                                        }
                                        value={regOrganizationCP}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Provincia"
                                        placeholder="Ingresa la provincia"
                                        onChange={(e) =>
                                            setRegOrganizationProvince(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationProvince}
                                    />

                                    <Input
                                        isRequired
                                        type="date"
                                        label="Fecha de creación"
                                        placeholder="Ingresa la fecha de creación de tu organización"
                                        onChange={(e) =>
                                            setRegOrganizationCreationDate(
                                                e.target.value
                                            )
                                        }
                                        value={regOrganizationCreationDate}
                                    />
                                </>
                            ) : (
                                <>
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Nombre"
                                        placeholder="Ingresa tu nombre"
                                        onChange={(e) =>
                                            setRegContributorName(
                                                e.target.value
                                            )
                                        }
                                        value={regContributorName}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Apellido"
                                        placeholder="Ingresa tu apellido"
                                        onChange={(e) =>
                                            setRegContributorLastname(
                                                e.target.value
                                            )
                                        }
                                        value={regContributorLastname}
                                    />
                                    <Input
                                        isRequired
                                        type="date"
                                        label="Fecha de nacimiento"
                                        placeholder="Ingresa tu fecha de nacimiento"
                                        onChange={(e) =>
                                            setRegContributorBirthdate(
                                                e.target.value
                                            )
                                        }
                                        value={regContributorBirthdate}
                                    />
                                    <Input
                                        isRequired
                                        type="email"
                                        label="Email"
                                        placeholder="Ingresa tu email"
                                        onChange={(e) =>
                                            setRegContributorEmail(
                                                e.target.value
                                            )
                                        }
                                        value={regContributorEmail}
                                    />
                                    <Input
                                        isRequired
                                        type="password"
                                        label="Contraseña"
                                        placeholder="Ingresa tu contraseña"
                                        onChange={(e) =>
                                            setRegContributorPassword(
                                                e.target.value
                                            )
                                        }
                                        value={regContributorPassword}
                                    />
                                </>
                            )}
                        </div>
                        <Button
                            color="primary"
                            className="my-5 mr-5"
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
