import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.116.99:9090',
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
