import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000
})

export default api;