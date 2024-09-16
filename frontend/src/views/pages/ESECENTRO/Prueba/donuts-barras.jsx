import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from '@mui/material';
import ApexCharts from 'react-apexcharts';

const BoardESECENTRO = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.200.155:8081/prtg-api');
        setSensorData(response.data.sensors);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };
    // Realizar la primera solicitud al montar el componente
    fetchData();
  }, []);

  // Extraer datos para los gráficos
  const labels = sensorData.map(sensor => sensor.device);
  const values = sensorData.map(sensor => parseFloat(sensor.lastvalue));

  const dataDonut = {
    series: values,
    options: {
      chart: {
        type: 'donut',
      },
      labels: labels,
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    },
  };

  const dataBar = {
    series: [
      {
        name: 'Valor del sensor',
        data: values,
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
        categories: labels,
      },
    },
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Estadísticas de Sensores
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
      </Grid>
    </Box>
  );
};

export default BoardESECENTRO;
