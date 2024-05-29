require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");


var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:8082", "http://localhost:8083", "http://localhost:5173", "http://localhost:3000/", "http://10.99.0.228:8083", "http://consulnetworks.co:8082", "http://10.99.0.228:8082"]
};

app.use(cors(corsOptions));

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

app.get('/prtg-api', async (req, res) => {
  try {
    const response = await axios.get('http://10.99.0.228:8080/api/table.json', {
      params: {
        content: 'sensors',
        output: 'json',
        columns: 'objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite,deviceid,device_type,device_manufacturer,device_uptime',
        username: 'prtgadmin',
        password: 'prtgadmin',
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error);
    res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
  }
});

app.get('/prtg-api/ESECENTRO', async (req, res) => {
  try {
    const response = await axios.get('http://10.99.0.228:8080/api/table.json', {
      params: {
        content: 'sensors',
        output: 'json',
        columns: 'objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite,deviceid,device_type,device_manufacturer,device_uptime',
        username: 'prtgadmin',
        password: 'prtgadmin',
        filter_objid: [2099, 2098] // Filtrar por los IDs de los sensores
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
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from PRTG API:', error);
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
      } else {
        console.log('No se han creado algunos roles porque ya existen');
      }
    })
    .catch(err => {
      console.error('Error al revisar los roles:', err);
    });
}