import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Tab,
  Tabs, CardHeader,
} from '@mui/material';
import {
  Memory,
  Computer,
  Speed,
  PowerSettingsNew,
  Dns,
  Lan,
  Refresh,
  Storage,
  NetworkCheck,
  DeveloperBoard,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ✅ Importación de imágenes
import GeneralImage from '@/images/general.png';
import CpuImage from '@/images/vm-preview.png';
//import MemoryImage from '@/src/images/memory.png';
//import StorageImage from '@/src/images/storage.png';
//import NetworkImage from '@/src/images/network.png';

import Chart from 'react-apexcharts';
import SoftTypography from '@/layout/Ui-Components/Components/SoftTypography/index.jsx';

const gaugeChartOptions = (label, color) => ({
  chart: {
    type: 'radialBar',
    offsetY: -10,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -120,
      endAngle: 120,
      track: {
        background: '#f0f0f0',
        strokeWidth: '100%',
      },
      hollow: {
        size: '60%',
      },
      dataLabels: {
        name: {
          show: true,
          offsetY: 20,
          fontSize: '14px',
        },
        value: {
          show: true,
          offsetY: -20,
          fontSize: '22px',
          fontWeight: 'bold',
        },
      },
    },
  },
  fill: {
    colors: [color],
  },
  stroke: {
    lineCap: 'round',
  },
  labels: [label],
});

export default function VMDashboard() {
  const [data, setData] = useState([]);
  const [selectedVM, setSelectedVM] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expandAll, setExpandAll] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  /*  const cpuUsage = selectedVM?.cpu_usage_mhz || 0;
    const cpuCores = selectedVM?.cpu_cores || 0;

    const memoryUsage = selectedVM?.memory_usage_mb || 0;
    const memoryAsigned = selectedVM?.memory_gb || 0;
    const totalMemoryMB = memoryAsigned * 1024;

    // Puedes normalizar los valores si necesitas que el gráfico se vea más proporcional
    //const normalizedCPU = Math.min((cpuUsage / 100) * 100, 100);
    const formattedCPU = (cpuUsage / (cpuCores * 2095) * 100);
    const normalizedCPU  = `${formattedCPU.toFixed(1)}`;


    //const normalizedMemory = Math.min((memoryUsage / 1000) * 100, 100);
    const formattedMemory = (memoryUsage / totalMemoryMB) * 100;
    const normalizedMemory  = `${formattedMemory.toFixed(1)}`;*/

  const cpuUsage = selectedVM?.cpu_usage_mhz || 0;
  const cpuCores = selectedVM?.cpu_cores || 0;

  const memoryUsage = selectedVM?.memory_usage_mb || 0;
  const memoryAsigned = selectedVM?.memory_gb || 0;
  const totalMemoryMB = memoryAsigned * 1024;

  // Normalizamos a porcentaje si no hay un valor de máximo, asumimos alguno base
  const formattedCPU = (cpuUsage / (cpuCores * 2095) * 100);
  const normalizedCPU = `${formattedCPU.toFixed(1)}`; // Puedes ajustar el divisor (100) según tu necesidad real

  const formattedMemory = (memoryUsage / totalMemoryMB) * 100;
  const normalizedMemory = `${formattedMemory.toFixed(0)}`; //

  const [tab, setTab] = useState(0);

  const handleChange = (_event, newValue) => {
    setTab(newValue);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const currentVMName = selectedVM?.name; // 👉 Guarda el nombre de la VM actualmente seleccionada

    try {
      const response = await fetch('http://localhost:8083/vcenter/vms');
      const result = await response.json();

      if (response.ok) {
        setData(result.data);
        setLastUpdated(result.lastUpdatedVms);

        // 👉 Busca si la VM seleccionada antes todavía existe en los nuevos datos
        const stillSelected = result.data.find(vm => vm.name === currentVMName);

        // 👉 Si existe, la mantenemos seleccionada. Si no, podrías mantener la primera como fallback.
        setSelectedVM(stillSelected || result.data[0]);
      } else {
        setError(result.error || 'Error al obtener los datos');
      }
    } catch (err) {
      setError('Error al conectar con la API');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleEmpresa = (empresa) => {
    setExpandedItems((prev) => ({
      ...prev,
      [empresa]: !prev[empresa],
    }));
  };

  const groupVMs = (data) => {
    const groups = {
      'ESE CENTRO': [],
      BLUEDATA: [],
      COSMITET: [],
      DUANA: [],
      DUARTE: [],
      PEÑITAS: [],
      'SANTA SOFIA': [],
      ROCHE: [],
      CNW: [],
    };

    data.forEach((vm) => {
      const name = vm.name.toUpperCase();
      if (name.includes('ESE')) groups['ESE CENTRO'].push(vm);
      else if (name.includes('BLUE')) groups.BLUEDATA.push(vm);
      else if (name.includes('DUAN')) groups.DUANA.push(vm);
      else if (name.includes('SSFIA') || name.includes('SOFIA')) groups['SANTA SOFIA'].push(vm);
      else if (name.includes('PENI')) groups.PEÑITAS.push(vm);
      else if (name.includes('COSMI')) groups.COSMITET.push(vm);
      else if (name.includes('DUAR')) groups.DUARTE.push(vm);
      else if (name.includes('ROCH')) groups.ROCHE.push(vm);
      else groups.CNW.push(vm);
    });
    return groups;
  };

  return (
    <Grid container spacing={2} className="max-w-7xl mx-auto p-4">
      <Grid item xs={12} sm={4} md={3}>
        <Card className="h-full">
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="bold">Máquinas Virtuales</Typography>
              <Box display="flex" gap={1}>
                <Button size="small" onClick={fetchData} disabled={loading} startIcon={<Refresh />}>
                  {loading ? 'Cargando...' : 'Actualizar'}
                </Button>
              </Box>
            </Box>

            <Box sx={{ maxHeight: 370, overflowY: 'auto', pr: 1 }}>
              {Object.entries(groupVMs(data)).map(([empresa, vms]) =>
                  vms.length > 0 && (
                    <Accordion key={empresa} expanded={expandAll || expandedItems[empresa]}
                               onChange={() => handleToggleEmpresa(empresa)}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight="bold">{empresa}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {vms.map((vm) => (
                            <ListItem key={vm.name} disablePadding>
                              <ListItemButton selected={selectedVM?.name === vm.name} onClick={() => setSelectedVM(vm)}>
                                <ListItemText primary={vm.name} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ),
              )}
            </Box>

            {lastUpdated && (
              <Typography variant="caption" color="textSecondary" mt={2}>
                Última actualización: {new Date(lastUpdated).toLocaleString()}
              </Typography>
            )}
            {error && (
              <Typography color="error" variant="body2">{error}</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={8} md={9}>
        {selectedVM && (
          <Card className="p-3 shadow-lg rounded-2xl w-full">
            <CardContent>
              <Grid container spacing={1}>
                {/* General */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ px: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, display: 'flex', alignItems: 'center' }}
                    >
                      <DeveloperBoard fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      General
                    </Typography>

                    <Box
                      sx={{
                        maxHeight: 200, // Puedes ajustar esta altura según lo necesites
                        overflowY: 'auto',
                        pr: 1, // un poco de padding para evitar que el scroll tape el contenido
                        mt: 1,
                      }}
                    >
                      <SoftTypography
                        variant="h4"
                        fontWeight="bold"
                        color="dark"
                      >
                        <Computer fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                        {selectedVM.name}
                      </SoftTypography>
                      <Chip
                        label={selectedVM.power_state === 'poweredOn' ? 'Encendida' : 'Apagada'}
                        size="small"
                        icon={<PowerSettingsNew fontSize="small" />}
                        sx={{
                          my: 1,
                          backgroundColor: selectedVM.power_state === 'poweredOn' ? '#00A082' : '#ff0000', // Verde HP GreenLake y rojo error
                          color: 'white', // Asegura que el texto sea legible
                        }}
                      />
                      <Typography variant="body2"><strong>vCPU:</strong> {selectedVM.cpu_cores} vCPU</Typography>
                      <Typography variant="body2"><strong>Hostname:</strong> {selectedVM.guest_info?.hostname}
                      </Typography>
                      <Typography variant="body2"><strong>Host:</strong> {selectedVM.host}</Typography>
                      <Typography variant="body2"><strong>SO:</strong> {selectedVM.guest_info?.os_fullname}</Typography>
                      <Typography variant="body2"><strong>Memoria:</strong> {selectedVM.memory_gb} GB</Typography>
                      <Typography
                        variant="body2"><strong>IPs:</strong> {selectedVM.guest_info?.ip_addresses?.join(', ')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Adaptadores de Red */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ px: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, display: 'flex', alignItems: 'center' }}
                    >
                      <NetworkCheck fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Adaptadores de Red
                    </Typography>

                    {selectedVM.network_adapters?.length ? (
                      <Box
                        sx={{
                          maxHeight: 200, // Puedes ajustar esta altura según lo necesites
                          overflowY: 'auto',
                          pr: 1, // un poco de padding para evitar que el scroll tape el contenido
                          mt: 1,
                        }}
                      >
                        {selectedVM.network_adapters.map((nic, i) => (
                          <Box key={i} mb={2}>
                            <Typography variant="body2"><strong>Nombre:</strong> {nic.label}</Typography>
                            <Chip
                              label={nic.connected ? 'Conectado' : 'Desconectado'}
                              size="small"
                              icon={<NetworkCheck fontSize="small" />}
                              sx={{
                                my: 1,
                                backgroundColor: nic.connected ? '#00A082' : '#ff0000', // Verde personalizado y rojo por defecto
                                color: 'white', // Asegura que el texto sea legible
                              }}
                            />
                            <Typography variant="body2"><strong>Mac Address:</strong> {nic.mac_address}</Typography>
                            <Typography variant="body2"><strong>Red:</strong> {nic.network}</Typography>
                            <Divider sx={{ mt: 1 }} />
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2">No hay redes disponibles</Typography>
                    )}
                  </Box>
                </Grid>

                {/* Discos */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ px: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, display: 'flex', alignItems: 'center' }}
                    >
                      <Storage fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Discos
                    </Typography>

                    {selectedVM.disks?.length ? (
                      <>
                        {selectedVM.disks.map((disk, idx) => (
                          <Typography key={idx} variant="body2">
                            • <strong>{disk.label}</strong> — {disk.capacity_gb} GB
                            ({disk.thin_provisioned ? 'Thin' : 'Thick'})
                          </Typography>
                        ))}

                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Total de almacenamiento asignado:</strong>{' '}
                          {selectedVM.disks.reduce((total, disk) => total + (disk.capacity_gb || 0), 0)} GB
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2">No hay discos disponibles.</Typography>
                    )}

                   {/* <Box mt={1} textAlign="center">
                      <img src="/images/storage-preview.png" alt="Discos Info"
                           style={{ width: '100%', maxWidth: 160, borderRadius: 6 }} />
                    </Box>*/}
                  </Box>
                </Grid>

                {/* CPU */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ px: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, display: 'flex', alignItems: 'center' }}
                    >
                      <Speed fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      CPU
                    </Typography>

                    <Chart
                      options={gaugeChartOptions('CPU', '#00a082')}
                      series={[normalizedCPU]}
                      type="radialBar"
                      height={220}
                    />

                    <Typography variant="body2">
                      <strong>Uso actual:</strong> {cpuUsage} MHz
                    </Typography>
                    {normalizedCPU > 100 && (
                      <Typography variant="caption" color="green">
                        Turbo Boost / Hyper-Threading activo
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Memoria */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ px: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, display: 'flex', alignItems: 'center' }}
                    >
                      <Memory fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Uso de Memoria
                    </Typography>

                    <Chart
                      options={gaugeChartOptions('Memoria', '#00a082')}
                      series={[normalizedMemory]}
                      type="radialBar"
                      height={220}
                    />

                    <Typography variant="body2">
                      <strong>Uso actual:</strong> {memoryUsage} MB
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        )}
      </Grid>
    </Grid>
  );
}
