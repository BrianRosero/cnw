// app/models/VmData.js

const mongoose = require('mongoose');

const vmDataSchema = new mongoose.Schema({
  running: Number,
  stopped: Number,
  suspended: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VmData', vmDataSchema);
