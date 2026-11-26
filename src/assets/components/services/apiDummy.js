import axios from 'axios';

export const apiDummy = axios.create({
  baseURL: 'https://dummyjson.com/products?limit=24', // URL base para todas las peticiones
  timeout: 10000, // si tarda más de 10 s, Axios lanza un error
});