import axios from 'axios';

const API_URL = 'http://192.168.200.155:8081/api/auth/';

const register = (username, email, password, names, lastname) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
    names,
    lastname
  });
};

const login = (username, password) => {
  return axios.post(API_URL + 'signin', { username, password }).then((response) => {
    if (!response.data.twoFactorEnabled) {
      // Solo almacenar el token si 2FA no está habilitado
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    }
    return response.data;
  });
};

const verify2FA = (userId, token) => {
  return axios.post(API_URL + 'verify-2fa', { userId, token }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};


const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  verify2FA,
  logout,
};
