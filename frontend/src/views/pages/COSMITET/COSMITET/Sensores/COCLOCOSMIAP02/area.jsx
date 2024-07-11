import React from 'react';
import MachineCard from '../Graficas/Area.jsx';

const Sensor2156 = () => {
  return <MachineCard sensorId={2211} />;
};

export default Sensor2156;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, styled } from '@mui/material';
import Chart from 'react-apexcharts';

const channelIDs = {
  cpuUsage: 2,
  diskUsage: 5,
  memoryConsumedPercent: 10,
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  border: '1px solid #ddd',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  boxSizing: 'border-box',
  maxWidth: '100%',
  width: '100%',
}));

const MachineCard = ({ sensorId }) => {
  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cpuUsageData, setCpuUsageData] = useState([]);
  const [diskUsageData, setDiskUsageData] = useState([]);
  const [memoryUsageData, setMemoryUsageData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.200.155:8080/prtg-api/${sensorId}`);
        const data = response.data.channels.reduce((acc, channel) => {
          acc[channel.objid] = channel;
          return acc;
        }, {});
        setChannelData(data);

        updateChartData(data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from PRTG API:', error.message);
        setError('Failed to fetch data from PRTG API');
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [sensorId]);

  const updateChartData = (data) => {
    const cpuUsageValue = parseFloat(data[channelIDs.cpuUsage]?.lastvalue);
    const diskUsageValue = parseFloat(data[channelIDs.diskUsage]?.lastvalue);
    const memoryUsageValue = parseFloat(data[channelIDs.memoryConsumedPercent]?.lastvalue);

    axios.post('http://192.168.200.155:8080/saveData', {
      sensorId,
      cpuUsage: cpuUsageValue || 0,
      diskUsage: diskUsageValue || 0,
      memoryUsage: memoryUsageValue || 0
    }).catch(error => {
      console.error('Error saving data:', error.message);
    });

    if (cpuUsageValue) {
      setCpuUsageData((prevData) => [...prevData, cpuUsageValue]);
    }
    if (diskUsageValue) {
      setDiskUsageData((prevData) => [...prevData, diskUsageValue]);
    }
    if (memoryUsageValue) {
      setMemoryUsageData((prevData) => [...prevData, memoryUsageValue]);
    }

    const now = new Date();
    setTimestamps((prevTimes) => [...prevTimes, now.toLocaleTimeString()]);
  };

  const fetchHistoricalData = (timeRange) => {
    const now = new Date();
    let startTime;

    if (timeRange === 30) {
      startTime = new Date(now - 30 * 60 * 1000);
    } else if (timeRange === 60) {
      startTime = new Date(now - 60 * 60 * 1000);
    } else if (timeRange === 1440) {
      startTime = new Date(now - 24 * 60 * 60 * 1000);
    }

    axios.get('http://192.168.200.155:8080/getData', {
      params: {
        sensorId,
        startTime: startTime.toISOString(),
        endTime: now.toISOString()
      }
    }).then(response => {
      const data = response.data;
      setCpuUsageData(data.map(item => item.cpu_usage));
      setDiskUsageData(data.map(item => item.disk_usage));
      setMemoryUsageData(data.map(item => item.memory_usage));
      setTimestamps(data.map(item => new Date(item.timestamp).toLocaleTimeString()));
    }).catch(error => {
      console.error('Error fetching data:', error.message);
    });
  };

  const chartOptions = {
    chart: {
      type: 'area',
      height: '100%',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: timestamps,
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return value.toFixed(2) + '%';
        },
      },
    },
    tooltip: {
      x: {
        show: true,
        format: 'HH:mm:ss',
      },
    },
    colors: ['#004a8f', '#00b8a9', '#ffbb44'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const chartSeries = [
    {
      name: 'Uso de CPU',
      data: cpuUsageData,
    },
    {
      name: 'Uso de Disco',
      data: diskUsageData,
    },
    {
      name: 'Uso de Memoria',
      data: memoryUsageData,
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <style>
        {`
          .area-graph-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
          }
          .button-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          .button-container button {
            margin: 0 10px;
            padding: 10px 20px;
            border: none;
            background-color: #004a8f;
            color: white;
            cursor: pointer;
            border-radius: 5px;
          }
          .button-container button:hover {
            background-color: #00376b;
          }
        `}
      </style>
      <StyledCard>
        <div className="button-container">
          <button onClick={() => fetchHistoricalData(30)}>30 minutos</button>
          <button onClick={() => fetchHistoricalData(60)}>1 hora</button>
          <button onClick={() => fetchHistoricalData(1440)}>24 horas</button>
        </div>
        <Chart options={chartOptions} series={chartSeries} type="area" height="100%" />
      </StyledCard>
    </>
  );
};

export default MachineCard;*/
