import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://192.168.200.155:8081/api/test/';

/*const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
};*/

const getModeratorBoard = () => {
  return axios.get(API_URL + 'mod', { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
};

const getAdminCAMARACC = () => {
  return axios.get(API_URL + 'adminCAMARACC', { headers: authHeader() });
};

const getAdminESECENTRO = () => {
  return axios.get(API_URL + 'adminESECENTRO', { headers: authHeader() });
};

const getAdminCOSMITET = () => {
  return axios.get(API_URL + 'adminCOSMITET', { headers: authHeader() });
};

const getAdminOZONO = () => {
  return axios.get(API_URL + 'adminOZONO', { headers: authHeader() });
};

const getAdminROCHE = () => {
  return axios.get(API_URL + 'adminROCHE', { headers: authHeader() });
};

export default {
  getModeratorBoard,
  getAdminBoard,
  getAdminCAMARACC,
  getAdminESECENTRO,
  getAdminCOSMITET,
  getAdminOZONO,
  getAdminROCHE,
};