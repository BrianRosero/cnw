import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, LinearProgress,
} from '@mui/material';
import ApexCharts from 'react-apexcharts';
import axios from "axios";
import { styled } from "@mui/material/styles";

const SensorCardWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  maxWidth: 400,
  textAlign: "center",
}));

const SensorCard = ({ sensor }) => {
  return (
    <SensorCardWrapper>
      <h3>{sensor.sensor}</h3>
      <p><strong>ID:</strong> {sensor.objid}</p>
      <p><strong>Mensaje:</strong> {sensor.probe}</p>
      <p><strong>Sensor IP:</strong> {sensor.device}</p>
      <p><strong>Grupo:</strong> {sensor.group}</p>
      <p><strong>Estado:</strong> {sensor.status}</p>
      <p><strong>Último valor:</strong> {sensor.lastvalue}</p>
      <p><strong>Prioridad:</strong> {sensor.priority}</p>
    </SensorCardWrapper>
  );
};
// objid, probe, group, device, sensor, status, message, lastvalue, priority, favorite, deviceid, device_type,device_manufacturer,device_uptime',

const Estadisticas = () => {

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

  // Datos de ejemplo para las gráficas
  const dataDonut = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Equipo A', 'Equipo B', 'Equipo C', 'Equipo D', 'Equipo E'],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    },
  };

  const dataBar = {
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      colors: ['#008FFB'],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Equipo A', 'Equipo B', 'Equipo C', 'Equipo D', 'Equipo E', 'Equipo F', 'Equipo G', 'Equipo H'],
      },
    },
  };

  const dataLine = {
    series: [
      {
        name: 'Serie 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
      {
        name: 'Serie 2',
        data: [25, 35, 30, 45, 44, 55, 65, 76],
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      colors: ['#008FFB', '#00E396'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      },
      legend: {
        show: true,
        offsetY: 10,
        offsetX: 10,
      },
    },
  };

  const dataArea = {
    series: [
      {
        name: 'Serie 1',
        data: [30, 40, 25, 50, 49, 60, 70, 91],
      },
      {
        name: 'Serie 2',
        data: [20, 35, 20, 45, 30, 55, 60, 88],
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
      },
      colors: ['#008FFB', '#00E396'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      },
      legend: {
        show: true,
        offsetY: 10,
        offsetX: 10,
      },
    },
  };

  return (
    <Box p={4}>
      <Typography variant="h2" gutterBottom>
        Rendimiento
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Distribución por equipos
            </Typography>
            <ApexCharts
              series={dataDonut.series}
              options={dataDonut.options}
              type="donut"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Desempeño de equipos
            </Typography>
            <ApexCharts
              series={dataBar.series}
              options={dataBar.options}
              type="bar"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Tendencia del desempeño
            </Typography>
            <ApexCharts
              series={dataLine.series}
              options={dataLine.options}
              type="line"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Área de oportunidad
            </Typography>
            <ApexCharts
              series={dataArea.series}
              options={dataArea.options}
              type="area"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Tendencia del desempeño
            </Typography>
            <ApexCharts
              series={dataLine.series}
              options={dataLine.options}
              type="radar"
              height={300}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Rendimiento de Equipos
            </Typography>
            <ApexCharts
              series={dataLine.series}
              options={dataLine.options}
              type="scatter"
              height={300}
            />
          </Paper>
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
      </Grid>
    </Box>
  );
};

export default Estadisticas;
