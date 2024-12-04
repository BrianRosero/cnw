require('dotenv').config();
const axios = require('axios');
const https = require('https');

const server = process.env.VCENTER_SERVER_GLAKE;
const username = process.env.VCENTER_USER_GLAKE;
const password = process.env.VCENTER_PASSWORD_GLAKE;

// Agente HTTPS para ignorar certificados no confiables
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Autenticar y obtener un ID de sesión
async function authenticate() {
  try {
    const response = await axios.post(
      `https://${server}/rest/com/vmware/cis/session`,
      {},
      {
        auth: { username, password },
        headers: { 'Content-Type': 'application/json' },
        httpsAgent,
      }
    );

    if (response.status !== 200) {
      throw new Error('Error de autenticación con vCenter');
    }

    return response.data.value; // ID de sesión
  } catch (error) {
    console.error('Error al autenticar:', error.message);
    throw error;
  }
}

/*async function getHosts(sessionId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/host/${hostId}`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de hosts:', error.message);
    throw error;
  }
}*/

// Obtener detalles del Clúster
async function getClusters(sessionId, clusterId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/cluster/${clusterId}`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles del clúster:', error.message);
    throw error;
  }
}

// Obtener todas las máquinas virtuales
async function getAllVirtualMachines(sessionId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/vm`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de máquinas virtuales:', error.message);
    throw error;
  }
}

// Obtener detalles de una máquina virtual
async function getVirtualMachines(sessionId, vmId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/vm/${vmId}`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la máquina virtual:', error.message);
    throw error;
  }
}

// Obtener detalles de un datastore
/*async function getDatastores(sessionId, datastoreId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/datastore/${datastoreId}`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles del almacén de datos:', error.message);
    throw error;
  }
}*/


// Consultar datacenters
async function getDatacenters(sessionId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/datacenter`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener datacenters:', error.message);
    throw error;
  }
}

// Consultar redes
async function getNetworks(sessionId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/network`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener redes:', error.message);
    throw error;
  }
}

// Obtener eventos recientes
async function getEvents(sessionId, clusterId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/cluster/${clusterId}/events`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener eventos del clúster:', error.message);
    throw error;
  }
}

// Obtener rendimiento avanzado
async function getPerformance(sessionId, clusterId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/cluster/${clusterId}/performance`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener rendimiento avanzado:', error.message);
    throw error;
  }
}


// Obtener datastores
async function getDatastores(sessionId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/deployment`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data.value || []; // Aseguramos que sea un array
  } catch (error) {
    console.error('Error al obtener datastores:', error.message);
    throw error;
  }
}


// Función para obtener identidad del Guest OS
async function getVmGuestDetails(sessionId, vmId) {
  try {
    const guestResponse = await axios.get(
      `https://${server}/rest/vcenter/vm/${vmId}/guest/identity`,
      {
        headers: { 'vmware-api-session-id': sessionId },
        httpsAgent,
      }
    );
    return guestResponse.data.value;
  } catch (error) {
    console.error('Error al obtener identidad del Guest OS:', error.message);
    throw error;
  }
}

// Función para obtener interfaces de red
async function getVmNetworkingDetails(sessionId, vmId) {
  try {
    const networkResponse = await axios.get(
      `https://${server}/rest/vcenter/vm/${vmId}/guest/networking/interfaces`,
      {
        headers: { 'vmware-api-session-id': sessionId },
        httpsAgent,
      }
    );
    return networkResponse.data.value;
  } catch (error) {
    console.error('Error al obtener detalles de red:', error.message);
    throw error;
  }
}

