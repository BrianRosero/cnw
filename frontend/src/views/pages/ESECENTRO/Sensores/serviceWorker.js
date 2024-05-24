// serviceWorker.js

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sensor-data-cache').then(function(cache) {
      return cache.addAll([
        // Lista de recursos que quieres que se almacenen en caché
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Si se encuentra en caché, devuelve la respuesta almacenada en caché
      if (response) {
        return response;
      }
      // Si no se encuentra en caché, realiza la solicitud a la red
      return fetch(event.request).then(function(response) {
        // Abre una caché nueva y almacena la respuesta para futuras solicitudes
        return caches.open('sensor-data-cache').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// Escucha el evento 'message' del cliente
self.addEventListener('message', function(event) {
  // Si el cliente envía un mensaje 'updateSensorData', actualiza los datos del sensor
  if (event.data === 'updateSensorData') {
    fetchSensorData();
  }
});

// Función para actualizar los datos del sensor
function fetchSensorData() {
  // Realiza la solicitud para obtener los datos del sensor
  fetch('http://localhost:8080/prtg-api/ESECENTRO')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Procesa los datos y actualiza el almacenamiento local o cualquier otra lógica necesaria
      // Por ejemplo, podrías actualizar el estado de React en la memoria caché
      const values = data.sensors.map(sensor => ({
        name: sensor.objid,
        value: parseFloat(sensor.lastvalue.replace(/[^0-9.-]+/g, "")),
      }));
      // Envía los datos actualizados al cliente
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'sensorDataUpdate', data: values });
        });
      });
    })
    .catch(function(error) {
      console.error('Error fetching sensor data:', error);
    });
}

