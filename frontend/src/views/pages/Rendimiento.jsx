import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const Rendimiento = () => {
  // Datos de ejemplo de rendimiento de equipos y procesos
  const [equipos, setEquipos] = useState([
    { id: 1, nombre: 'Servidor 1', ram: '16 GB', disco: '1 TB HDD', usoCPU: '50%', procesos: 25 },
    { id: 2, nombre: 'Servidor 2', ram: '32 GB', disco: '2 TB SSD', usoCPU: '70%', procesos: 30 },
    { id: 3, nombre: 'Servidor 3', ram: '64 GB', disco: '500 GB SSD', usoCPU: '85%', procesos: 20 },
    // Añadir más ejemplos de equipos aquí
    { id: 4, nombre: 'Servidor 4', ram: '8 GB', disco: '500 GB HDD', usoCPU: '40%', procesos: 15 },
    { id: 5, nombre: 'Servidor 5', ram: '128 GB', disco: '4 TB SSD', usoCPU: '60%', procesos: 35 },
    { id: 6, nombre: 'Servidor 6', ram: '32 GB', disco: '1 TB SSD', usoCPU: '75%', procesos: 22 },
  ]);

  // Datos de ejemplo de procesos en ejecución
  const [procesos, setProcesos] = useState([
    { id: 1, nombre: 'Proceso 1', cpu: 10, memoria: 200 },
    { id: 2, nombre: 'Proceso 2', cpu: 20, memoria: 300 },
    { id: 3, nombre: 'Proceso 3', cpu: 15, memoria: 250 },
    { id: 4, nombre: 'Proceso 4', cpu: 5, memoria: 150 },
    { id: 5, nombre: 'Proceso 5', cpu: 25, memoria: 400 },
    // Añadir más ejemplos de procesos aquí
    { id: 6, nombre: 'Proceso 6', cpu: 18, memoria: 350 },
    { id: 7, nombre: 'Proceso 7', cpu: 8, memoria: 180 },
    { id: 8, nombre: 'Proceso 8', cpu: 30, memoria: 450 },
  ]);

  // Datos para los gráficos de barras
  const [usoCPUData, setUsoCPUData] = useState([]);
  const [procesosData, setProcesosData] = useState([]);

  // Actualizar datos para los gráficos de barras
  useEffect(() => {
    const usoCPU = equipos.map(equipo => parseInt(equipo.usoCPU));
    const numProcesos = equipos.map(equipo => equipo.procesos);
    setUsoCPUData(usoCPU);
    setProcesosData(numProcesos);
  }, [equipos]);

  // Simular actualización de datos en tiempo real cada 250 milisegundos (0.25 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular cambio de datos para equipos
      setEquipos(prevEquipos =>
        prevEquipos.map(equipo => ({
          ...equipo,
          usoCPU: `${clamp(parseInt(equipo.usoCPU) + Math.floor(Math.random() * 21) - 10, 0, 100)}%`, // Actualizar uso de CPU dentro de un rango de +/- 10
          procesos: clamp(equipo.procesos + Math.floor(Math.random() * 21) - 10, 0, 50) // Actualizar número de procesos dentro de un rango de +/- 10
        }))
      );

      // Simular cambio de datos para procesos
      setProcesos(prevProcesos =>
        prevProcesos.map(proceso => ({
          ...proceso,
          cpu: clamp(proceso.cpu + Math.floor(Math.random() * 21) - 10, 0, 100), // Actualizar uso de CPU dentro de un rango de +/- 10
          memoria: clamp(proceso.memoria + Math.floor(Math.random() * 101) - 50, 0, 500) // Actualizar uso de memoria dentro de un rango de +/- 50
        }))
      );
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Función para limitar un valor dentro de un rango específico
  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  // Configuración de los gráficos de barras
  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Rendimiento del Data Center
      </Typography>
      <Grid container spacing={3}>
        {equipos.map((equipo) => (
          <Grid item key={equipo.id} xs={12} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h4" gutterBottom>
                {equipo.nombre}
              </Typography>
              <Typography variant="body1" gutterBottom>
                RAM: {equipo.ram}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Disco Duro: {equipo.disco}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Uso de CPU: {equipo.usoCPU}
              </Typography>
              <LinearProgress variant="determinate" value={(equipo.procesos / 50) * 100} />
              <Typography variant="body1" gutterBottom>
                Número de Procesos: {equipo.procesos}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h3" gutterBottom mt={4}>
        Procesos en Ejecución
      </Typography>
      <Grid container spacing={3}>
        {procesos.map((proceso) => (
          <Grid item key={proceso.id} xs={12} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                {proceso.nombre}
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <CircularProgress variant="determinate" value={proceso.cpu} color={proceso.cpu > 80 ? "error" : "primary"} />
                <Typography variant="body2" ml={2}>{proceso.cpu}%</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <CircularProgress variant="determinate" value={(proceso.memoria / 500) * 100} color="secondary" />
                <Typography variant="body2" ml={2}>{proceso.memoria} MB</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h3" gutterBottom mt={4}>
        Tabla de Rendimiento
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipo</TableCell>
              <TableCell>Uso de CPU</TableCell>
              <TableCell>Número de Procesos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipos.map((equipo) => (
              <TableRow key={equipo.id}>
                <TableCell>{equipo.nombre}</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={parseInt(equipo.usoCPU)} color={parseInt(equipo.usoCPU) > 80 ? "error" : "primary"} />
                  <Typography variant="body2">{equipo.usoCPU}</Typography>
                </TableCell>
                <TableCell>{equipo.procesos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Rendimiento;
