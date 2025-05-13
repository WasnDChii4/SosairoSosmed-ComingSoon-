import axios from "axios";

const axiosCLient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export default axiosCLient;