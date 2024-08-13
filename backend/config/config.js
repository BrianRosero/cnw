require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    pool: {
      max: parseInt(process.env.POOL_MAX, 10),
      min: parseInt(process.env.POOL_MIN, 10),
      acquire: parseInt(process.env.POOL_ACQUIRE, 10),
      idle: parseInt(process.env.POOL_IDLE, 10)
    }
  },
  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB + '_test',
    host: process.env.HOST,
    dialect: process.env.DIALECT
  },
  production: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB + '_prod',
    host: process.env.HOST,
    dialect: process.env.DIALECT
  }
};
