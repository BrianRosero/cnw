import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import EventBus from "@/common/EventBus";
import UserService from '@/services/user.service.jsx';

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

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  color: '#ffffff',
}));

const MetricItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  background: '#ffffff',
  borderRadius: 8,
  margin: theme.spacing(1),
  flex: 1,
}));

const MachineCard = ({ sensorId }) => {
  const [content, setContent] = useState("");
  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAdminESECENTRO, setIsAdminESECENTRO] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    UserService.getAdminESECENTRO().then(
      (response) => {
        setContent(response.data);
        setIsAdminESECENTRO(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        setIsAdmin(true);
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/prtg-api/ESECENTRO/COCLOESECAP02/${sensorId}`);
        const data = response.data.channels.reduce((acc, channel) => {
          acc[channel.objid] = channel;
          return acc;
        }, {});
        setChannelData(data);
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

  const metricsAdmin = [
    { label: 'CPU Lista ', value: channelData[channelIDs.cpuReadyPercent]?.lastvalue || 'N/A' },
    { label: 'Uso de CPU ', value: channelData[channelIDs.cpuUsage]?.lastvalue || 'N/A' },
    { label: 'Lectura Disco ', value: channelData[channelIDs.diskRead]?.lastvalue || 'N/A' },
    { label: 'Uso de Disco ', value: channelData[channelIDs.diskUsage]?.lastvalue || 'N/A' },
    { label: 'Escritura Disco ', value: channelData[channelIDs.diskWrite]?.lastvalue || 'N/A' },
    { label: 'Memoria Activa ', value: channelData[channelIDs.memoryActive]?.lastvalue || 'N/A' },
    { label: 'Memoria Consumida ', value: channelData[channelIDs.memoryConsumed]?.lastvalue || 'N/A' },
    { label: 'Memoria Consumida ', value: channelData[channelIDs.memoryConsumedPercent]?.lastvalue || 'N/A' },
    { label: 'Datos Recibidos en Red ', value: channelData[channelIDs.networkReceived]?.lastvalue || 'N/A' },
    { label: 'Datos Transmitidos en Red ', value: channelData[channelIDs.networkTransmitted]?.lastvalue || 'N/A' },
    { label: 'Datos Usados en Red', value: channelData[channelIDs.networkUsage]?.lastvalue || 'N/A' },
  ];

  const metrics = [
    { label: 'Uso de CPU ', value: channelData[channelIDs.cpuUsage]?.lastvalue || 'N/A' },
    { label: 'Uso de Disco ', value: channelData[channelIDs.diskUsage]?.lastvalue || 'N/A' },
    { label: 'Memoria Consumida ', value: channelData[channelIDs.memoryConsumed]?.lastvalue || 'N/A' },
    { label: 'Memoria Consumida ', value: channelData[channelIDs.memoryConsumedPercent]?.lastvalue || 'N/A' },
    ];

  if (isAdminESECENTRO) {
    return (
      <StyledCard>
        <CardContent>
          <Grid container>
            <Grid container spacing={1}>
              {metrics.map((metric, index) => (
                <MetricItem key={index}>
                  <Typography variant="h5" style={{ color: '#555555' }}>{metric.label}</Typography>
                  <Typography> </Typography>
                  <Typography variant="h4" style={{ color: '#15708d' }}>{metric.value}</Typography>
                </MetricItem>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    );
  }
  if (isAdmin) {
    return (
      <StyledCard>
        <CardContent>
          <Grid container>
            <Grid container spacing={1}>
              {metricsAdmin.map((metric, index) => (
                <MetricItem key={index}>
                  <Typography variant="h5" style={{ color: '#555555' }}>{metric.label}</Typography>
                  <Typography> </Typography>
                  <Typography variant="h4" style={{ color: '#15708d' }}>{metric.value}</Typography>
                </MetricItem>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    );
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default MachineCard;
