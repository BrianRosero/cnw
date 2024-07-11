import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, styled, Button, ButtonGroup } from '@mui/material';
import Chart from 'react-apexcharts';
import EventBus from "../../../../../common/EventBus";
import UserService from '../../../../../services/user.service.jsx';

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
  '@media (max-width: 768px)': { // Para tabletas y teléfonos
    padding: '10px',
  },
}));

const StyledButton1 = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? 'rgba(37,61,144,0.95)' : 'white',
  color: selected ? 'white' : '#5e7775',
  margin: '1px',
  '&:hover': {
    backgroundColor: selected ? 'rgba(37,61,144,0.95)' : '#f0f0f0',
  },
}));

const StyledButton = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? 'rgba(37,61,144,0.95)' : 'white',
  color: selected ? 'white' : '#5e7775',
  margin: '1px',
  '&:hover': {
    backgroundColor: selected ? 'rgba(37,61,144,0.95)' : '#fff',
  },
}));

const MachineCard = ({ sensorId }) => {
  const [content, setContent] = useState("");
  const [chartData, setChartData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('Uso de CPU');
  const [timeRange, setTimeRange] = useState(30); // Por defecto, 30 minutos

  const [isAdminCOSMITET, setIsAdminCOSMITET] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    UserService.getAdminCOSMITET().then(
      (response) => {
        setContent(response.data);
        setIsAdminCOSMITET(true);
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
        const response = await axios.get(`http://192.168.200.155:8080/sensor-data/${sensorId}`);
        const data = response.data;

        if (data && Array.isArray(data)) {
          const cpuData = data.map(item => item.data.channels.find(channel => channel.name === 'CPU usage')?.lastvalue);
          const memoryData = data.map(item => item.data.channels.find(channel => channel.name === 'Memory active' )?.lastvalue_raw);
          const diskData = data.map(item => item.data.channels.find(channel => channel.name === 'Disk usage')?.lastvalue);
          const diskwData = data.map(item => item.data.channels.find(channel => channel.name === 'Disk write')?.lastvalue);
          const diskrData = data.map(item => item.data.channels.find(channel => channel.name === 'Disk read')?.lastvalue);
          const networkData = data.map(item => item.data.channels.find(channel => channel.name === 'Network usage')?.lastvalue);
          const networkrData = data.map(item => item.data.channels.find(channel => channel.name === 'Network received')?.lastvalue);
          const networktData = data.map(item => item.data.channels.find(channel => channel.name === 'Network transmitted')?.lastvalue);

          setChartData([
            { name: 'Uso de CPU', data: cpuData.reverse() }, // Invertir los datos
            { name: 'Memoria Consumida', data: memoryData.reverse() }, // Invertir los datos
            { name: 'Uso de Disco', data: diskData.reverse() }, // Invertir los datos
            { name: 'Lectura de Disco', data: diskrData.reverse() }, // Invertir los datos
            { name: 'Escritura de Disco', data: diskwData.reverse() }, // Invertir los datos
            { name: 'Consumo de red', data: networkData.reverse() }, // Invertir los datos
            { name: 'Datos recibidos en Red', data: networkrData.reverse() }, // Invertir los datos
            { name: 'Datos transmitidos en Red', data: networktData.reverse() } // Invertir los datos
          ]);

          setTimestamps(data.map(item => new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })).reverse()); // Invertir los timestamps
        } else {
          setError('Data format is incorrect');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Actualizar cada minuto

    return () => clearInterval(intervalId);
  }, [sensorId]);

  const filteredData = chartData.map(dataset => ({
    ...dataset,
    data: dataset.data.slice(-timeRange) // Filtrar datos según el rango de tiempo
  }));

  const filteredTimestamps = timestamps.slice(-timeRange);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  const chartOptions = {
    chart: {
      type: 'area',
      height: '100%',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
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
      categories: filteredTimestamps,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          if (selectedMetric === 'Uso de CPU') return `${value.toFixed(0)} %`;
          if (selectedMetric === 'Memoria Consumida') return `${(value / (1024 ** 3)).toFixed(1)} GB`;
          if (selectedMetric === 'Uso de Disco') return `${value.toFixed(1)} Mb/s`;
          if (selectedMetric === 'Lectura de Disco') return `${value.toFixed(0)} Mb/s`;
          if (selectedMetric === 'Escritura de Disco') return `${value.toFixed(0)} Mb/s`;
          if (selectedMetric === 'Consumo de red') return `${value.toFixed(0)} Mb/s`;
          if (selectedMetric === 'Datos recibidos en Red') return `${value.toFixed(1)} Mb/s`;
          if (selectedMetric === 'Datos transmitidos en Red') return `${value.toFixed(0)} Mb/s`;
          return value.toFixed(0);
        },
      },
    },
    tooltip: {
      x: {
        show: true,
        format: 'HH:mm',
      },
    },
    colors: ['#ef0074'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };

  if (isAdminCOSMITET) {
  return (
    <StyledCard>
      <div className="button-container">
        <StyledButton1 selected={selectedMetric === 'Uso de CPU'} onClick={() => handleMetricChange('Uso de CPU')}>CPU</StyledButton1>
        <StyledButton1 selected={selectedMetric === 'Memoria Consumida'} onClick={() => handleMetricChange('Memoria Consumida')}>Memoria</StyledButton1>
        <StyledButton1 selected={selectedMetric === 'Uso de Disco'} onClick={() => handleMetricChange('Uso de Disco')}>Disco</StyledButton1>
        <StyledButton1 selected={selectedMetric === 'Consumo de red'} onClick={() => handleMetricChange('Consumo de red')}>Red</StyledButton1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-20px' }}>
        <ButtonGroup>
          <StyledButton selected={timeRange === 30} onClick={() => handleTimeRangeChange(30)}>30 minutos</StyledButton>
          <StyledButton selected={timeRange === 60} onClick={() => handleTimeRangeChange(60)}>1 hora</StyledButton>
          <StyledButton selected={timeRange === 1440} onClick={() => handleTimeRangeChange(1440)}>1.5 horas</StyledButton>
        </ButtonGroup>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredData.length === 0 || filteredTimestamps.length === 0 ? (
        <p>No data available</p>
      ) : (
        <Chart
          options={chartOptions}
          series={filteredData.filter(data => data.name === selectedMetric)}
          type="area"
          height={340}
        />
      )}
    </StyledCard>
  );
  }

  if (isAdmin) {
    return (
      <StyledCard>
        <div className="button-container">
          <StyledButton1 selected={selectedMetric === 'Uso de CPU'} onClick={() => handleMetricChange('Uso de CPU')}>CPU</StyledButton1>
          <StyledButton1 selected={selectedMetric === 'Memoria Consumida'} onClick={() => handleMetricChange('Memoria Consumida')}>Memoria</StyledButton1>
          <StyledButton1 selected={selectedMetric === 'Uso de Disco'} onClick={() => handleMetricChange('Uso de Disco')}>Disco</StyledButton1>
          <StyledButton1 selected={selectedMetric === 'Lectura de Disco'} onClick={() => handleMetricChange('Lectura de Disco')}>L Disco</StyledButton1>
          <StyledButton1 selected={selectedMetric === 'Escritura de Disco'} onClick={() => handleMetricChange('Escritura de Disco')}>E Disco</StyledButton1>
          <StyledButton1 selected={selectedMetric === 'Consumo de red'} onClick={() => handleMetricChange('Consumo de red')}>Red</StyledButton1>
          <StyledButton1 selected={selectedMetric === 'Datos recibidos en Red'} onClick={() => handleMetricChange('Datos recibidos en Red')}>R Red</StyledButton1>
          <StyledButton1 selected={selectedMetric === 'Datos transmitidos en Red'} onClick={() => handleMetricChange('Datos transmitidos en Red')}>T Red</StyledButton1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-20px' }}>
          <ButtonGroup>
            <StyledButton selected={timeRange === 30} onClick={() => handleTimeRangeChange(30)}>30 minutos</StyledButton>
            <StyledButton selected={timeRange === 60} onClick={() => handleTimeRangeChange(60)}>1 hora</StyledButton>
            <StyledButton selected={timeRange === 1440} onClick={() => handleTimeRangeChange(1440)}>1.5 horas</StyledButton>
          </ButtonGroup>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredData.length === 0 || filteredTimestamps.length === 0 ? (
          <p>No data available</p>
        ) : (
          <Chart
            options={chartOptions}
            series={filteredData.filter(data => data.name === selectedMetric)}
            type="area"
            height={340}
          />
        )}
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


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, styled } from '@mui/material';
import Chart from 'react-apexcharts';
import db from './indexedDB'; // Importamos la configuración de IndexedDB
import UserService from '../../../../../../services/user.service.jsx';
import EventBus from "../../../../../../common/EventBus";

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
  const [cpuReadyPercentData, setCpuReadyPercentData] = useState([]);
  const [cpuUsageData, setCpuUsageData] = useState([]);
  const [diskReadData, setDiskReadData] = useState([]);
  const [diskUsageData, setDiskUsageData] = useState([]);
  const [diskWriteData, setDiskWriteData] = useState([]);
  const [memoryActiveData, setMemoryActiveData] = useState([]);
  const [memoryConsumedData, setMemoryConsumedData] = useState([]);
  const [networkReceivedData, setNetworkReceivedData] = useState([]);
  const [networkTransmittedData, setNetworkTransmittedData] = useState([]);
  const [networkUsageData, setNetworkUsageData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminCOSMITET, setIsAdminCOSMITET] = useState(false);

  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        await UserService.getAdminBoard();
        setIsAdmin(true);
      } catch (error) {
        handleFetchError(error);
      }

      try {
        await UserService.getAdminCOSMITET();
        setIsAdminCOSMITET(true);
      } catch (error) {
        handleFetchError(error);
      }
    };

    const handleFetchError = (error) => {
      const errorMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
    };

    fetchUserPermissions();

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

  const updateChartData = async (data) => {
    const cpuReadyPercentValue = parseFloat(data[channelIDs.cpuReadyPercent]?.lastvalue) || 0;
    const cpuUsageValue = parseFloat(data[channelIDs.cpuUsage]?.lastvalue) || 0;
    const diskReadValue = parseFloat(data[channelIDs.diskRead]?.lastvalue) || 0;
    const diskUsageValue = parseFloat(data[channelIDs.diskUsage]?.lastvalue) || 0;
    const diskWriteValue = parseFloat(data[channelIDs.diskWrite]?.lastvalue) || 0;
    const memoryActiveValue = parseFloat(data[channelIDs.memoryActive]?.lastvalue) || 0;
    const memoryConsumedValue = parseFloat(data[channelIDs.memoryConsumed]?.lastvalue) || 0;
    const memoryConsumedPercent = parseFloat(data[channelIDs.memoryConsumedPercent]?.lastvalue) || 0;
    const networkReceivedValue = parseFloat(data[channelIDs.networkReceived]?.lastvalue) || 0;
    const networkTransmittedValue = parseFloat(data[channelIDs.networkTransmitted]?.lastvalue) || 0;
    const networkUsageValue = parseFloat(data[channelIDs.networkUsage]?.lastvalue) || 0;

    const now = new Date();

    // Guardar datos en IndexedDB
    try {
      await db.sensorData.add({
        sensorId,
        cpuReadyPercent: cpuReadyPercentValue,
        cpuUsage: cpuUsageValue,
        diskRead: diskReadValue,
        diskUsage: diskUsageValue,
        diskWrite: diskWriteValue,
        memoryActive: memoryActiveValue,
        memoryConsumed: memoryConsumedValue,
        memoryConsumedPercent: memoryConsumedPercent,
        networkReceived: networkReceivedValue,
        networkTransmitted: networkTransmittedValue,
        networkUsage: networkUsageValue,
        timestamp: now.toISOString()
      });
    } catch (error) {
      console.error('Error saving data to IndexedDB:', error.message);
    }

    const updateData = (setter, value) => {
      setter(prevData => {
        const newData = [...prevData, value];
        return newData.slice(-60); // Mantener solo los últimos 60 puntos de datos
      });
    };

    updateData(setCpuReadyPercentData, cpuReadyPercentValue);
    updateData(setCpuUsageData, cpuUsageValue);
    updateData(setDiskReadData, diskReadValue);
    updateData(setDiskUsageData, diskUsageValue);
    updateData(setDiskWriteData, diskWriteValue);
    updateData(setMemoryActiveData, memoryActiveValue);
    updateData(setMemoryConsumedData, memoryConsumedValue);
    updateData(setNetworkReceivedData, networkReceivedValue);
    updateData(setNetworkTransmittedData, networkTransmittedValue);
    updateData(setNetworkUsageData, networkUsageValue);

    setTimestamps(prevTimes => {
      const newTimestamps = [...prevTimes, now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })];
      return newTimestamps.slice(-60); // Mantener solo los últimos 60 timestamps
    });
  };

  const fetchHistoricalData = async (timeRange) => {
    const now = new Date();
    let startTime;

    if (timeRange === 30) {
      startTime = new Date(now - 30 * 60 * 1000);
    } else if (timeRange === 60) {
      startTime = new Date(now - 60 * 60 * 1000);
    } else if (timeRange === 1440) {
      startTime = new Date(now - 24 * 60 * 60 * 1000);
    }

    try {
      const data = await db.sensorData
        .where('sensorId')
        .equals(sensorId)
        .and(item => new Date(item.timestamp) >= startTime)
        .toArray();

      setCpuReadyPercentData(data.map(item => item.cpuReadyPercent));
      setCpuUsageData(data.map(item => item.cpuUsage));
      setDiskReadData(data.map(item => item.diskRead));
      setDiskUsageData(data.map(item => item.diskUsage));
      setDiskWriteData(data.map(item => item.diskWrite));
      setMemoryActiveData(data.map(item => item.memoryActive));
      setMemoryConsumedData(data.map(item => item.memoryConsumed));
      setNetworkReceivedData(data.map(item => item.networkReceived));
      setNetworkTransmittedData(data.map(item => item.networkTransmitted));
      setNetworkUsageData(data.map(item => item.networkUsage));

      setTimestamps(data.map(item => new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
    } catch (error) {
      console.error('Error fetching data from IndexedDB:', error.message);
    }
  };

  const chartOptions = {
    chart: {
      type: 'area',
      height: '100%',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
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
        formatter: function (value) {
          return value.toFixed(0); // Mostrar valores sin decimales
        },
      },
    },
    tooltip: {
      x: {
        show: true,
        format: 'HH:mm',
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
      data: memoryConsumedData,
    },
  ];

  const chartSeriesAdmin = [
    ...chartSeries,
    {
      name: 'CPU Listo (%)',
      data: cpuReadyPercentData,
    },
    {
      name: 'Lectura Disco',
      data: diskReadData,
    },
    {
      name: 'Escritura Disco',
      data: diskWriteData,
    },
    {
      name: 'Memoria Activa',
      data: memoryActiveData,
    },
    {
      name: 'Datos Recibidos en Red',
      data: networkReceivedData,
    },
    {
      name: 'Datos Transmitidos en Red',
      data: networkTransmittedData,
    },
    {
      name: 'Uso de Red',
      data: networkUsageData,
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
          .area-graph {
            width: 100%;
            height: 400px;
            overflow: hidden;
          }
          .container {
            max-width: 800px;
            margin: auto;
            padding: 1rem;
          }
          .jumbotron {
            text-align: center;
            background-color: #f8f9fa;
            padding: 2rem;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .jumbotron h3 {
            margin: 0;
            font-size: 1.5rem;
          }
          .metric-item {
            flex: 1;
            text-align: center;
            background: #ffffff;
            border-radius: 8px;
            margin: 1rem;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .metric-label {
            font-size: 1.2rem;
            color: #555555;
          }
          .metric-value {
            font-size: 1.5rem;
            color: #15708d;
          }
          .chart-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 1rem;
          }
          .button-container {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .button-container button {
            margin: 0 5px;
            padding: 10px 20px;
            background-color: #004a8f;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
          }
          .button-container button:hover {
            background-color: #00376b;
          }
        `}
      </style>
      <div className="button-container">
        <button onClick={() => fetchHistoricalData(30)}>30 minutos</button>
        <button onClick={() => fetchHistoricalData(60)}>1 hora</button>
        <button onClick={() => fetchHistoricalData(1440)}>24 horas</button>
      </div>
      <StyledCard>
        <div className="area-graph">
          <Chart
            options={chartOptions}
            series={isAdmin ? chartSeriesAdmin : chartSeries}
            type="area"
            height="70%"
          />
        </div>
      </StyledCard>
    </>
  );
};

export default MachineCard;*/
