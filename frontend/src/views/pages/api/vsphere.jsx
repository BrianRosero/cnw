const BASE_URL = 'http://192.168.200.155:8083/api';

// Función para obtener el resumen del host
export const getHostSummary = async () => {
  const response = await fetch(`${BASE_URL}/host-summary`);
  if (!response.ok) throw new Error('Error obteniendo resumen del host');
  return response.json();
};

// Función para obtener las máquinas virtuales
export const getVirtualMachines = async () => {
  const response = await fetch(`${BASE_URL}/vms`);
  if (!response.ok) throw new Error('Error obteniendo máquinas virtuales');
  return response.json();
};

// Función para obtener las redes
export const getNetworks = async () => {
  const response = await fetch(`${BASE_URL}/networks`);
  if (!response.ok) throw new Error('Error obteniendo redes');
  return response.json();
};

// Función para obtener los almacenes de datos
export const getDatastores = async () => {
  const response = await fetch(`${BASE_URL}/datastores`);
  if (!response.ok) throw new Error('Error obteniendo almacenes de datos');
  return response.json();
};
