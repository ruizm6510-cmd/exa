import axios from 'axios';

export const apiDummy = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, // si tarda más de 10 s, Axios lanza un error
});