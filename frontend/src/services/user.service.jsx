import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

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

const getAdminCAMARACC = () => {
  return axios.get(API_URL + 'adminCAMARACC', { headers: authHeader() });
};

const getAdminCOSMITET = () => {
  return axios.get(API_URL + 'adminCOSMITET', { headers: authHeader() });
};

const getAdminDUANA = () => {
  return axios.get(API_URL + 'adminDUANA', { headers: authHeader() });
};

const getAdminOZONO = () => {
  return axios.get(API_URL + 'adminOZONO', { headers: authHeader() });
};

const getAdminROCHE = () => {
  return axios.get(API_URL + 'adminROCHE', { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAdminESECENTRO,
  getAdminCAMARACC,
  getAdminCOSMITET,
  getAdminDUANA,
  getAdminOZONO,
  getAdminROCHE,
};