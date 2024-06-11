require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const https = require('https');
const app = express();

// Configurar CORS para permitir cualquier origen
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido esta es la aplicación CONSULNETWORKS." });
});

// Configurar agente HTTPS para aceptar certificados autofirmados
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Ignorar el certificado autofirmado
});

/*app.get('/prtg-api', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.200.158:80/api/table.json', {
      params: {
        content: 'sensors',
        output: 'json',
        columns: 'objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite,deviceid,device_type,device_manufacturer,device_uptime',
        username: 'prtgadmin',
        password: 'prtgadmin',
      },
      httpsAgent
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});*/

/*app.get('/prtg-api/ESECENTRO', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.200.158:80/api/table.json', {
      params: {
        content: 'sensors',
        output: 'json',
        columns: 'objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite,deviceid,device_type,device_manufacturer,device_uptime',
        username: 'prtgadmin',
        password: 'prtgadmin',
        filter_objid: [2099, 2098, 2126] // Filtrar por los IDs de los sensores
      },
      paramsSerializer: params => {
        // Serializa los parámetros para incluir múltiples filter_objid
        return Object.entries(params)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map(val => `${key}=${val}`).join('&');
            }
            return `${key}=${value}`;
          })
          .join('&');
      },
      httpsAgent
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});*/

/*app.get('/prtg-api/CAMARACC', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.200.158:80/api/table.json', {
      params: {
        content: 'sensors',
        output: 'json',
        columns: 'objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite,deviceid,device_type,device_manufacturer,device_uptime',
        username: 'prtgadmin',
        password: 'prtgadmin',
        filter_objid: [1001] // Filtrar por los IDs de los sensores
      },
      paramsSerializer: params => {
        // Serializa los parámetros para incluir múltiples filter_objid
        return Object.entries(params)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map(val => `${key}=${val}`).join('&');
            }
            return `${key}=${value}`;
          })
          .join('&');
      },
      httpsAgent
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});*/

/*app.get('/prtg-api/CAMARACC/maquina', async (req, res) => {
  try {
    const response = await axios.get('http://192.168.200.158/api/table.json', {
      params: {
        content: 'channels',
        columns: 'objid,channel,name,lastvalue,lastvalue_raw,lastvalue_diff,min,max,avg',
        count: 50,
        id: 1001,
        username: 'prtgadmin',
        password: 'prtgadmin'
      },
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      },
      httpsAgent // Agregar el agente HTTPS
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});*/

app.get('/prtg-api/ESECENTRO/COCLOESECAP02/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId;

  try {
    const response = await axios.get('http://192.168.200.158/api/table.json', {
      params: {
        content: 'channels',
        columns: 'objid,channel,name,lastvalue',
        id: sensorId,
        username: 'prtgadmin',
        password: 'prtgadmin'
      },
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      },
      httpsAgent
    });
    const channelData = response.data.channels || [];
    res.json({ channels: channelData });
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El Servidor se está ejecutando en el puerto ${PORT}.`);
});

function initial() {
  // Verificar si los roles ya existen en la base de datos
  Role.findAll()
    .then(roles => {
      if (roles.length === 0) {
        // Si no hay roles, crear los roles
        Role.create({
          id: 1,
          name: "usuario"
        });

        Role.create({
          id: 2,
          name: "moderador"
        });

        Role.create({
          id: 3,
          name: "administrador"
        });
        Role.create({
          id: 4,
          name: "administrador-ESECENTRO"
        });
        Role.create({
          id: 5,
          name: "administrador-CAMARA-Y-COMERCIO"
        });
        Role.create({
          id: 6,
          name: "administrador-COSMITET"
        });
        Role.create({
          id: 7,
          name: "administrador-DUANA"
        });
        Role.create({
          id: 8,
          name: "administrador-OZONO"
        });
        Role.create({
          id: 9,
          name: "administrador-ROCHE"
        });
      } else {
        console.log('No se han creado algunos roles porque ya existen');
      }
    })
    .catch(err => {
      console.error('Error al revisar los roles:', err);
    });
}
