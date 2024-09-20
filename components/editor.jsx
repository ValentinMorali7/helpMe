import React, { useState, useContext } from 'react'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

import { crearPublication } from '../app/services/publication'
import UserContext from '../app/UserContext'

function EditorUTN() {
    const [isLoading, setIsLoading] = useState(false)
    const user = useContext(UserContext)
    let [data, setData] = useState('')
    const [error, setError] = useState('')
    let [titulo, setTitulo] = useState('Titulo')
    let [contenido, setContenido] = useState('Nuevo Contenido')
    let [detalleDonacion, setDetalleDonacion] = useState(
        'CBU / Alias / Informacion de donacion'
    )
    let [organizacionId, setOrganizacion] = useState(0)
    const router = useRouter()

    // user.setUser('peralta')

    const handleOnClick = async () => {
        setIsLoading(true)
        try {
            const response = await crearPublication({
                titulo,
                contenido,
                organizacionId: 14,
                detallePago: detalleDonacion,
            })

            router.push(`/publication/${response.id}`)
        } catch (error) {
            //setError('Error al crear una publicacion')
            setTimeout(() => {
                //setError('')
            }, 5000)
        } finally {
            setIsLoading(false) // Termina el loading
        }
    }

    return (
        <div>
            <span>Ingresa un titulo</span>
            <div className="mb-6 ">
                <Input
                    placeholder="Titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <Textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
            />
            <div style={{ marginTop: 30 }}>
                <Textarea
                    label={'Detalle de la donacion'}
                    value={detalleDonacion}
                    onChange={(e) => setDetalleDonacion(e.target.value)}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 10,
                }}
            >
                <Button
                    color="primary"
                    disabled={isLoading}
                    isLoading={isLoading}
                    onClick={handleOnClick}
                >
                    Crear
                </Button>
                <Button>Cancelar</Button>
            </div>
        </div>
    )
}

export default EditorUTN
