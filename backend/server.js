require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const axios = require("axios");
const https = require('https');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');

// Configurar CORS para permitir cualquier origen
app.use(cors());

app.use(bodyParser.json());
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos SQLite
const dbs = new sqlite3.Database('graficas.db');

// Crear la tabla si no existe
dbs.run(`
  CREATE TABLE IF NOT EXISTS history_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor_id INTEGER,
    cpu_usage REAL,
    disk_usage REAL,
    memory_usage REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Configurar agente HTTPS para aceptar certificados autofirmados
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Ignorar el certificado autofirmado
});

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  initial();
});

// Función para obtener y guardar datos de sensores
const fetchAndSaveSensorData = async (sensorId) => {
  try {
    const response = await axios.get(`http://192.168.200.158/api/table.json`, {
      params: {
        content: 'channels',
        columns: 'objid,channel,name,lastvalue',
        id: sensorId,
        username: process.env.PRTG_USERNAME,
        password: process.env.PRTG_PASSWORD,
      },
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      }
    });

    const channelData = response.data.channels.reduce((acc, channel) => {
      acc[channel.objid] = channel;
      return acc;
    }, {});

    const cpuUsage = parseFloat(channelData[2099]?.lastvalue) || 0; // Ajusta el objid según tu sensor
    const diskUsage = parseFloat(channelData[2098]?.lastvalue) || 0; // Ajusta el objid según tu sensor
    const memoryUsage = parseFloat(channelData[2126]?.lastvalue) || 0; // Ajusta el objid según tu sensor

    dbs.run(
      `INSERT INTO history_data (sensor_id, cpu_usage, disk_usage, memory_usage)
       VALUES (?, ?, ?, ?)`,
      [sensorId, cpuUsage, diskUsage, memoryUsage],
      function(err) {
        if (err) {
          console.error('Error al guardar los datos:', err.message);
        } else {
          console.log(`Datos guardados para sensor ${sensorId}:`, { cpuUsage, diskUsage, memoryUsage });
        }
      }
    );

  } catch (error) {
    console.error(`Error fetching data for sensor ${sensorId}:`, error.message);
  }
};

// Tarea programada para guardar datos de sensores cada 5 minutos
cron.schedule('*/5 * * * *', () => {
  const sensors = [2099, 2098, 2126]; // Lista de IDs de sensores a monitorear
  sensors.forEach(sensorId => fetchAndSaveSensorData(sensorId));
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido esta es la aplicación CONSULNETWORKS." });
});

app.post('/saveData', (req, res) => {
  const { sensorId, cpuUsage, diskUsage, memoryUsage } = req.body;
  dbs.run(
    `INSERT INTO history_data (sensor_id, cpu_usage, disk_usage, memory_usage)
     VALUES (?, ?, ?, ?)`,
    [sensorId, cpuUsage, diskUsage, memoryUsage],
    function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send({ id: this.lastID });
    }
  );
});

app.get('/getData', (req, res) => {
  const { sensorId, startTime, endTime } = req.query;
  dbs.all(
    `SELECT * FROM history_data WHERE sensor_id = ? AND timestamp BETWEEN ? AND ? ORDER BY timestamp ASC`,
    [sensorId, startTime, endTime],
    (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send(rows);
    }
  );
});

app.get('/prtg-api/:sensorId', async (req, res) => {
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