require('dotenv').config();

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  //Br14nR0s3r0 port:5432
  //ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  DB: process.env.DB,
  dialect: process.env.DIALECT,
  pool: {
    max: parseInt(process.env.POOL_MAX, 10),
    min: parseInt(process.env.POOL_MIN, 0),
    acquire: parseInt(process.env.POOL_ACQUIRE, 30000),
    idle: parseInt(process.env.POOL_IDLE, 10000)
  }
};