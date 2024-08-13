const dbConfig = require('../app/config/db.config.js');
const envConfig = require('../config/config.js');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

// Configuración de Sequelize usando el archivo de configuración
let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  const env = process.env.NODE_ENV || 'development';
  const config = envConfig[env];
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );
}

// Lectura de los modelos y su asociación
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Especificación de los modelos y relaciones específicas
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles'
});
db.user.belongsToMany(db.role, {
  through: 'user_roles'
});

db.ROLES = [
  'usuarios',
  'administrador',
  'moderador',
  'administrador-COSMITET',
  'administrador-CAMARA-Y-COMERCIO',
  'administrador-DUANA',
  'administrador-OZONO',
  'administrador-ROCHE'
];

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
