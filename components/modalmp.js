import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@nextui-org/react'

const ModalMP = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            DONAR
                        </ModalHeader>
                        <ModalBody>
                            <p>AQUI VAN METODOS DE PAGO</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalMP
