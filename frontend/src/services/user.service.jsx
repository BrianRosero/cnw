import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://192.168.200.155:8080/api/test/';

const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + 'mod', { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
};

const getAdminESECENTRO = () => {
  return axios.get(API_URL + 'adminESECENTRO', { headers: authHeader() });
};

const getAdminCAMARA = () => {
  return axios.get(API_URL + 'adminCAMARA', { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAdminESECENTRO,
  getAdminCAMARA,
};