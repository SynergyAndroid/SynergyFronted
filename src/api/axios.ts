import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.27:9090',
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
