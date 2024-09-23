import React, { useContext, useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import UserContext from '@/app/UserContext'
import {
    contribuyenteByIDUSUARIO,
    crearDonacion,
} from '@/app/services/publication'

const ModalMP = ({ isOpen, onClose, publicacion }) => {
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [contribuyente, setContribuyente] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const router = useRouter()

    // Obtener el contribuyente por el ID del usuario
    const fetchContribuyenteById = async () => {
        try {
            setLoading(true)
            const response = await contribuyenteByIDUSUARIO(
                user.usuario.id,
                user.token
            )

            setContribuyente(response)
        } catch (error) {
            console.error('Error al obtener el contribuyente:', error)
        } finally {
            setLoading(false) // Asegúrate de que solo se llame una vez
        }
    }

    // Crear la donación
    const handleCrearDonacion = async () => {
        try {
            setLoading(true) // Indicar que está cargando
            const result = await crearDonacion({
                mensaje,
                cantidad,
                titulo: publicacion.titulo,
                organizacionID: publicacion.organizacionId,
                publicacionID: publicacion.id,
                contribuyenteID: contribuyente.id,
            })

            router.push(result)
        } catch (error) {
            console.error('Error al crear la donación:', error)
        } finally {
            setLoading(false) // Resetear el estado de carga
        }
    }

    useEffect(() => {
        if (user && user.usuario.id) {
            fetchContribuyenteById()
        }
    }, [user]) // Solo se ejecuta cuando el usuario cambia

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            DONAR
                        </ModalHeader>
                        <ModalBody>
                            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                        htmlFor="last-name"
                                    >
                                        Cantidad ( Pesos ARS )
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            autoComplete="family-name"
                                            id="cantidad-donacion"
                                            min={0}
                                            name="Cantidad"
                                            type="number"
                                            value={cantidad}
                                            onChange={(e) =>
                                                setCantidad(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email">Mensaje</label>
                                    <div className="mt-2">
                                        <Textarea
                                            className="max-w-xs"
                                            id="about"
                                            name="about"
                                            rows="3"
                                            value={mensaje}
                                            onChange={(e) =>
                                                setMensaje(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                isDisabled={loading} // Desactivar botón si está cargando
                                onPress={handleCrearDonacion}
                            >
                                {loading ? 'Procesando...' : 'Donar!'}
                            </Button>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalMP
