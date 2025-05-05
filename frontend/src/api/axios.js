import axios from 'axios';

// Configuración base de axios
const instance = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto por tu backend real
  //timeout: 5000,
  /* headers: {
    'Content-Type': 'application/json',
  }, */

});

// Petición GET
export const get = (url, params = {}) => {
  return instance.get(url, { params });
};

// Petición POST
export const post = (url, data = {}) => {
  return instance.post(url, data);
};

// Petición PUT
export const put = (url, data = {}) => {
  return instance.put(url, data);
};

// Petición DELETE
export const del = (url, params = {}) => {
  return instance.delete(url, { params });
};

export default {
  get,
  post,
  put,
  del,
};
