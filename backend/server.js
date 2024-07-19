require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
const mongoose = require('mongoose');
const cron = require('node-cron');
const path = require('path');
const multer = require('multer');

const SensorData = require('./app/models/SensorData');

const app = express();

// Directorio donde se almacenan los archivos PDF
const pdfDirectory = path.join(__dirname, 'pdfs/COSMITET');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/sensorData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Esquema y modelo de Mongoose
const sensorSchema = new mongoose.Schema({
  sensorId: Number,
  sensorName: String,
  data: Object,
  timestamp: { type: Date, default: Date.now },
});

// Configurar CORS para permitir cualquier origen
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar agente HTTPS para aceptar certificados autofirmados
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Ignorar el certificado autofirmado
});

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido esta es la aplicación CONSULNETWORKS.' });
});

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pdfDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use('/pdfs/COSMITET', express.static(pdfDirectory));

// Endpoint para obtener la lista de archivos PDF
app.get('/api/pdfs/COSMITET', (req, res) => {
  const fs = require('fs');
  fs.readdir(pdfDirectory, (err, files) => {
    if (err) {
      res.status(500).send('Error al buscar el directorio');
    } else {
      const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
      res.json(pdfFiles);
    }
  });
});

// Endpoint para subir archivos PDF
app.post('/api/upload/COSMITET', upload.single('file'), (req, res) => {
  res.status(200).send('File uploaded successfully');
});

