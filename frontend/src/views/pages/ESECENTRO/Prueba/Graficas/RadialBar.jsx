import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import Chart from 'react-apexcharts';

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
  series: [67],
  plotOptions: {
    radialBar: {
      dataLabels: {
        total: {
          show: true,
          label: 'Total'
        }
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
    dataLabels: {
      name: {
        offsetY: -10,
        color: "#fff",
        fontSize: "13px"
      },
      value: {
        color: "#fff",
        fontSize: "30px",
        show: true
      }
    }
  },
  labels: ['Uso de CPU', 'Uso de memoria', 'Uso de Disco', 'Uso de Red'],
  colors: ['#1a73e8', '#34a853', '#fbbc05', '#b43939'],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
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
}));

const MachineCard = ({ sensorId }) => {
  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.200.155:8081/prtg-api/ESECENTRO/COCLOESECAP02/${sensorId}`);
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

  const chartSeries = [
    parseFloat(channelData[channelIDs.cpuUsage]?.lastvalue) || 0,
    parseFloat(channelData[channelIDs.memoryConsumedPercent]?.lastvalue) || 0,
    parseFloat(channelData[channelIDs.memoryActive]?.lastvalue) || 0,
    parseFloat(channelData[channelIDs.cpuReadyPercent]?.lastvalue) || 0,
  ];

  return (
    <StyledCard>
      <CardContent>
        <Grid>
          <Chart options={chartOptions} series={chartSeries} type="radialBar" height={350} />
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default MachineCard