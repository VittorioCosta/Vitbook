import axios from 'axios';
import store from '../store';

// Create an instance of axios
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})



export default api;