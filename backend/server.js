// Importar módulos y configuraciones
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
const http = require('http');
const { Server } = require('socket.io');
const winston = require('winston');
const pdfRoute = require('./pdfRoutes');
const env = require('dotenv')
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Importar modelos
const SensorData = require('./models/SensorData');
const User = require('./models/user.model');
const VmData = require('./models/VmData');


// Configurar y crear instancias de servidor y Socket.IO
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración de CORS y body parser
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(express.json());
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(pdfRoute)

let secret = null;

// Genera el secreto y envía el QR code al frontend
app.get('/generate', (req, res) => {
  secret = speakeasy.generateSecret({ name: "MyApp" });
  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.json({ secret: secret.base32, qr_code: data_url });
  });
});

// Verifica el token ingresado por el usuario
app.post('/verify', (req, res) => {
  const { token } = req.body;
  const verified = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token
  });
  if (verified) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

// Configuración de directorio para archivos PDF
const pdfDirectory = path.join(__dirname, 'pdfs/COSMITET');

// Configuración de Winston para los logs
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' })
  ],
});

// Emitir eventos de logs en tiempo real
const logEvent = (message) => {
  const logEntry = { message, timestamp: new Date() };
  logger.info(logEntry);
  io.emit('log', logEntry);
};

env.config()

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/sensorData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB');
  logEvent('Conectado a MongoDB');
});

// Middleware para registrar logs
app.use((req, res, next) => {
  // Excluir rutas específicas de ser registradas en los logs
  const excludedPaths = ['/logs', '/prtg-api', '/sensor-data', '/sensor', '/canales', '/socket.io', '/api/test', '/api/pdfs' ]; // Puedes añadir más rutas si es necesario
  if (!excludedPaths.some(path => req.url.startsWith(path))) {
    logEvent(`Request: ${req.method} ${req.url}`);
  }
  next();
});

// Configuración de autenticación vCenter
const vcenterUrl = 'https://10.80.0.31';
const username = 'monprtg@vsphere.local';
const password = 'Est3rnocl1d0.2024*.*';

// Configurar agente HTTPS para aceptar certificados autofirmados
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Ignorar el certificado autofirmado
});

let passhash = null; // Variable global para almacenar el passhash

// Middleware para registrar la solicitud y la autenticación
app.use(async (req, res, next) => {
  if (req.path.startsWith('/auth')) {
    // Log de autenticación
    logEvent(`Intento de autenticación para el usuario ${req.body.username}`);
  } else {
    // Log de solicitud
    const user = req.user; // assuming user is attached to request by your authentication middleware
    if (user) {
      logEvent(`Usuario ${user.username} (${user.role}) realizó la solicitud ${req.method} ${req.path}`);
    }
  }
  next();
});

// Función vcenter para autenticarse y obtener el session ID
async function getSessionId() {
  const authResponse = await axios.post(`${vcenterUrl}/rest/com/vmware/cis/session`, {}, {
    auth: {
      username,
      password
    },
    httpsAgent: httpsAgent
  });
  return authResponse.data.value;
}

// Función para obtener detalles de una VM
async function getVmDetails(vmId, sessionId) {
  const detailsResponse = await axios.get(`${vcenterUrl}/rest/vcenter/vm/${vmId}`, {
    headers: {
      'vmware-api-session-id': sessionId
    },
    httpsAgent: httpsAgent
  });
  return detailsResponse.data.value;
}

// Función para obtener detalles completos de hardware de una VM
async function getVmHardwareDetails(vmId, sessionId) {
  const response = await axios.get(`${vcenterUrl}/rest/vcenter/vm/${vmId}/hardware`, {
    headers: {
      'vmware-api-session-id': sessionId,
    },
    httpsAgent: httpsAgent
  });
  return response.data.value;
}

// Función para obtener detalles de red de una VM
async function getVmNetworkDetails(vmId, sessionId) {
  const response = await axios.get(`${vcenterUrl}/rest/vcenter/vm/${vmId}/hardware/ethernet`, {
    headers: {
      'vmware-api-session-id': sessionId,
    },
    httpsAgent: httpsAgent
  });
  return response.data.value;
}

