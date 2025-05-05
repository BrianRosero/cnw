// Importar módulos y configuraciones
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
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
const httpsAgent = require('./config/httpsAgent');
const { spawn } = require("child_process");

// Importar modelos
const SensorData = require('./models/SensorData');
const VmData = require('./models/VmData');

// Importar datos vsphere
const {
  authenticate,
  getClusters,
  getDatacenters,
  getHosts,
  getAllVirtualMachines,
  getVirtualMachines,
  getDatastores,
  getDatastoreDetails,
  getNetworks,
  getEvents,
  getPerformance,
  getVmDetailss,
  getClusterMetrics,
} = require('./controllers/vcenter');

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

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt requerido' });
  }

  try {
    const response = await fetch('http://192.168.200.155:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:1b',
        prompt: prompt,
        stream: false
      })
    });

    const data = await response.json();
    res.json({ response: data.response });
  } catch (error) {
    console.error('Error en la API de Ollama:', error);
    res.status(500).json({ error: 'Error al obtener respuesta de la IA' });
  }
});


let cachedDataHosts = null;
let lastUpdatedHosts = null;

// Función para ejecutar el script Python y obtener los datos de los hosts
const updateHostsData = () => {
  const pythonProcess = spawn("python", ["./vcenter/get_hosts.py"]);

  let data = "";
  let error = "";

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    error += chunk.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        cachedDataHosts = JSON.parse(data);
        lastUpdatedHosts = new Date();
      } catch (parseError) {
        console.error("Error al parsear datos de Python:", parseError.message);
      }
    } else {
      console.error("Error al ejecutar el script de Python:", error);
    }
  });
};

// Ejecutar cada 5 segundos para mantener datos actualizados
setInterval(updateHostsData, 5000);
updateHostsData();

// Nueva ruta para obtener los datos de los hosts
app.get("/vcenter/hosts", (req, res) => {
  if (cachedDataHosts) {
    res.status(200).json({ data: cachedDataHosts, lastUpdatedHosts });
  } else {
    res.status(503).json({ error: "Datos no disponibles. Intenta nuevamente." });
  }
});

let cachedDataHosts1 = null;
let lastUpdatedHosts1 = null;

// Función para ejecutar el script Python y obtener los datos de los hosts
const updateHostsData1 = () => {
  const pythonProcess = spawn("python", ["./vcenter/get_hosts1.py"]);

  let data = "";
  let error = "";

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    error += chunk.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        cachedDataHosts1 = JSON.parse(data);
        lastUpdatedHosts1 = new Date();
      } catch (parseError) {
        console.error("Error al parsear datos de Python:", parseError.message);
      }
    } else {
      console.error("Error al ejecutar el script de Python:", error);
    }
  });
};

// Ejecutar cada 5 segundos para mantener datos actualizados
setInterval(updateHostsData1, 5000);
updateHostsData1();

// Nueva ruta para obtener los datos de los hosts
app.get("/vcenter/hosts1", (req, res) => {
  if (cachedDataHosts1) {
    res.status(200).json({ data: cachedDataHosts1, lastUpdatedHosts1 });
  } else {
    res.status(503).json({ error: "Datos no disponibles. Intenta nuevamente." });
  }
});

const VmDataGlake = require("./models/VmDataGlake");

let cachedDataVms = null;
let cachedVmsHistory = null;
let lastUpdatedVms = null;
let isUpdating = false;

