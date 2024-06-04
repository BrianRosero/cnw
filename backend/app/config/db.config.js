module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "S0p0rt32023",
  DB: "cnw",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};