// Función para obtener detalles de hardware (CPU, memoria, disco)
async function getVmHardwareDetails(sessionId, vmId) {
  try {
    // Obtener detalles de CPU
    const cpuResponse = await axios.get(
      `https://${server}/rest/vcenter/vm/${vmId}/hardware/cpu`,
      {
        headers: { 'vmware-api-session-id': sessionId },
        httpsAgent,
      }
    );

    // Obtener detalles de memoria
    const memoryResponse = await axios.get(
      `https://${server}/rest/vcenter/vm/${vmId}/hardware/memory`,
      {
        headers: { 'vmware-api-session-id': sessionId },
        httpsAgent,
      }
    );

    // Obtener detalles de discos
    const diskResponse = await axios.get(
      `https://${server}/rest/vcenter/vm/${vmId}/hardware/disk`,
      {
        headers: { 'vmware-api-session-id': sessionId },
        httpsAgent,
      }
    );

    return {
      cpu: cpuResponse.data.value,
      memory: memoryResponse.data.value,
      disks: diskResponse.data.value,
    };
  } catch (error) {
    console.error('Error al obtener detalles de hardware:', error.message);
    throw error;
  }
}

// Función combinada para obtener todos los detalles
async function getVmDetailss(sessionId, vmId) {
  try {
    const guestDetails = await getVmGuestDetails(sessionId, vmId);
    const networkDetails = await getVmNetworkingDetails(sessionId, vmId);
    const hardwareDetails = await getVmHardwareDetails(sessionId, vmId);

    return {
      guest: guestDetails,
      network: networkDetails,
      hardware: hardwareDetails,
    };
  } catch (error) {
    console.error('Error al obtener detalles completos de la VM:', error.message);
    throw error;
  }
}


// Obtener los detalles de un datastore específico
async function getDatastoreDetails(sessionId, datastoreId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/datastore/${datastoreId}`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });

    if (response.status !== 200) {
      throw new Error(`Error al obtener detalles del datastore ${datastoreId}`);
    }

    return response.data.value; // Detalles del datastore
  } catch (error) {
    console.error('Error al obtener detalles del datastore:', error.message);
    throw error;
  }
}


// Obtener lista de Hosts pertenecientes a un Clúster
async function getHosts(sessionId, clusterId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/host?cluster=${clusterId}`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data.value || [];
  } catch (error) {
    console.error('Error al obtener Hosts del clúster:', error.message);
    throw error;
  }
}

// Obtener los detalles individuales de cada Host
async function getHostDetails(sessionId, hostId) {
  try {
    const response = await axios.get(`https://${server}/rest/vcenter/host/${hostId}`, {
      headers: { 'vmware-api-session-id': sessionId },
      httpsAgent,
    });
    return response.data.value || {};
  } catch (error) {
    console.error(`Error al obtener detalles del Host ${hostId}:`, error.message);
    throw error;
  }
}

// Obtener el uso de CPU, Memoria y Almacenamiento del Clúster
async function getClusterMetrics(sessionId, clusterId) {
  try {
    // Obtener lista de Hosts
    const hosts = await getHosts(sessionId, clusterId);
    if (hosts.length === 0) {
      throw new Error('No se encontraron Hosts en el clúster');
    }
    let totalCpu = 0, totalMemory = 0, totalStorage = 0;
    let cpuUsed = 0, memoryUsed = 0;
    // Iterar sobre cada Host para sumar capacidades
    for (const host of hosts) {
      const details = await getHostDetails(sessionId, host.host);
      // Simulación de uso básico basado en valores hipotéticos
      totalCpu += details.cpu_count || 0;
      totalMemory += (details.memory_size_MiB || 0) / 1024; // Convertir a GB

      // Nota: Sin API de Performance exacta, almacenamiento se estima aquí
      totalStorage += 1024; // Ejemplo estático: Reemplazar cuando disponible.

      // Consumido: Aquí debemos sumar valores del PerformanceManager
      cpuUsed += totalCpu * 0.5; // Simula 50% de consumo
      memoryUsed += totalMemory * 0.6; // Simula 60% de uso.
    }

    // Resultados aproximados
    return {
      totalCpu,
      cpuUsed,
      totalMemory,
      memoryUsed,
      totalStorage
    };
  } catch (error) {
    console.error('Error al obtener métricas del clúster:', error.message);
    throw error;
  }
}

// Exporta todas las funciones
module.exports = {
  authenticate,
  getClusters,
  getDatacenters,
  getHosts,
  getAllVirtualMachines,
  getVirtualMachines,
  getDatastores,
  getDatastoreDetails,
  getNetworks,
  getEvents,
  getPerformance,
  getVmDetailss,
  getClusterMetrics,
};


