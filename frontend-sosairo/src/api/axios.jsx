import axios from 'axios';

const axiosCLient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Accept: 'application/json'
  }
});

axiosCLient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosCLient;