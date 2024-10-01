import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, styled, Button, ButtonGroup, CircularProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import EventBus from "../../../../../common/EventBus";
import UserService from '../../../../../services/user.service.jsx';

// Estilos personalizados para el Card
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
  '@media (max-width: 768px)': {
    padding: '10px',
  },
}));

// Estilos personalizados para los botones seleccionados y no seleccionados
const StyledButton1 = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? '#000000' : 'white',
  borderColor: '#fff',
  color: selected ? 'white' : '#666666',
  margin: '0px',
  '&:hover': {
    backgroundColor: selected ? 'rgb(0,0,0)' : '#f0f0f0',
    borderColor: '#fff',
  },
}));

// Estilos personalizados para los botones seleccionados y no seleccionados
const StyledButton = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? '#000000' : 'white',
  color: selected ? 'white' : '#666666',
  margin: '1px',
  '&:hover': {
    backgroundColor: selected ? 'rgb(0,0,0)' : '#fff',
    borderColor: '#000000',
  },
}));

// Mapeo de intervalos de tiempo a valores de intervalos en minutos
const intervals = {
  30: 1,
  60: 1,
  360: 6,
  720: 12,
  1440: 24,
  4320: 72,
  10080: 168,
};

// Componente principal
const MachineCard = ({ sensorId }) => {
  const [content, setContent] = useState('');
  const [chartData, setChartData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('Uso de CPU');
  const [timeRange, setTimeRange] = useState(30); // Por defecto, 30 minutos
  const [isAdminOZONO, setIsAdminOZONO] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    UserService.getAdminOZONO().then(
      (response) => {
        setContent(response.data);
        setIsAdminOZONO(true);
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
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  // Hook para obtener el rol de administrador general
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
          EventBus.dispatch('logout');
        }
      },
    );
  }, []);

  // Hook para obtener los datos del sensor periódicamente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Usa la variable de entorno para la URL base
        const API_URL = `${import.meta.env.VITE_API_URL}/sensor-data/${sensorId}`;
        const response = await axios.get(API_URL);
        const data = response.data;
        if (data && Array.isArray(data)) {
          const cpuData = data.map(item => item.data.channels.find(channel => channel.name === 'CPU usage')?.lastvalue);
          const memoryData = data.map(item => item.data.channels.find(channel => channel.name === 'Memory active')?.lastvalue_raw);
          const diskData = data.map(item => item.data.channels.find(channel => channel.name === 'Disk usage')?.lastvalue);
          const diskwData = data.map(item => item.data.channels.find(channel => channel.name === 'Disk write')?.lastvalue);
          const diskrData = data.map(item => item.data.channels.find(channel => channel.name === 'Disk read')?.lastvalue);
          const networkData = data.map(item => item.data.channels.find(channel => channel.name === 'Network usage')?.lastvalue);
          const networkrData = data.map(item => item.data.channels.find(channel => channel.name === 'Network received')?.lastvalue);
          const networktData = data.map(item => item.data.channels.find(channel => channel.name === 'Network transmitted')?.lastvalue);

          setChartData([
            { name: 'Uso de CPU', data: cpuData.reverse() },
            { name: 'Memoria Consumida', data: memoryData.reverse() },
            { name: 'Uso de Disco', data: diskData.reverse() },
            { name: 'Lectura de Disco', data: diskrData.reverse() },
            { name: 'Escritura de Disco', data: diskwData.reverse() },
            { name: 'Consumo de red', data: networkData.reverse() },
            { name: 'Datos recibidos en Red', data: networkrData.reverse() },
            { name: 'Datos transmitidos en Red', data: networktData.reverse() },
          ]);

          setTimestamps(data.map(item => new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })).reverse());
        } else {
          setError('Formato de datos incorrecto');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error.message);
        setError('¡No se pudieron recuperar los datos!');
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [sensorId]);

