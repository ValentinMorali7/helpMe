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

export default { publications, publicationById }
