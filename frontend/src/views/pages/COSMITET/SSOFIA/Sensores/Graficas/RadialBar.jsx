import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import Chart from 'react-apexcharts';
import sensorData from '../../../../../../sensorData.jsx'; // Asegúrate de que la ruta sea correcta

const channelIDs = {
  cpuReadyPercent: 6,
  cpuUsage: 2,
  diskRead: 7,
  diskUsage: 5,
  diskWrite: 3,
  memoryActive: 9,
  memoryConsumed: 11,
  memoryConsumedPercent: 10,
  networkReceived: 8,
  networkTransmitted: 4,
  networkUsage: 12,
};

const chartOptions = {
  chart: {
    type: 'radialBar',
    sparkline: {
      enabled: true,
    },
    events: {
      mounted: function (chartContext, config) {
        chartContext.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
        });
      },
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 215,
      dataLabels: {
        name: {
          offsetY: -9,
          fontSize: '13px',
        },
        value: {
          fontSize: '20px',
          show: true,
        },
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
    },
  },
  labels: ['Uso de CPU', 'Uso de memoria', 'Uso de Disco', 'Uso de Red'],
  colors: ['#0693e3', '#1a73e8', '#fbbc05', '#b43939'],
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      gradientToColors: ['#87D4F9', '#87D4F9', '#87D4F9', '#87D4F9'],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'round',
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val + '%';
      },
    },
  },
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  color: '#ffffff',
  padding: '0px',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#0693e3',
  fontWeight: 'bold',
  fontSize: '1.5rem',
}));

const InfoText = styled(Typography)(({ theme }) => ({
  color: '#6a6969',
  fontSize: '1.1rem',
}));

const StatusButton = styled(Button)(({ theme, active }) => ({
  backgroundColor: active ? '#00e676' : '#ff1744',
  color: '#fff',
  '&:hover': {
    backgroundColor: active ? '#00c853' : '#d50000',
  },
  borderRadius: '8px',
}));

const MachineCard = ({ sensorId }) => {
  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [machineActive, setMachineActive] = useState(false);
  const [sensorInfo, setSensorInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Usa la variable de entorno para la URL base
        const API_URL = import.meta.env.VITE_API_URL;

        // Fetch sensor info
        const sensorResponse = await axios.get(`${API_URL}/sensor/${sensorId}`);
        const apiSensorData = sensorResponse.data;

        // Fetch channel data
        const response = await axios.get(`${API_URL}/canales/${sensorId}`);
        const data = response.data.reduce((acc, channel) => {
          acc[channel.objid] = channel;
          return acc;
        }, {});
        setChannelData(data);

        // Combine API data with local sensorData
        const localSensorData = sensorData[sensorId] || {};
        const combinedSensorData = {
          ...apiSensorData,
          cpu: localSensorData.cpu,
          disk: (localSensorData.disk / (1024 * 1024)).toFixed(2),
          ip: localSensorData.ip,
        };

        setSensorInfo(combinedSensorData);

        // Set machine active status based on sensor status
        setMachineActive(apiSensorData.status === 'OK');

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from PRTG API:', error.message);
        setError('Failed to fetch data from PRTG API');
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000); // Refrescar cada 2 segundos

    return () => clearInterval(intervalId);
  }, [sensorId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Calculate memory usage percentage
  const memoryConsumed = parseFloat(channelData[channelIDs.memoryConsumed]?.lastvalue).toFixed(0) || 0;
  const memoryActive = parseFloat(channelData[channelIDs.memoryActive]?.lastvalue).toFixed(0) || 0;
  const memoryUsagePercent = memoryConsumed > 0 ? ((memoryActive / memoryConsumed) * 100).toFixed(0) : 0;

  const chartSeries = [
    parseFloat(channelData[channelIDs.cpuUsage]?.lastvalue).toFixed(0) || 0,
    memoryUsagePercent,
    parseFloat(channelData[channelIDs.diskUsage]?.lastvalue).toFixed(0) || 0,
    parseFloat(channelData[channelIDs.networkUsage]?.lastvalue).toFixed(0) || 0,
  ];

  if (!sensorInfo) {
    return <p>No se encontraron datos para el sensor ID {sensorId}</p>;
  }

  return (
    <StyledCard>
      <CardContent>
        <Title variant="h1" gutterBottom>
          Información de la Máquina Virtual
        </Title>
        <Divider style={{ backgroundColor: '#0693e3' }} />
        <InfoText variant="body5">
          <strong>Nombre de la maquina virtual:</strong> {sensorInfo.name}
        </InfoText>
        <InfoText variant="body2">
          <strong>Estado:</strong> {machineActive ? 'Activa' : 'Apagada'}
        </InfoText>
        <Box marginY={2}>
          <StatusButton variant="contained" active={machineActive}>
            {machineActive ? 'Encendida' : 'Apagada'}
          </StatusButton>
        </Box>
        <InfoText variant="body2">
          <strong>Disco duro:</strong> {sensorInfo.disk} TB
        </InfoText>
        <InfoText variant="body2">
          <strong>RAM:</strong> {parseFloat(channelData[channelIDs.memoryConsumed]?.lastvalue) || 0} GB
        </InfoText>
        <InfoText variant="body2">
          <strong>IP:</strong> {sensorInfo.ip}
        </InfoText>
        <InfoText variant="body2">
          <strong>Procesadores virtuales:</strong> {sensorInfo.cpu} Vcpu´s
        </InfoText>
        <Divider style={{ backgroundColor: '#0693e3', margin: '0px 0' }} />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Chart options={chartOptions} series={chartSeries} type="radialBar" height={250} />
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default MachineCard;
