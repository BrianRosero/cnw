require('dotenv').config();
const express = require("express");
const path = require('path');
const cors = require("cors");
const app = express();
const { Pool } = require('pg');
const { Server } = require("socket.io"); // Use Server from socket.io
const axios = require("axios");
// Load database info to connect
const pgUser = process.env.PG_USER;
const pgPass = process.env.PG_PASS;
const serverLoc = process.env.PG_SERVER;
const dbName = process.env.DB_NAME;
const connString = 'tcp://'+pgUser+':'+pgPass+'@'+serverLoc+':5432/'+dbName;   //username:password@location:port/dbname

var server = app.listen(8083);
//Listen on socket
// Use Server constructor
var io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
//Try to connect to database
const pool = new Pool({
  connectionString: connString
});
//Check if connection is good or bad
pool.connect(err => {
  if(err) {
    console.error('Database connection error', err.stack);
  }
  else {
    console.log('Connected');
  }
})
//io = to all clients
//socket = to specific client
io.on('connection', function(socket) {
  //Alerts us when someone successfully connects
  console.log('User Connected');
  //Alerts us when someone disconnects
  socket.on('disconnect', () => { // Corrected the event name to 'disconnect'
    console.log('User Disconnected')
  })

  //Update notes and let the clients know which row was updated
  socket.on("updateNotes", data => {
    pool.query('UPDATE public."Notes" SET notes = $1 WHERE id = $2;', [data.notes, data.id] ,(err ,res) => {
      if(err) throw err
      io.emit('dataIdUpdated', data.id);
    })
  })

  //Get everything from a table
  socket.on("getAllData", page => {
    //Base query
    var queryText = 'SELECT id, name, notes FROM public."Notes" ';

    //Position and values are for parameterization. Help with sql injection.
    //If you want to add filters, you can add them here and follow the pattern
    var position = 1;
    var values = [];

    //Filter by text
    if(page.filters.filterText.length > 0) {
      var fieldsToSearch = ["name", "notes"];
      if(!queryText.includes("WHERE")) queryText += "WHERE ";
      else queryText += "AND ";
      fieldsToSearch.forEach(element => { queryText += element + " ~* $" + position++ + " OR "; values.push(page.filters.filterText)});    //Adds the where statement and prepares the query to do case insensitive regex search
      queryText = queryText.slice(0, -3);     //Remove OR
      queryText += " "
    }

    queryText += 'ORDER BY id ASC ';

    //Offset and fetch next is needed when the database is huge.
    queryText += "OFFSET $" +position++ + " ROWS FETCH NEXT $" + position++ + " ROWS ONLY;";
    values.push(page.page.offset);
    values.push(page.page.limit);


    pool.query(queryText, values, (err ,res) => {
      if(err) throw err
      socket.emit("allData", res.rows);
    })
  })

  //Get the size of the table
  socket.on("getDataSize", () => {
    pool.query('SELECT COUNT(*) as count FROM public."Notes";', (err ,res) => {
      if(err) throw err
      socket.emit("tableSize", res.rows[0]);
    })
  })
})

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:8082", "http://localhost:5173", "http://localhost:3000/", "http://10.99.0.228:8082", "http://consulnetworks.co:8082"]
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

// app.get('/prtg-api', async (req, res) => {
//   try {
//     const response = await axios.get('https://200.29.239.5/api/table.json', {
//       httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//       }),
//       params: {
//         content: 'sensors',
//         output: 'json',
//         columns: 'objid,probe,group,device,sensor,status,message,lastvalue,priority,favorite,deviceid,device_type,device_manufacturer,device_uptime',
//         username: 'prtgadmin',
//         password: 'prtgadmin',
//       }
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching data from PRTG API:', error);
//     res.status(500).json({ error: 'Failed to fetch data from PRTG API' });
//   }
// });

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
        filter_objid: 2102, // Filtrar por el ID del sensor
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