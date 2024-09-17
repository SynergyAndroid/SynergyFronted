import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'http://192.168.0.27:9090',
    withCredentials:true,
});

export default axiosInstance;