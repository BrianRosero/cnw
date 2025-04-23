import React from 'react';
import Chart from 'react-apexcharts';
import { styled, Card } from '@mui/material';

// Estilos personalizados para el contenedor del gráfico
export const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  border: 'none',
  borderRadius: '0',
  boxShadow: 'none',
  padding: '20px',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  '@media (max-width: 768px)': {
    padding: '0',
  },
}));

// Opciones de configuración del gráfico
export const getChartOptions = (filteredTimestamps, selectedMetric) => ({
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
      formatter: function (value) {
        switch (selectedMetric) {
          case 'Uso de CPU': return `${value.toFixed(0)} %`;
          case 'Memoria Consumida': return `${(value / (1024 ** 3)).toFixed(1)} GB`;
          case 'Uso de Disco':
          case 'Lectura de Disco':
          case 'Escritura de Disco': return `${value.toFixed(0)} Mb/s`;
          case 'Consumo de red':
          case 'Datos recibidos en Red':
          case 'Datos transmitidos en Red': return `${value.toFixed(1)} Mb/s`;
          default: return value.toFixed(0);
        }
      },
    },
  },
  tooltip: {
    x: { show: true, format: 'dd MMM - HH:mm', type: 'category' },
    y: {
      formatter: function (value) {
        switch (selectedMetric) {
          case 'Uso de CPU': return `${value.toFixed(0)} %`;
          case 'Memoria Consumida': return `${(value / (1024 ** 3)).toFixed(1)} GB`;
          case 'Uso de Disco':
          case 'Lectura de Disco':
          case 'Escritura de Disco': return `${value.toFixed(0)} Mb/s`;
          case 'Consumo de red':
          case 'Datos recibidos en Red':
          case 'Datos transmitidos en Red': return `${value.toFixed(1)} Mb/s`;
          default: return `${(value / (1024 ** 3)).toFixed(1)} GB`;
        }
      },
    },
  },
  colors: ['#282c60'],
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 100] },
  },
  responsive: [
    { breakpoint: 768, options: { chart: { height: 300 }, legend: { position: 'bottom' } } },
    { breakpoint: 480, options: { chart: { height: 250 }, xaxis: { labels: { show: true } }, yaxis: { labels: { show: false } } } },
  ],
});

export const GraficasArea = ({ chartOptions, chartData }) => {
  return (
    <StyledCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

        <div>
          <h4 style={{ textAlign: 'center', marginBottom: '-25px' }}>Consumo de RAM (MB)</h4>
          <Chart
            options={{
              ...chartOptions,
              xaxis: { ...chartOptions.xaxis, categories: chartData.timestamps },
              yaxis: { ...chartOptions.yaxis, labels: { formatter: (value) => `${value.toFixed(0)} MB` } },
              tooltip: { ...chartOptions.tooltip, y: { formatter: (value) => `${value.toFixed(0)} MB` } },
            }}
            series={[{ name: 'RAM (MB)', data: chartData.memory }]}
            type="area"
            height={230}
          />
        </div>
        <div>
          <h4 style={{ textAlign: 'center', marginTop: '-45px', marginBottom: '-25px' }}>Consumo de CPU (MHz)</h4>
          <Chart
            options={{
              ...chartOptions,
              xaxis: { ...chartOptions.xaxis, categories: chartData.timestamps },
              yaxis: { ...chartOptions.yaxis, labels: { formatter: (value) => `${value.toFixed(0)} MHz` } },
              tooltip: { ...chartOptions.tooltip, y: { formatter: (value) => `${value.toFixed(0)} MHz` } },
            }}
            series={[{ name: 'CPU (MHz)', data: chartData.cpu }]}
            type="area"
            height={230}
          />
        </div>
      </div>
    </StyledCard>
  );
};