import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ApexCharts from 'react-apexcharts';

const Estadisticas = () => {
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
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91],
      },
      {
        name: 'Series 2',
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
    },
  };

  const dataArea = {
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 25, 50, 49, 60, 70, 91],
      },
      {
        name: 'Series 2',
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
    },
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Estadísticas
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Gráfico de donut
            </Typography>
            <ApexCharts
              series={dataDonut.series}
              options={dataDonut.options}
              type="donut"
              height={350}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Gráfico de barras horizontales
            </Typography>
            <ApexCharts
              series={dataBar.series}
              options={dataBar.options}
              type="bar"
              height={350}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Gráfico de líneas
            </Typography>
            <ApexCharts
              series={dataLine.series}
              options={dataLine.options}
              type="line"
              height={350}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h3" gutterBottom>
              Gráfico de áreas
            </Typography>
            <ApexCharts
              series={dataArea.series}
              options={dataArea.options}
              type="area"
              height={350}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Estadisticas;