// Función para obtener el ID del sensor a partir del nombre del sensor
const getSensorIdByName = async (sensorName) => {
  try {
    const response = await axios.get('https://192.168.200.158/api/table.json', {
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
    console.error('Error fetching sensors from PRTG API:', error.message);
    return null;
  }
};

/*
// Función para obtener datos del sensor y guardarlos en MongoDB
const fetchDataFromSensor = async (sensorId) => {
  try {
    const response = await axios.get(`http://192.168.200.155:8080/prtg-api/${sensorId}`);
    const data = response.data;
    const sensorData = new SensorData({ sensorId, data });
    await sensorData.save();
    console.log(`Data saved for sensor ${sensorId}`);
  } catch (error) {
    console.error(`Error fetching data for sensor ${sensorId}:`, error.message);
  }
};

// Lista de IDs de sensores
const sensorIds = [2200, 2195, 2197, 2196, 2198, 2136, 2199, 2201, 2137, 2211, 2167, 2168, 2189, 2169, 2170, 2139, 2144, 2142, 2190, 2156, 2166, 2165, 2134, 2192, 2155, 2143, 2174, 2141, 2140, 2175, 2145, 2207, 2212, 2204, 2203, 2162, 2161, 2160, 2205, 2159, 2158, 2184, 2157, 2179, 2177, 2183, 2208, 2206, 2187, 2186, 2185, 2188, 2164, 2209, 2163, 2146, 2193, 2191, 2147, 2180, 2176, 2153, 2151, 2149, 2182, 2181, 2194, 2171, 2148, 2173, 2129, 2154, 2152, 2150, 2128]; // Añade más IDs según sea necesario
*/

// Función para obtener datos del sensor y guardarlos en MongoDB
const fetchDataFromSensor = async (sensorName) => {
  try {
    const sensorId = await getSensorIdByName(sensorName);
    if (!sensorId) {
      throw new Error(`Sensor with name ${sensorName} not found`);
    }
    const response = await axios.get(`http://192.168.200.155:8080/prtg-api/${sensorId}`);
    const data = response.data;
    const sensorData = new SensorData({ sensorId, data });
    await sensorData.save();
    console.log(`Data saved for sensor ${sensorName}`);
  } catch (error) {
    console.error(`Error fetching data for sensor ${sensorName}:`, error.message);
  }
};

// Lista de Nombres de sensores
const sensorNames = [
  //COSMITET
  'COCLOCOSMIAP02', 'COCLOCOSMIAP05', 'COCLOCOSMIAP06', 'COCLOCOSMIAP07',
  'COCLOCOSMIAST03', 'COCLOCOSMIAST04',
  'COCLOCOSMIBD01', 'COCLOCOSMIBD02', 'COCLOCOSMIBD03', 'COCLOCOSMIBD04',
  'COCLOCOSMIBK01', 'COCLOCOSMIDES01', 'COCLOCOSMIFI01', 'COCLOCOSMIREP02', 'COCLOCOSMIREP03', 'COCLOCOSMISTG01',

  //DUARTE
  'COCLOCDUARAP01', 'COCLOCDUARAST01', 'COCLOCDUAREP02', 'COCLOCDUARFI01', 'COCLOCDUARST02',
  'COCLOCDUARTBD01', 'COCLOCDUARTBD02', 'COCLOCDUARTBK01', 'COCLOCDUARTSTG01',

  //DUANA
  'COCLODUANAAP01', 'COCLODUANADB05', 'COCLODUANADU01', 'COCLODUANAP02', 'COCLODUANAP03',

  //COSMITET
  'COCLOESECAP02', 'COCLOESECAP03', 'COCLOESECAP04', 'COCLOESECAP05', 'COCLOESECAP06', 'COCLOESECAP07', 'COCLOESECAP08', 'COCLOESECAP09',
  'COCLOESECAP10', 'COCLOESECAP11', 'COCLOESECAP12', 'COCLOESECAP13', 'COCLOESECAP14', 'COCLOESECAP15', 'COCLOESECAP16', 'COCLOESECAP17',
  'COCLOESECAP18', 'COCLOESECAP19', 'COCLOESECAP20', 'COCLOESECAP21', 'COCLOESECAP22', 'COCLOESECAP23', 'COCLOESECDA01',

  //PEÑITAS
  'COCLOPENIAP01', 'COCLOPENIAP02', 'COCLOPENIAP03', 'COCLOPENIAP04', 'COCLOPENIAST02', 'COCLOPENIBD02', 'COCLOPENIBD03', 'COCLOPENIBK01',
  'COCLOPENIFI01', 'COCLOPENIREP01', 'COCLOPENISTG01',

  //ROCHE
  'COCLOROCHEAP01',

  //SSOFIA
  'COCLOSSFIAAP01', 'COCLOSSFIABD01', 'COCLOSSFIABD02', 'COCLOSSFIABD03', 'COCLOSSFIABK01', 'COCLOSSFIADES01', 'COCLOSSFIAREP01',
  'COCLOSSFIAST02', 'COCLOSSFIASTG01', 'COCLOSSOFIAAP02',

  //CAMARACC

  // Añade más nombres según sea necesario
];

// Tarea cron para obtener datos de los sensores cada minuto
cron.schedule('* * * * *', () => {
  console.log('Fetching data for sensors...');
  sensorNames.forEach((sensorName) => fetchDataFromSensor(sensorName));
});

// Ruta para obtener datos directamente desde la API de PRTG por el nombre
app.get('/prtg-api/name/:sensorName', async (req, res) => {
  const sensorName = req.params.sensorName;
  try {
    const sensorId = await getSensorIdByName(sensorName);
    if (!sensorId) {
      return res.status(404).json({ error: 'Sensor not found' });
    }

    const response = await axios.get('https://192.168.200.158/api/table.json', {
      params: {
        content: 'channels',
        columns: 'objid,channel,name,lastvalue',
        id: sensorId,
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

    const channelData = response.data.channels || [];
    res.json({ channels: channelData });
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});

// Ruta para obtener datos directamente desde la API de PRTG
app.get('/prtg-api/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId;
  try {
    const response = await axios.get('https://192.168.200.158/api/table.json', {
      params: {
        content: 'channels',
        columns: 'objid,channel,name,lastvalue',
        id: sensorId,
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

    const channelData = response.data.channels || [];
    res.json({ channels: channelData });
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});

// Ruta para obtener datos del sensor desde MongoDB
app.get('/sensor-data/:sensorId', async (req, res) => {
  const { sensorId } = req.params;
  const { start, end } = req.query;

  const query = { sensorId };

  if (start) query.timestamp = { $gte: new Date(start) };
  if (end) {
    if (!query.timestamp) query.timestamp = {};
    query.timestamp.$lte = new Date(end);
  }

  try {
    const sensorData = await SensorData.find(query).sort({ timestamp: -1 }).limit(100000); // Incrementar el límite si es necesario
    res.json(sensorData);
  } catch (error) {
    console.error('Error fetching sensor data:', error.message);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

// Ruta para obtener información de un sensor específico por su ID
app.get('/sensor/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId;
  try {
    const response = await axios.get('https://192.168.200.158/api/table.json', {
      params: {
        content: 'sensors',
        columns: 'objid,channel,name,lastvalue,probe,group,device,status,message,priority,favorite',
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
    const sensor = sensors.find(s => s.objid == sensorId);

    if (sensor) {
      res.json(sensor);
    } else {
      res.status(404).json({ error: 'Sensor not found' });
    }
  } catch (error) {
    console.error('Error fetching sensor from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch sensor from PRTG API' });
  }
});

// Ruta para obtener información de los canales de un sensor específico por su ID
app.get('/canales/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId;
  try {
    const response = await axios.get('https://192.168.200.158/api/table.json', {
      params: {
        content: 'channels',
        columns: 'objid,channel,name,lastvalue',
        id: sensorId, // Especificar el ID del sensor para obtener sus canales
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

    const channels = response.data.channels || [];
    if (channels.length > 0) {
      res.json(channels);
    } else {
      res.status(404).json({ error: 'No channels found for the given sensor ID' });
    }
  } catch (error) {
    console.error('Error fetching channels from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch channels from PRTG API' });
  }
});

// Sincronizar la base de datos de roles y usuarios
const db = require('./app/models');
const Role = db.role;

db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  initial();
});

// Inicializar los roles en la base de datos
function initial() {
  Role.findAll()
    .then(roles => {
      if (roles.length === 0) {
        Role.create({ id: 1, name: 'usuario' });
        Role.create({ id: 2, name: 'moderador' });
        Role.create({ id: 3, name: 'administrador' });
        Role.create({ id: 4, name: 'administrador-ESECENTRO' });
        Role.create({ id: 5, name: 'administrador-CAMARA-Y-COMERCIO' });
        Role.create({ id: 6, name: 'administrador-COSMITET' });
        Role.create({ id: 7, name: 'administrador-DUANA' });
        Role.create({ id: 8, name: 'administrador-OZONO' });
        Role.create({ id: 9, name: 'administrador-ROCHE' });
      } else {
        console.log('Roles ya existentes.');
      }
    })
    .catch(err => {
      console.error('Error al revisar los roles:', err);
    });
}

// Rutas de autenticación y usuario
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Configuración del puerto y escucha de solicitudes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}.`);
});
