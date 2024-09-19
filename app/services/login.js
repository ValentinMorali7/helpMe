import axios from 'axios'
import exp from 'constants'
const baseUrl =
    'https://helpme-server-g9fncxffcsbceqa5.brazilsouth-01.azurewebsites.net/api/Auth/login'

const login = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}

const checkHealth = async () => {
    const { data } = await axios.get(baseUrl)
    return data
}

export default { login, checkHealth }
