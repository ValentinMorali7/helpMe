'use client'
import { useState } from 'react'
import { title, subtitle } from '@/components/primitives'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import registerService from '../../services/register'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [formState, setFormState] = useState({
        regOrganizationName: '',
        regOrganizationEmail: '',
        regOrganizationPassword: '',
        regOrganizationDescription: '',
        regOrganizationCUIT: '',
        regOrganizationLocality: '',
        regOrganizationCP: '',
        regOrganizationProvince: '',
        regOrganizationCreationDate: '',
        regContributorName: '',
        regContributorLastname: '',
        regContributorBirthdate: '',
        regContributorEmail: '',
        regContributorPassword: '',
    })

    const [toggleOrganization, setToggleOrganization] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (toggleOrganization) {
            try {
                const formattedOrganizationDate = new Date(
                    formState.regOrganizationCreationDate
                ).toISOString()
                const response = await registerService.register({
                    user: formState.regOrganizationEmail,
                    nombreOrganizacion: formState.regOrganizationName,
                    tipoDeUsuario: 'organizacion',
                    password: formState.regOrganizationPassword,
                    cuit: formState.regOrganizationCUIT,
                    descripcion: formState.regOrganizationDescription,
                    localidad: formState.regOrganizationLocality,
                    provincia: formState.regOrganizationProvince,
                    codigoPostal: formState.regOrganizationCP,
                    fechaDeCreacion: formattedOrganizationDate,
                })

                console.log(response)

                alert('Registro Exitoso')
            } catch (error) {
                setError('Wrong credentials')
                setTimeout(() => {
                    setError('')
                }, 5000)
            }
        } else {
            try {
                const formattedContributorDate = new Date(
                    formState.regContributorBirthdate
                ).toISOString()
                const response = await registerService.register({
                    nombre: formState.regContributorName,
                    apellido: formState.regContributorLastname,
                    fechaNacimiento: formattedContributorDate,
                    user: formState.regContributorEmail,
                    password: formState.regContributorPassword,
                    tipoDeUsuario: 'contribuyente',
                })
            } catch (error) {
                setIsLoading(false)
                setError('Wrong credentials')
                setTimeout(() => {
                    setError('')
                }, 5000)
            }
        }
    }

    const {
        regOrganizationName,
        regOrganizationEmail,
        regOrganizationPassword,
        regOrganizationDescription,
        regOrganizationCUIT,
        regOrganizationLocality,
        regOrganizationCP,
        regOrganizationProvince,
        regOrganizationCreationDate,
        regContributorName,
        regContributorLastname,
        regContributorBirthdate,
        regContributorEmail,
        regContributorPassword,
    } = formState

    const organizationValidation =
        regOrganizationEmail &&
        regOrganizationName &&
        regOrganizationPassword &&
        regOrganizationDescription &&
        regOrganizationCUIT &&
        regOrganizationLocality &&
        regOrganizationCP &&
        regOrganizationProvince &&
        regOrganizationCreationDate
    const contributorValidation =
        regContributorName &&
        regContributorLastname &&
        regContributorBirthdate &&
        regContributorEmail &&
        regContributorPassword

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>Somos&nbsp;</span>
                <span className={title({ color: 'blue' })}>HelpMe!&nbsp;</span>
                <br />
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
                                    name="regOrganizationEmail"
                                    placeholder="Ingresa tu email"
                                    type="email"
                                    value={formState.regOrganizationEmail}
                                    onChange={(e) => console.log(e)}
                                />

                                <Input
                                    isRequired
                                    label="Nombre de la organización"
                                    name="regOrganizationName"
                                    placeholder="Ingresa el nombre de la organización"
                                    type="text"
                                    value={formState.regOrganizationName}
                                    onChange={handleChange}
                                />

                                <Input
                                    isRequired
                                    label="Contraseña"
                                    name="regOrganizationPassword"
                                    placeholder="Ingresa tu contraseña"
                                    type="password"
                                    value={formState.regOrganizationPassword}
                                    onChange={handleChange}
                                />

                                <Input
                                    isRequired
                                    label="Descripción"
                                    name="regOrganizationDescription"
                                    placeholder="Ingresa la descripción"
                                    type="text"
                                    value={formState.regOrganizationDescription}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="CUIT"
                                    name="regOrganizationCUIT"
                                    placeholder="Ingresa el CUIT"
                                    type="text"
                                    value={formState.regOrganizationCUIT}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="Localidad"
                                    name="regOrganizationLocality"
                                    placeholder="Ingresa la localidad"
                                    type="text"
                                    value={formState.regOrganizationLocality}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="Código Postal"
                                    name="regOrganizationCP"
                                    placeholder="Ingresa el código postal"
                                    type="text"
                                    value={formState.regOrganizationCP}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="Provincia"
                                    name="regOrganizationProvince"
                                    placeholder="Ingresa la provincia"
                                    type="text"
                                    value={formState.regOrganizationProvince}
                                    onChange={handleChange}
                                />

                                <Input
                                    isRequired
                                    label="Fecha de creación"
                                    name="regOrganizationCreationDate"
                                    placeholder="Ingresa la fecha de creación de tu organización"
                                    type="date"
                                    value={
                                        formState.regOrganizationCreationDate
                                    }
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                                <Input
                                    isRequired
                                    label="Nombre"
                                    name="regContributorName"
                                    placeholder="Ingresa tu nombre"
                                    type="text"
                                    value={formState.regContributorName}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="Apellido"
                                    name="regContributorLastname"
                                    placeholder="Ingresa tu apellido"
                                    type="text"
                                    value={formState.regContributorLastname}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="Fecha de nacimiento"
                                    name="regContributorBirthdate"
                                    placeholder="Ingresa tu fecha de nacimiento"
                                    type="date"
                                    value={formState.regContributorBirthdate}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="Email"
                                    name="regContributorEmail"
                                    placeholder="Ingresa tu email"
                                    type="email"
                                    value={formState.regContributorEmail}
                                    onChange={handleChange}
                                />
                                <Input
                                    isRequired
                                    label="Contraseña"
                                    name="regContributorPassword"
                                    placeholder="Ingresa tu contraseña"
                                    type="password"
                                    value={formState.regContributorPassword}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                    </div>
                    <Button
                        className="my-5 mr-5"
                        color="primary"
                        isLoading={isLoading}
                        isDisabled={
                            toggleOrganization
                                ? !organizationValidation
                                : !contributorValidation
                        }
                        onClick={handleRegister}
                    >
                        Registrarse
                    </Button>
                    <a
                        className="cursor-pointer"
                        onClick={() => router.push('/pages/login')}
                    >
                        Ya te has registrado? Inicia sesión!
                    </a>
                </>
            </div>
        </section>
    )
}
export default RegisterPage
