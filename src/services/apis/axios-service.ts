import { REACT_APP_API_URL } from '@/configs'
import { getUserDataStorage } from '@/services/storage'
import axios from 'axios'
import queryString from 'query-string'

const axiosService = axios.create({
    baseURL: `${REACT_APP_API_URL}/api`,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})

axiosService.interceptors.request.use(async (config) => {
    const token = getUserDataStorage()?.accessToken || '';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosService.interceptors.response.use(
    (response) => response?.data?.data || response,
    (error) => {
        if (error.response.status === 401) {
            throw new Error('Login session has expired. Please login again!')
        }
        throw error.response
    },
)

export default axiosService
