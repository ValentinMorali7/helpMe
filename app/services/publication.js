import axios from 'axios'
const baseUrl =
    'https://helpme-server-g9fncxffcsbceqa5.brazilsouth-01.azurewebsites.net/api/'

const publications = async () => {
    const { data } = await axios.get(baseUrl + 'publicacion')

    return data
}

export default publications
