import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.125.143.36:8080',
  withCredentials: true,
  headers: {'Content-Type': 'application/json'},
});

export default axiosInstance;
