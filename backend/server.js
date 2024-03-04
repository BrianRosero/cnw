const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:8082", "http://localhost:5173", "http://localhost:3000/"]
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
  console.log('Database synchronized');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido esta es la aplicación CONSULNETWORKS." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  // Verificar si los roles ya existen en la base de datos
  Role.findAll()
      .then(roles => {
        if (roles.length === 0) {
          // Si no hay roles, crear los roles
          Role.create({
            id: 1,
            name: "user"
          });

          Role.create({
            id: 2,
            name: "moderator"
          });

          Role.create({
            id: 3,
            name: "admin"
          });
        } else {
          console.log('No se han creado algunos roles porque ya existen');
        }
      })
      .catch(err => {
        console.error('Error checking roles:', err);
      });
}