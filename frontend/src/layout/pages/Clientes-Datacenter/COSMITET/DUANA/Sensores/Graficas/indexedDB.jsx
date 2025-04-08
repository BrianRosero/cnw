import Dexie from 'dexie';

const db = new Dexie('MachineDataDB');
db.version(1).stores({
  sensorData: '++id, sensorId, cpuUsage, diskUsage, memoryUsage, timestamp'
});

export default db;
