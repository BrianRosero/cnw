const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  sensorId: Number,
  data: Object,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model('SensorData', sensorSchema);

module.exports = SensorData;
