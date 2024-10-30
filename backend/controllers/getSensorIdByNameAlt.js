const httpsAgent = require('../config/httpsAgent');
const axios = require('axios');

// Función para obtener el ID del sensor a partir del nombre del sensor (PRTG 192.168.200.160)
const getSensorIdByNameAlt = async (sensorName) => {
  try {
    const response = await axios.get('https://192.168.200.160/api/table.json', {
      params: {
        content: 'sensors',
        columns: 'objid,name',
        username: 'prtgadmin',
        password: 'prtgadmin',
      },
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      },
      httpsAgent,
    });

    const sensors = response.data.sensors || [];
    const sensor = sensors.find(s => s.name === sensorName);
    return sensor ? sensor.objid : null;
  } catch (error) {
    console.error('Error al recuperar sensores de la API de PRTG (Alt):', error.message);
    return null;
  }
};

module.exports = getSensorIdByNameAlt;