// Función para filtrar los datos basado en el rango de tiempo seleccionado
  const getFilteredData = (data, range) => {
    const interval = intervals[range] || 1;
    const length = data.length;
    return data.filter((_, index) => index % interval === 0).slice(-Math.ceil(range / interval));
  };

  // Filtrar los datos y timestamps basado en el rango de tiempo seleccionado
  const filteredData = chartData.map(dataset => ({
    ...dataset,
    data: getFilteredData(dataset.data, timeRange),
  }));

  const filteredTimestamps = getFilteredData(timestamps, timeRange);

  // Manejar el cambio de rango de tiempo
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Manejar el cambio de métrica seleccionada
  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
  };

  // Opciones de configuración del gráfico
  const chartOptions = {
    chart: {
      type: 'area',
      height: '100%',
      zoom: { enabled: true },
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
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'category',
      categories: filteredTimestamps,
    },
    yaxis: {
      labels: {
        formatter: function(value) {
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
        show: true, format: 'dd MMM - HH:mm', type: 'category',
        categories: filteredTimestamps,
      },
      y: {
        formatter: function(value) {
          if (selectedMetric === 'Uso de CPU') return `${value.toFixed(0)} %`;
          if (selectedMetric === 'Memoria Consumida') return `${(value / (1024 ** 3)).toFixed(1)} GB`;
          if (selectedMetric === 'Uso de Disco') return `${value.toFixed(0)} Mb/s`;
          if (selectedMetric === 'Lectura de Disco') return `${value.toFixed(0)} Mb/s`;
          if (selectedMetric === 'Escritura de Disco') return `${value.toFixed(0)} Mb/s`;
          if (selectedMetric === 'Consumo de red') return `${value.toFixed(0)} Mb/s`;
          if (selectedMetric === 'Datos recibidos en Red') return `${value.toFixed(1)} Mb/s`;
          if (selectedMetric === 'Datos transmitidos en Red') return `${value.toFixed(0)} Mb/s`;
          return value.toFixed(0);
        },
      },
    },
    colors: ['#EF5485'],
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

  // Obtener los datos seleccionados para la métrica actual
  const selectedData = filteredData.find(dataset => dataset.name === selectedMetric);

  if (isAdminOZONO) {
    return (
      <StyledCard>
        <div className="button-container">
          <ButtonGroup size="small">
            {['Uso de CPU', 'Memoria Consumida', 'Uso de Disco', 'Lectura de Disco', 'Escritura de Disco', 'Consumo de red', 'Datos recibidos en Red', 'Datos transmitidos en Red'].map(metric => (
              <StyledButton1
                key={metric}
                onClick={() => handleMetricChange(metric)}
                selected={selectedMetric === metric}
              >
                {metric}
              </StyledButton1>
            ))}
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-20px' }}>
          <ButtonGroup size="small">
            {[
              { label: '30 min', value: 30 },
              { label: '1 hora', value: 60 },
              { label: '6 horas', value: 360 },
              { label: '12 horas', value: 720 },
              { label: '1 día', value: 1440 },
              { label: '3 días', value: 4320 },
              { label: '1 semana', value: 10080 },
            ].map(range => (
              <StyledButton
                key={range.value}
                onClick={() => handleTimeRangeChange(range.value)}
                selected={timeRange === range.value}
              >
                {range.label}
              </StyledButton>
            ))}
          </ButtonGroup>
        </div>
        {loading ? (
          <div style={{ color:'#EF5485', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width:'100%' }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : filteredData.length === 0 || filteredTimestamps.length === 0 ? (
          <p>Datos no disponibles</p>
        ) : (
          <Chart options={chartOptions} series={selectedData ? [selectedData] : []} type="area" height={340} />
        )}
      </StyledCard>
    );
  }

  // Componente de renderizado para administradores generales
  if (isAdmin) {
    return (
      <StyledCard>
        <div className="button-container">
          <ButtonGroup size="small">
            {['Uso de CPU', 'Memoria Consumida', 'Uso de Disco', 'Lectura de Disco', 'Escritura de Disco', 'Consumo de red', 'Datos recibidos en Red', 'Datos transmitidos en Red'].map(metric => (
              <StyledButton1
                key={metric}
                onClick={() => handleMetricChange(metric)}
                selected={selectedMetric === metric}
              >
                {metric}
              </StyledButton1>
            ))}
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-20px' }}>
          <ButtonGroup size="small">
            {[
              { label: '30 min', value: 30 },
              { label: '1 hora', value: 60 },
              { label: '6 horas', value: 360 },
              { label: '12 horas', value: 720 },
              { label: '1 día', value: 1440 },
              { label: '3 días', value: 4320 },
              { label: '1 semana', value: 10080 },
            ].map(range => (
              <StyledButton
                key={range.value}
                onClick={() => handleTimeRangeChange(range.value)}
                selected={timeRange === range.value}
              >
                {range.label}
              </StyledButton>
            ))}
          </ButtonGroup>
        </div>
        {loading ? (
          <div style={{ color:'#EF5485', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width:'100%' }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : filteredData.length === 0 || filteredTimestamps.length === 0 ? (
          <p>Datos no disponibles</p>
        ) : (
          <Chart options={chartOptions} series={selectedData ? [selectedData] : []} type="area" height={340} />
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