// Función para obtener detalles de almacenamiento de una VM
async function getVmStorageDetails(vmId, sessionId) {
  const response = await axios.get(`${vcenterUrl}/rest/vcenter/vm/${vmId}/hardware/disk`, {
    headers: {
      'vmware-api-session-id': sessionId,
    },
    httpsAgent: httpsAgent
  });
  return response.data.value;
}

// Función para obtener snapshots de una VM
async function getVmSnapshots(vmId, sessionId) {
  const response = await axios.get(`${vcenterUrl}/rest/vcenter/vm/${vmId}/snapshot`, {
    headers: {
      'vmware-api-session-id': sessionId,
    },
    httpsAgent: httpsAgent
  });
  return response.data.value;
}

// Rutas de la aplicación

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido esta es la aplicación CONSULNETWORKS.' });
});

// Ruta para almacenar los datos de las VMs
app.post('/store-vm-data', async (req, res) => {
  try {
    const { running, stopped, suspended, timestamp } = req.body;

    // Verificar si todos los valores son 0
    if (running === 0 && stopped === 0 && suspended === 0) {
      return res.status(400).send('No se almacenan datos porque todos los valores son 0');
    }

    // Obtener el último documento almacenado
    const lastEntry = await VmData.findOne().sort({ timestamp: -1 });

    // Verificar si los datos entrantes son diferentes a los últimos almacenados
    if (lastEntry && lastEntry.running === running && lastEntry.stopped === stopped && lastEntry.suspended === suspended) {
      return res.status(400).send('No se almacenan datos porque son iguales a los últimos datos almacenados');
    }

    const vmData = new VmData({ running, stopped, suspended, timestamp: new Date(timestamp) });
    await vmData.save();
    res.status(200).send('Datos de las VMs almacenados correctamente');
  } catch (error) {
    res.status(500).send('Error al almacenar los datos de las VMs');
  }
});

// Ruta para obtener los datos de las VMs
app.get('/get-vm-data', async (req, res) => {
  try {
    const vmData = await VmData.find().sort({ timestamp: -1 });
    res.status(200).json(vmData);
  } catch (error) {
    res.status(500).send('Error al obtener los datos de las VMs');
  }
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

app.get('/vms', async (req, res) => {
  try {
    const sessionId = await getSessionId();

    const vmsResponse = await axios.get(`${vcenterUrl}/rest/vcenter/vm`, {
      headers: {
        'vmware-api-session-id': sessionId
      },
      httpsAgent: httpsAgent
    });

    // Obtener detalles adicionales de cada VM
    const vmDetailsPromises = vmsResponse.data.value.map(vm => getVmDetails(vm.vm, sessionId));
    const vmDetails = await Promise.all(vmDetailsPromises);

    // Combinar la información básica con los detalles
    const combinedData = vmsResponse.data.value.map((vm, index) => ({
      ...vm,
      ...vmDetails[index]
    }));

    res.json(combinedData);
    logEvent('Lista de VMs obtenida');
  } catch (error) {
    console.error('Error fetching VMs:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    logEvent(`Error al obtener la lista de VMs: ${error.message}`);
    res.status(500).send('Error fetching VMs');
  }
});

// Ruta para obtener los detalles completos de las VMs
/*app.get('/vms', async (req, res) => {
  try {
    const sessionId = await getSessionId();

    // Obtener información básica de todas las VMs
    const vmsResponse = await axios.get(`${vcenterUrl}/rest/vcenter/vm`, {
      headers: {
        'vmware-api-session-id': sessionId,
      },
      httpsAgent,
    });

    // Obtener detalles adicionales de cada VM
    const vmDetailsPromises = vmsResponse.data.value.map(async (vm) => {
      const hardwareDetails = await getVmHardwareDetails(vm.vm, sessionId);
      const networkDetails = await getVmNetworkDetails(vm.vm, sessionId);
      const storageDetails = await getVmStorageDetails(vm.vm, sessionId);
      const snapshots = await getVmSnapshots(vm.vm, sessionId);
      const vmDetails = await getVmDetails(vm.vm, sessionId);

      return {
        ...vm,
        hardware: hardwareDetails,
        network: networkDetails,
        storage: storageDetails,
        snapshots: snapshots,
        vmDetails: vmDetails,
      };
    });

    const detailedVms = await Promise.all(vmDetailsPromises);

    res.json(detailedVms);
    console.log('Lista de VMs obtenida con detalles completos');
  } catch (error) {
    console.error('Error fetching VMs:', error.message);
    res.status(500).send('Error fetching VMs');
  }
});*/

// Ruta para encender una VM
app.post('/vms/:vmId/power-on', async (req, res) => {
  let vmId;  // Definir vmId fuera del bloque try
  try {
    const sessionId = await getSessionId();
    vmId = req.params.vmId;  // Asignar vmId dentro del bloque try
    await axios.post(`${vcenterUrl}/rest/vcenter/vm/${vmId}/power/start`, {}, {
      headers: {
        'vmware-api-session-id': sessionId
      },
      httpsAgent: httpsAgent
    });
    res.send('VM powered on successfully');
    logEvent(`VM ${vmId} encendida`);
  } catch (error) {
    console.error('Error powering on VM:', error.message);
    logEvent(`Error al encender la VM ${vmId}: ${error.message}`);
    res.status(500).send('Error powering on VM');
  }
});

// Ruta para apagar una VM
app.post('/vms/:vmId/power-off', async (req, res) => {
  let vmId;  // Definir vmId fuera del bloque try
  try {
    const sessionId = await getSessionId();
    vmId = req.params.vmId;  // Asignar vmId dentro del bloque try
    await axios.post(`${vcenterUrl}/rest/vcenter/vm/${vmId}/power/stop`, {}, {
      headers: {
        'vmware-api-session-id': sessionId
      },
      httpsAgent: httpsAgent
    });
    res.send('VM powered off successfully');
    logEvent(`VM ${vmId} apagada`);
  } catch (error) {
    console.error('Error powering off VM:', error.message);
    logEvent(`Error al apagar la VM ${vmId}: ${error.message}`);
    res.status(500).send('Error powering off VM');
  }
});

// Ruta para suspender una VM
app.post('/vms/:vmId/suspend', async (req, res) => {
  let vmId;  // Definir vmId fuera del bloque try
  try {
    const sessionId = await getSessionId();
    vmId = req.params.vmId;  // Asignar vmId dentro del bloque try
    await axios.post(`${vcenterUrl}/rest/vcenter/vm/${vmId}/power/suspend`, {}, {
      headers: {
        'vmware-api-session-id': sessionId
      },
      httpsAgent: httpsAgent
    });
    res.send('VM suspended successfully');
    logEvent(`VM ${vmId} suspendida`);
  } catch (error) {
    console.error('Error suspending VM:', error.message);
    logEvent(`Error al suspender la VM ${vmId}: ${error.message}`);
    res.status(500).send('Error suspending VM');
  }
});


/*// Ruta para resetear una VM
app.post('/vms/:vmId/reset', async (req, res) => {
  try {
    const sessionId = await getSessionId();
    const { vmId } = req.params;
    await axios.post(`${vcenterUrl}/rest/vcenter/vm/${vmId}/power/reset`, {}, {
      headers: {
        'vmware-api-session-id': sessionId
      },
      httpsAgent: httpsAgent
    });
    res.send('VM reset successfully');
    logEvent(`VM ${vmId} reiniciada`);
  } catch (error) {
    console.error('Error resetting VM:', error.message);
    logEvent(`Error al reiniciar la VM ${vmId}: ${error.message}`);
    res.status(500).send('Error resetting VM');
  }
});

// Ruta para apagar el sistema operativo invitado de una VM
app.post('/vms/:vmId/shutdown-guest', async (req, res) => {
  try {
    const sessionId = await getSessionId();
    const { vmId } = req.params;
    await axios.post(`${vcenterUrl}/rest/vcenter/vm/${vmId}/guest/power/stop`, {}, {
      headers: {
        'vmware-api-session-id': sessionId
      },
      httpsAgent: httpsAgent
    });
    res.send('VM guest OS shut down successfully');
  } catch (error) {
    console.error('Error shutting down guest OS:', error.message);
    res.status(500).send('Error shutting down guest OS');
  }
});

// Ruta para reiniciar el sistema operativo invitado de una VM
app.post('/vms/:vmId/restart-guest', async (req, res) => {
try {
  const sessionId = await getSessionId();
  const { vmId } = req.params;
  await axios.post(`${vcenterUrl}/rest/vcenter/vm/${vmId}/guest/power/reboot`, {}, {
    headers: {
      'vmware-api-session-id': sessionId
    },
    httpsAgent: httpsAgent
  });
  res.send('VM guest OS restarted successfully');
} catch (error) {
  console.error('Error restarting guest OS:', error.message);
  res.status(500).send('Error restarting guest OS');
}
});*/

// Similarmente, puedes agregar endpoints para suspender, hibernar y reiniciar

// Rutas para manejar archivos PDF
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
      logEvent('Lista de archivos PDF obtenida');
    }
  });
});

// Endpoint para subir archivos PDF
app.post('/api/upload/COSMITET', upload.single('file'), (req, res) => {
  res.status(200).send('El archivo ha subido correctamente');
  logEvent(`Archivo PDF subido: ${req.file.originalname}`);
});

// Función para obtener el ID del sensor a partir del nombre del sensor
const getSensorIdByName = async (sensorName) => {
  try {
    const response = await axios.get('https://192.168.200.158/api/table.json', {
      params: {
        content: 'sensors',
        columns: 'objid,name',
        username: 'HORUS',
        password: 'Bkirhen1',
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
    console.error('Error al recuperar sensores de la API de PRTG:', error.message);
    return null;
  }
};

// Función para obtener datos del sensor y guardarlos en MongoDB
const fetchDataFromSensor = async (sensorName) => {
  try {
    const sensorId = await getSensorIdByName(sensorName);
    if (!sensorId) {
      throw new Error(`Sensor con nombre ${sensorName} no disponible`);
    }
    const response = await axios.get(`http://192.168.200.155:8081/prtg-api/${sensorId}`);
    const data = response.data;
    const sensorData = new SensorData({ sensorId, data });
    await sensorData.save();
    console.log(`Datos almacenados para sensor ${sensorName}`);
  } catch (error) {
    console.error(`Error al obtener datos para el sensor ${sensorName}:`, error.message);
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
  'COCLOESECAP18', 'COCLOESECAP19', 'COCLOESECAP20', 'COCLOESECAP21', 'COCLOESECAP22', 'COCLOESECAP23', 'COCLOESECAP24', 'COCLOESECDA01',

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
        username: 'HORUS',
        password: 'Bkirhen1',
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
        username: 'HORUS',
        password: 'Bkirhen1',
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
        username: 'HORUS',
        password: 'Bkirhen1',
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
        username: 'HORUS',
        password: 'Bkirhen1',
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

// Función para obtener datos del sensor y guardarlos en MongoDB (PRTG 192.168.200.160)
const fetchDataFromSensorAlt = async (sensorName) => {
  try {
    const sensorId = await getSensorIdByNameAlt(sensorName);
    if (!sensorId) {
      throw new Error(`Sensor con nombre ${sensorName} no disponible`);
    }
    const response = await axios.get(`http://192.168.200.155:8081/prtg-api-alt/${sensorId}`);
    const data = response.data;
    const sensorData = new SensorData({ sensorId, data });
    await sensorData.save();
    console.log(`Datos almacenados para sensor ${sensorName} (Alt)`);
  } catch (error) {
    console.error(`Error al obtener datos para el sensor ${sensorName} (Alt):`, error.message);
  }
};

// Lista de Nombres de sensores específicos para 192.168.200.160
const sensorNamesAlt = [
  'COCLOCCCDEV00', 'COCLOCCCDEVL02', 'COCLOCCCDEVL35', 'COCLOCCCDEVL98', 'COCLOCCCDEVW36', 'COCLOCCCPRDB01', 'COCLOCCCPRDB02',
  'COCLOCCCPRDB03', 'COCLOCCCPRDB06', 'COCLOCCCPRDL01', 'COCLOCCCPRDL02', 'COCLOCCCPRDL03', 'COCLOCCCPRDL06', 'COCLOCCCPRDL07',
  'COCLOCCCPRDL08', 'COCLOCCCPRDL09', 'COCLOCCCPRDL10', 'COCLOCCCPRDL15', 'COCLOCCCPRDL16', 'COCLOCCCPRDL17', 'COCLOCCCPRDL18',
  'COCLOCCCPRDL37', 'COCLOCCCPRDL41', 'COCLOCCCPRDL48', 'COCLOCCCPRDL49', 'COCLOCCCPRDW10', 'COCLOCCCPRDW22', 'COCLOCCCPRDW23',
  'COCLOCCCPRDW24', 'COCLOCCCPRDW25', 'COCLOCCCPRDW30', 'COCLOCCCPRDW35', 'COCLOCCCPRDW48', 'COCLOCCCPRDW97', 'COCLOCCCPRDW98',
  'COCLOCCCTST00', 'COCLOCCCTST01', 'COCLOCCCTST02', 'COCLOCCCTST03', 'COCLOCCCTST06', 'COCLOCCCTST07', 'COCLOCCCTST09', 'COCLOCCCTST10',
  'COCLOCCCTST11', 'COCLOCCCTST15', 'COCLOCCCTSTL01', 'COCLOCCCTSTL02', 'COCLOCCCTSTL03', 'COCLOCCCTSTL06', 'COCLOCCCTSTL07', 'COCLOCCCTSTL09',
  'COCLOCCCTSTL10', 'COCLOCCCTSTL15', 'COCLOCCCTSTL41', 'COCLOCCCDES48', 'COCLOCERTORI01', 'COCLOCERTORI02', 'COCLOSERTORIBD01'
];

// Tarea cron para obtener datos de los sensores cada minuto (PRTG 192.168.200.160)
cron.schedule('* * * * *', () => {
  console.log('Fetching data for sensors (Alt)...');
  sensorNamesAlt.forEach((sensorName) => fetchDataFromSensorAlt(sensorName));
});

// Ruta para obtener datos directamente desde la API de PRTG por el nombre (PRTG 192.168.200.160)
app.get('/prtg-api-alt/name/:sensorName', async (req, res) => {
  const sensorName = req.params.sensorName;
  try {
    const sensorId = await getSensorIdByNameAlt(sensorName);
    if (!sensorId) {
      return res.status(404).json({ error: 'Sensor not found (Alt)' });
    }

    const response = await axios.get('https://192.168.200.160/api/table.json', {
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
    console.error('Error fetching data from PRTG API (Alt):', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API (Alt)' });
  }
});

// Ruta para obtener datos directamente desde la API de PRTG (PRTG 192.168.200.160)
app.get('/prtg-api-alt/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId;
  try {
    const response = await axios.get('https://192.168.200.160/api/table.json', {
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
    console.error('Error fetching data from PRTG API (Alt):', error.message);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API (Alt)' });
  }
});

// Ruta para obtener información de un sensor específico por su ID (PRTG 192.168.200.160)
app.get('/sensor-alt/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId;
  try {
    const response = await axios.get('https://192.168.200.160/api/table.json', {
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
      res.status(404).json({ error: 'Sensor not found (Alt)' });
    }
  } catch (error) {
    console.error('Error fetching sensor from PRTG API (Alt):', error.message);
    res.status(500).json({ error: 'Failed to fetch sensor from PRTG API (Alt)' });
  }
});

// Ruta para obtener información de los canales de un sensor específico por su ID (PRTG 192.168.200.160)
app.get('/canales-alt/:sensorId', async (req, res) => {
  const sensorId = req.params.sensorId;
  try {
    const response = await axios.get('https://192.168.200.160/api/table.json', {
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
      res.status(404).json({ error: 'No channels found for the given sensor ID (Alt)' });
    }
  } catch (error) {
    console.error('Error fetching channels from PRTG API (Alt):', error.message);
    res.status(500).json({ error: 'Failed to fetch channels from PRTG API (Alt)' });
  }
});



// Endpoint para obtener logs (sin real-time)
app.get('/logs', (req, res) => {
  const fs = require('fs');
  fs.readFile('logs/app.log', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer los logs');
    } else {
      const logs = data.split('\n').filter(line => line).map(line => JSON.parse(line));
      res.json(logs);
    }
  });
});

// Sincronizar la base de datos de roles y usuarios
const db = require('./models');
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
        Role.create({ id: 10, name: 'moderador-CAMARA-Y-COMERCIO' });
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
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}.`);
});

// Configurar Socket.IO para manejar conexiones
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});