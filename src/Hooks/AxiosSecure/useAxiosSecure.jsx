import axios from 'axios'
import { useContext, useEffect } from 'react'
import { BloodAppContext } from '../../Context/BloodAppContext';


const axiosSecure = axios.create({
    baseUR: 'https://localhost:5000'
})

const useAxiosSecure = () => {

    const { user } = useContext(BloodAppContext)

    useEffect(() => {
        const reInterceptor = axiosSecure.interceptors.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config

        })

        const resInterceptor = axiosSecure.interceptors.use((response) => {
            return response
        }, (error) => {
            console.log(error);
            return Promise.reject(error)
        })

        return () => {
            axiosSecure.interceptors.request.eject(reInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [user])
    return axiosSecure;
}

export default useAxiosSecure;