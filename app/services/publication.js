import axios from 'axios'
const baseUrl =
    'https://helpme-server-g9fncxffcsbceqa5.brazilsouth-01.azurewebsites.net/api/'

export const publications = async () => {
    const { data } = await axios.get(baseUrl + 'publicacion')

    return data
}

export const publicationById = async (id) => {
    const { data } = await axios.get(baseUrl + `publicacion/${id}`)

    return data
}

export const crearPublication = async (dataBody) => {
    const { data } = await axios.post(baseUrl + `publicacion`, dataBody)

    return data
}

export const organizacionByIDUSUARIO = async (id, token) => {
    const { data } = await axios.get(baseUrl + `organizacion/usuario/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`, // Agrega el token aquí
            'Content-Type': 'application/json',
        },
    })

    return data
}

export const contribuyenteByIDUSUARIO = async (id, token) => {
    const { data } = await axios.get(baseUrl + `Contribuyente/usuario/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`, // Agrega el token aquí
            'Content-Type': 'application/json',
        },
    })

    return data
}

export const asyncMercadoPago = async (query) => {
    const { data } = await axios.get(
        baseUrl + `mercadopago?code=${query.code}&state=${query.state}`
    )

    return data
}

export const crearDonacion = async (body) => {
    const { data } = await axios.post(baseUrl + 'donacion/crear-donacion', body)

    return data
}

export const actualizarDonacion = async (id) => {
    const { data } = await axios.get(
        baseUrl + `donacion/actualizar-donacion?id=${id}`
    )

    return data
}

export const donadoresByIDPublicacion = async (id) => {
    const { data } = await axios.get(baseUrl + `donacion/publicacion/${id}`)

    return data
}

export default { publications, publicationById, crearPublication }