const updateVmsData = async () => {
  if (isUpdating) {
    console.warn("⚠️ Ya hay una actualización en proceso, omitiendo...");
    return;
  }
  isUpdating = true;

  try {
    const pythonProcess = spawn("python", ["./vcenter/get_vms.py"]);
    let data = "", error = "";

    pythonProcess.stdout.on("data", (chunk) => (data += chunk.toString()));
    pythonProcess.stderr.on("data", (chunk) => (error += chunk.toString()));

    pythonProcess.on("close", async (code) => {
      isUpdating = false; isUpdating = false;
      if (code === 0) {
        try {
          const parsedData = JSON.parse(data);
          if (!parsedData || parsedData.length === 0) throw new Error("No se recibieron datos.");
          const formattedData = parsedData.map((vm) => ({
            name: vm.name,
            instance_uuid: vm.instance_uuid,
            cpu_usage_mhz: vm.cpu_usage_mhz,
            memory_usage_mb: vm.memory_usage_mb,
            storage_usage_gb: vm.disks.reduce(
              (sum, disk) => sum + (disk.capacity_gb || 0),
              0
            ),
            cpu_cores: vm.cpu_cores || 0,
            cores_per_socket: vm.cores_per_socket || 0,
            memory_gb: vm.memory_gb || 0,
            power_state: vm.power_state || "Desconocido",
            host: vm.host || "Desconocido",
            disks: (vm.disks || []).map((disk) => ({
              name: disk.name || "Desconocido",
              capacity_gb: disk.capacity_gb || 0,
            })),
            guest_info: {
              hostname: vm.guest_info.hostname || "Desconocido",
              os_fullname: vm.guest_info.os_fullname || "Desconocido",
              ip_addresses: vm.guest_info.ip_addresses || [],
              tools_status: vm.guest_info.tools_status || "Desconocido",
              tools_version: vm.guest_info.tools_version || "Desconocido",
            },
            timestamp: new Date(),
          }));

          await VmDataGlake.insertMany(formattedData, { ordered: false }).catch((err) =>
            console.error("❌ Error al insertar datos:", err.message)
          );

          cachedDataVms = formattedData;
          lastUpdatedVms = new Date();
          console.log("✅ Datos actualizados correctamente y guardados en caché.");
        } catch (parseError) {
          console.error("❌ Error al parsear datos:", parseError.message);
        }
      } else {
        console.error("❌ Error al ejecutar el script:", error);
      }
    });
  } catch (err) {
    isUpdating = false;
    console.error("❌ Error general en updateVmsData:", err.message);
  }
};

const updateVmsHistoryCache = async () => {
  try {
    cachedVmsHistory = await VmDataGlake.find()
      .sort({ timestamp: -1 })
      .limit(5000)
      .lean();
    console.log("✅ Historial de VMs actualizado en caché.");
  } catch (error) {
    console.error("❌ Error al actualizar caché de historial:", error.message);
  }
};

// 🚀 Nueva ruta con caché para historial
app.get("/vcenter/vms-db", async (req, res) => {
  if (cachedVmsHistory) {
    res.status(200).json({ data: cachedVmsHistory });
    updateVmsHistoryCache(); // Actualizar caché en segundo plano
  } else {
    await updateVmsHistoryCache();
    res.status(200).json({ data: cachedVmsHistory || [] });
  }
});

// Responder siempre desde caché
app.get("/vcenter/vms", (req, res) => {
  if (cachedDataVms) {
    res.status(200).json({ data: cachedDataVms, lastUpdatedVms });
  } else {
    res.status(503).json({ error: "Datos no disponibles. Intenta nuevamente." });
  }
});

setInterval(updateVmsData, 50000);
setInterval(updateVmsHistoryCache, 50000);
updateVmsData();
updateVmsHistoryCache();




const VmDataCNWS = require("./models/VmDataCNWS");

let cachedDataVms1 = null;
let cachedVmsHistory1 = null;
let lastUpdatedVms1 = null;
let isUpdating1 = false;

// Función para ejecutar el script Python y obtener los datos de los hosts
const updateVmsData1 = async () => {
  if (isUpdating1) {
    console.warn("⚠️ Ya hay una actualización en proceso, omitiendo...");
    return;
  }
  isUpdating1 = true;

  try {
    const pythonProcess = spawn("python", ["./vcenter/get_vms1.py"]);
    let data = "", error = "";

  pythonProcess.stdout.on("data", (chunk) => (data += chunk.toString()));
  pythonProcess.stderr.on("data", (chunk) => (error += chunk.toString()));

  pythonProcess.on("close", async (code) => {
    isUpdating1 = false;
    if (code === 0) {
      try {
        const parsedData = JSON.parse(data);
        if (!parsedData || parsedData.length === 0) throw new Error("No se recibieron datos.");

        const formattedData = parsedData.map((vm) => ({
          name: vm.name,
          instance_uuid: vm.instance_uuid,
          cpu_usage_mhz: vm.cpu_usage_mhz,
          memory_usage_mb: vm.memory_usage_mb,
          storage_usage_gb: vm.disks.reduce(
            (sum, disk) => sum + (disk.capacity_gb || 0),
            0
          ),
          cpu_cores: vm.cpu_cores || 0,
          cores_per_socket: vm.cores_per_socket || 0,
          memory_gb: vm.memory_gb || 0,
          power_state: vm.power_state || "Desconocido",
          host: vm.host || "Desconocido",
          disks: (vm.disks || []).map((disk) => ({
            name: disk.name || "Desconocido",
            capacity_gb: disk.capacity_gb || 0,
          })),
          guest_info: {
            hostname: vm.guest_info.hostname || "Desconocido",
            os_fullname: vm.guest_info.os_fullname || "Desconocido",
            ip_addresses: vm.guest_info.ip_addresses || [],
            tools_status: vm.guest_info.tools_status || "Desconocido",
            tools_version: vm.guest_info.tools_version || "Desconocido",
          },
          timestamp: new Date(),
        }));

        await VmDataCNWS.insertMany(formattedData, { ordered: false }).catch((err) =>
          console.error("❌ Error al insertar datos:", err.message)
        );

        cachedDataVms1 = parsedData;
        lastUpdatedVms1 = new Date();
        console.log("✅ Datos actualizados correctamente y guardados en caché.");
      } catch (parseError) {
        console.error("Error al parsear datos de Python:", parseError.message);
      }
    } else {
      console.error("Error al ejecutar el script de Python:", error);
    }
  });
  } catch (err) {
    isUpdating1 = false;
    console.error("Error general en updateVmsData1:", err.message);
  }
};


const updateVmsHistoryCache1 = async () => {
  try {
    cachedVmsHistory1 = await VmDataCNWS.find()
      .sort({ timestamp: -1 })
      .limit(5000)
      .lean();
    console.log("✅ Historial de VMs actualizado en caché.");
  } catch (error) {
    console.error("❌ Error al actualizar caché de historial:", error.message);
  }
};

// 🚀 Nueva ruta con caché para historial
app.get("/vcenter/vms-db1", async (req, res) => {
  if (cachedVmsHistory1) {
    res.status(200).json({ data: cachedVmsHistory1 });
    updateVmsHistoryCache1(); // Actualizar caché en segundo plano
  } else {
    await updateVmsHistoryCache1();
    res.status(200).json({ data: cachedVmsHistory1 || [] });
  }
});

// Nueva ruta para obtener los datos de los hosts
app.get("/vcenter/vms1", (req, res) => {
  if (cachedDataVms1) {
    res.status(200).json({ data: cachedDataVms1, lastUpdatedVms1 });
  } else {
    res.status(503).json({ error: "Datos no disponibles. Intenta nuevamente." });
  }
});

// Ejecutar cada 5 segundos para mantener datos actualizados 👀
setInterval(updateVmsData1, 50000);
setInterval(updateVmsHistoryCache1, 50000);
updateVmsData1();
updateVmsHistoryCache1();

let cachedDataGlake = null; // Datos en caché
let lastUpdatedGlake = null;

// Función para ejecutar el script Python periódicamente
const updateDataGlake = () => {
  const pythonProcess = spawn("python", ["./vcenter/resourcesglake.py"]); // Cambia el nombre del script si es necesario

  let data = "";
  let error = "";

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    error += chunk.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        cachedDataGlake = JSON.parse(data); // Parsear datos JSON
        lastUpdatedGlake = new Date(); // Guardar la hora de actualización
      } catch (parseError) {
        console.error("Error al parsear datos de Python:", parseError.message); //parserar datos según contexto
      }
    } else {
      console.error("Error al ejecutar el script de Python:", error);
    }
  });
};

// Ejecutar el script cada 50 segundos
setInterval(updateDataGlake, 50000);
updateDataGlake(); // Ejecutar inmediatamente al iniciar el servidor
// Endpoint para obtener datos correcto
app.get("/vcenter/resources-glake", (req, res) => {
  if (cachedDataGlake) {
    res.status(200).json({ data: cachedDataGlake, lastUpdatedGlake });
  } else {
    res.status(503).json({ error: "Datos no disponibles. Intenta nuevamente." });
  }
});

let cachedDataCNWS = null; // Datos en caché
let lastUpdatedCNWS = null;

// Función para ejecutar el script Python periódicamente y obtener datos de CNWS
const updateDataCNWS = () => {
  const pythonProcess = spawn("python", ["./vcenter/resourcescnws.py"]); // Cambia el nombre del script si es necesario

  let data = "";
  let error = "";

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    error += chunk.toString();
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        cachedDataCNWS = JSON.parse(data); // Parsear datos JSON
        lastUpdatedCNWS = new Date(); // Guardar la hora de actualización
      } catch (parseError) {
        console.error("Error al parsear datos de Python:", parseError.message); //parserar datos según contexto
      }
    } else {
      console.error("Error al ejecutar el script de Python:", error);
    }
  });
};

// Ejecutar el script cada 50 segundos
setInterval(updateDataCNWS, 50000);
updateDataCNWS(); // Ejecutar inmediatamente al iniciar el servidor
// Endpoint para obtener datos
app.get("/vcenter/resources-cnws", (req, res) => {
  if (cachedDataCNWS) {
    res.status(200).json({ data: cachedDataCNWS, lastUpdatedCNWS });
  } else {
    res.status(503).json({ error: "Datos no disponibles. Intenta nuevamente." });
  }
});

app.get('/api/clusters', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getClusters(sessionId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/datacenters', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getDatacenters(sessionId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hosts', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getHosts(sessionId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/virtual-machines', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getVirtualMachines(sessionId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/datastores', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const datastores = await getDatastores(sessionId);
    res.json({ value: datastores }); // Aseguramos compatibilidad con frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener detalles completos de una VM por ID
app.get('/api/vm/:vmId/details', async (req, res) => {
  try {
    const { vmId } = req.params; // Obtener el ID de la VM desde la ruta
    const sessionId = await authenticate(); // Obtener token de sesión
    const vmDetails = await getVmDetailss(sessionId, vmId); // Obtener detalles de la VM
    res.json(vmDetails); // Devolver detalles al cliente
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/networks', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getNetworks(sessionId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/hosts/:id', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getHosts(sessionId, req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clusters/:id', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getClusters(sessionId, req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/vms', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const vms = await getAllVirtualMachines(sessionId);
    res.json(vms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/vms/:id', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getVirtualMachines(sessionId, req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/datastores/:id', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getDatastores(sessionId, req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clusters/:id/events', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getEvents(sessionId, req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clusters/:id/performance', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const data = await getPerformance(sessionId, req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/cluster/metrics', async (req, res) => {
  try {
    const sessionId = await authenticate();
    const clusterId = 'domain-c8'; // ID del único clúster
    const metrics = await getClusterMetrics(sessionId, clusterId);
    res.json(metrics);
  } catch (error) {
    console.error('Error al procesar solicitud de métricas:', error.message);
    res.status(500).json({ error: error.message });
  }
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

// Función para limpiar la colección sensordatas
async function cleanSensorData() {
  try {
    console.log('Iniciando limpieza de datos en la colección sensordatas...');
    const documents = await SensorData.find()
      .sort({ _id: -1 }) // Ordena de más reciente a más antiguo
      .skip(10080) // Salta los últimos 10080 documentos
      .limit(1); // Obtén el primer registro fuera del rango

    if (documents.length === 0) {
      console.log('No hay datos para eliminar.');
      return { message: 'No hay datos para eliminar.' };
    }

    const thresholdId = documents[0]._id;

    // Eliminar registros más antiguos que el límite
    const result = await SensorData.deleteMany({ _id: { $lt: thresholdId } });
    console.log(`${result.deletedCount} registros eliminados.`);
    return { message: `${result.deletedCount} registros eliminados.` };
  } catch (error) {
    console.error('Error limpiando los datos:', error);
    return { error: 'Error limpiando los datos.' };
  }
}

// Ejecutar la limpieza de datos automáticamente al iniciar el servidor
(async () => {
  const response = await cleanSensorData();
  if (response.error) {
    console.error('Error en la limpieza automática:', response.error);
  } else {
    console.log('Limpieza automática completada:', response.message);
  }
})();

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
const vcenterUrl = process.env.VCENTER_SERVER_CNWS;
const username = process.env.VCENTER_USER_CNWS;
const password = process.env.VCENTER_PASSWORD_CNWS;

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

const { sensorNames, sensorNamesAlt } = require('./sensorList');
const getSensorIdByName  = require ("./controllers/getSensorIdByName")

// Función para obtener datos del sensor y guardarlos en MongoDB
const fetchDataFromSensor = async (sensorName) => {
  try {
    const sensorId = await getSensorIdByName(sensorName);
    if (!sensorId) {
      throw new Error(`Sensor con nombre ${sensorName} no disponible`);
    }
    const response = await axios.get(`http://192.168.200.155:8083/prtg-api/${sensorId}`);
    const data = response.data;
    const sensorData = new SensorData({ sensorId, data });
    await sensorData.save();
    console.log(`Datos almacenados para sensor ${sensorName}`);
  } catch (error) {
    console.error(`Error al obtener datos para el sensor ${sensorName}:`, error.message);
  }
};

// Tarea cron para obtener datos de los sensores cada minuto
cron.schedule('* * * * *', () => {
  console.log('Fetching data for sensors...');
  sensorNames.forEach((sensorName) => fetchDataFromSensor(sensorName));
});

const usernamecosmi = process.env.USERNAMECOSMI;
const passwordcosmi = process.env.PASSWORDCOSMI;

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
        username: usernamecosmi,
        password: passwordcosmi,
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
        username: usernamecosmi,
        password: passwordcosmi,
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
        username: usernamecosmi,
        password: passwordcosmi,
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
        username: usernamecosmi,
        password: passwordcosmi,
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

const getSensorIdByNameAlt = require ('./controllers/getSensorIdByNameAlt')

// Función para obtener datos del sensor y guardarlos en MongoDB (PRTG 192.168.200.160)
const fetchDataFromSensorAlt = async (sensorName) => {
  try {
    const sensorId = await getSensorIdByNameAlt(sensorName);
    if (!sensorId) {
      throw new Error(`Sensor con nombre ${sensorName} no disponible`);
    }
    const response = await axios.get(`http://192.168.200.155:8083/prtg-api-alt/${sensorId}`);
    const data = response.data;
    const sensorData = new SensorData({ sensorId, data });
    await sensorData.save();
    console.log(`Datos almacenados para sensor ${sensorName} (Alt)`);
  } catch (error) {
    console.error(`Error al obtener datos para el sensor ${sensorName} (Alt):`, error.message);
  }
};

// Tarea cron para obtener datos de los sensores cada minuto (PRTG 192.168.200.160)
cron.schedule('* * * * *', () => {
  console.log('Fetching data for sensors (Alt)...');
  sensorNamesAlt.forEach((sensorName) => fetchDataFromSensorAlt(sensorName));
});

const usernameccc = process.env.USERNAMECCC;
const passwordccc = process.env.PASSWORDCCC;

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
        username: usernameccc,
        password: passwordccc,
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
        username: usernameccc,
        password: passwordccc,
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
        username: usernameccc,
        password: passwordccc,
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
        username: usernameccc,
        password: passwordccc,
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

app.get('/prtg-api', async (req, res) => {
  try {
    const response = await axios.get('https://192.168.200.158/api/table.json', {
      params: {
        content: 'sensors',
        columns: 'objid,name,device,lastvalue',
        username: usernamecosmi,
        password: passwordcosmi,
      },
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      },
      httpsAgent,
    });

    const sensors = response.data.sensors || [];
    res.json({ sensors });
  } catch (error) {
    console.error('Error fetching sensor data from PRTG API:', error.message);
    res.status(500).json({ error: 'Failed to fetch sensor data from PRTG API' });
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
const PORT = process.env.PORT || 8083;
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