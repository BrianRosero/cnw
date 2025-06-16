import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import Chart from 'react-apexcharts';
import sensorData from '../../../../sensorData.jsx'; // Importar el archivo de datos

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
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        total: {
          show: true,
          label: 'Total'
        }
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15
        }
      },
      dataLabels1: {
        name: {
          offsetY: -10,
          color: "#fcfcfc",
          fontSize: "13px"
        },
        value: {
          color: "#ffffff",
          fontSize: "20px",
          show: true
        }
      }
    }
  },
  labels: ['Uso de CPU', 'Uso de memoria', 'Uso de Disco', 'Uso de Red'],
  colors: ['#1a73e8', '#34a853', '#fbbc05', '#b43939'],
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      gradientToColors: ["#87D4F9", "#87D4F9", "#87D4F9", "#87D4F9"],
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: "round"
  },
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  color: '#ffffff',
  padding: '0px'
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#214092',
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
  borderRadius: '25px',
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
        const response = await axios.get(`http://localhost:8083/prtg-api/${sensorId}`);
        const data = response.data.channels.reduce((acc, channel) => {
          acc[channel.objid] = channel;
          return acc;
        }, {});
        setChannelData(data);
        setMachineActive(response.data.active);

        // Obtener información del sensorData
        const sensorInfoFromData = sensorData[sensorId];
        if (sensorInfoFromData) {
          // Convertir ram y disk de bits a GB
          const convertedSensorInfo = {
            ...sensorInfoFromData,
            ram: (sensorInfoFromData.ram * 0.1 * 10).toFixed(2), // Convertir a GB y redondear a 2 decimales
            disk: (sensorInfoFromData.disk / (1024 * 1024)).toFixed(2) // Convertir a GB y redondear a 2 decimales
          };
          setSensorInfo(convertedSensorInfo);
        } else {
          console.error(`No data found for sensorId: ${sensorId}`);
          // Aquí puedes manejar el caso de datos no encontrados, por ejemplo:
          setSensorInfo({
            name: 'Sensor no encontrado',
            cpu: 'N/A',
            ram: 'N/A',
            disk: 'N/A'
          });
        }

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

  const chartSeries = [
    parseFloat(channelData[channelIDs.cpuUsage]?.lastvalue) || 0,
    parseFloat(channelData[channelIDs.memoryConsumedPercent]?.lastvalue) || 0,
    parseFloat(channelData[channelIDs.diskUsage]?.lastvalue) || 0,
    parseFloat(channelData[channelIDs.networkUsage]?.lastvalue) || 0,
  ];

  // Verificar si sensorInfo está definido antes de acceder a sus propiedades
  if (!sensorInfo) {
    return <p>No se encontraron datos para el sensor ID {sensorId}</p>;
  }

  return (
    <StyledCard>
      <CardContent>
        <Title variant="h1" gutterBottom>
          Información de la Máquina Virtual
        </Title>
        <Divider style={{ backgroundColor: '#214092' }} />
        <InfoText variant="body5">
          <strong>Nombre de la maquina virtual:</strong> {sensorInfo.name}
        </InfoText>
        <InfoText variant="body2">
          <strong>Estado:</strong> {machineActive ? 'Encendida' : 'Apagada'}
        </InfoText>
        <Box marginY={2}>
          <StatusButton variant="contained" active={machineActive}>
            {machineActive ? 'Encendido' : 'Apagado'}
          </StatusButton>
        </Box>
        <InfoText variant="body2">
          <strong>Disco duro:</strong> {sensorInfo.disk} TB
        </InfoText>
        <InfoText variant="body2">
          <strong>RAM:</strong> {sensorInfo.ram} GB
        </InfoText>
        <InfoText variant="body2">
          <strong>Núcleos de procesamiento:</strong> {sensorInfo.cpu} Vcpu's
        </InfoText>
        <Divider style={{ backgroundColor: '#214092', margin: '0px 0' }} />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Chart options={chartOptions} series={chartSeries} type="radialBar" height={350} />
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default MachineCard;
