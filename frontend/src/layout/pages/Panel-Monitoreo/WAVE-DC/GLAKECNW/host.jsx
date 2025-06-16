import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
  CardHeader,
  Avatar,
  IconButton,
} from '@mui/material';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import VMDetails from './vmdetails.jsx';

const VCenter = () => {
  const [vms, setVms] = useState([]);
  const [selectedVm, setSelectedVm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para agrupar las VMs por nombre
  const groupVmsByName = (vms) => {
    const groups = {
      ESECENTRO: [],
      'Santa Sofía': [],
      Cosmitet: [],
      Peñitas: [],
      Duarte: [],
      Duana: [],
      Otros: []
    };

    vms.forEach(vm => {
      if (vm.name.includes('ESEC')) {
        groups.ESECENTRO.push(vm);
      } else if (vm.name.includes('SSFIA')) {
        groups['Santa Sofía'].push(vm);
      } else if (vm.name.includes('COSMI')) {
        groups.Cosmitet.push(vm);
      } else if (vm.name.includes('PENI')) {
        groups.Peñitas.push(vm);
      } else if (vm.name.includes('DUAR')) {
        groups.Duarte.push(vm);
      } else if (vm.name.includes('DUAN')) {
        groups.Duana.push(vm);
      } else {
        groups.Otros.push(vm);
      }
    });

    return groups;
  };

  // Obtener la lista de máquinas virtuales
  useEffect(() => {
    const fetchVms = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get('http://localhost:8083/api/vms');
        const groupedVms = groupVmsByName(response.data.value || []); // Agrupar las VMs por nombre
        setVms(groupedVms); // Guardar las VMs agrupadas
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVms();
  }, []);

  // Obtener los detalles de una máquina virtual seleccionada
  const fetchVmDetails = async (vmId) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`http://localhost:8083/api/vms/${vmId}`);
      setSelectedVm(response.data.value);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        <strong>Centro de Datos de Máquinas Virtuales</strong>
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && !selectedVm && (
        <div>
          {/* Mostrar los grupos de máquinas virtuales */}
          {Object.entries(vms).map(([groupName, groupVms]) => (
            groupVms.length > 0 && (
              <div key={groupName}>
                <Typography variant="h5" gutterBottom>
                  <strong>{groupName}</strong>
                </Typography>
                <Grid container spacing={3}>
                  {groupVms.map((vm) => (
                    <Grid item xs={12} sm={6} md={3} key={vm.vm}>
                      <Card sx={{ minHeight: 200, display: 'flex', flexDirection: 'column' }}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: vm.power_state === 'POWERED_ON' ? 'green' : 'red' }}>
                              {vm.power_state === 'POWERED_ON' ? <PowerIcon /> : <PowerOffIcon />}
                            </Avatar>
                          }
                          title={vm.name}
                          subheader={`Estado: ${vm.power_state.charAt(0).toUpperCase() + vm.power_state.slice(1)}`}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary">
                            <strong>IP:</strong> {vm.ip}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Memoria:</strong> {vm.memory} GB
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => fetchVmDetails(vm.vm)}
                            fullWidth
                            sx={{ mt: 2 }}
                          >
                            Ver Detalles
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )
          ))}
        </div>
      )}

      {selectedVm && (
        <div>
          <Button onClick={() => setSelectedVm(null)} variant="outlined" color="secondary" sx={{ mb: 2 }}>
            Volver a la Lista
          </Button>
          <VMDetails vm={selectedVm} />
        </div>
      )}
    </div>
  );
};

export default VCenter;


/*
import React, { useState } from 'react';
import axios from 'axios';

const VCenter = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    try {
      setError(null);
      const response = await axios.get(`http://192.168.200.155:8083/api/${endpoint}`);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>vCenter Resources</h1>
      <button onClick={() => fetchData('hosts/host-2005')}>Get Host Details</button>
      <button onClick={() => fetchData('clusters/domain-c8')}>Get Cluster Details</button>
      <button onClick={() => fetchData('vms/vm-10099')}>Get VM Details</button>
      <button onClick={() => fetchData('datastores/datastore-13')}>Get Datastore Details</button>
      <button onClick={() => fetchData('clusters/domain-c8/events')}>Get Cluster Events</button>
      <button onClick={() => fetchData('clusters/domain-c8/performance')}>Get Cluster Performance</button>


      <button onClick={() => fetchData('clusters')}> Get Clusters</button>
      <button onClick={() => fetchData('datacenters')}>Get Datacenters</button>
      <button onClick={() => fetchData('hosts')}>Get Hosts</button>
      <button onClick={() => fetchData('virtual-machines')}>Get Virtual Machines</button>
      <button onClick={() => fetchData('datastores')}>Get Datastores</button>
      <button onClick={() => fetchData('networks')}>Get Networks</button>
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default VCenter;
*/
