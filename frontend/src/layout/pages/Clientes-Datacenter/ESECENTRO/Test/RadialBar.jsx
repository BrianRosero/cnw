import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import { styled } from '@mui/system';

const chartOptions = {
  chart: {
    type: 'radialBar',
    sparkline: {
      enabled: true,
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
  colors: ['#009100', '#1a73e8', '#fbbc05', '#b43939'],
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
      formatter: function(val) {
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
  color: '#282c60',
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

const RadialBarComponent = ({ selectedVm, chartData }) => {
  if (!selectedVm || !chartData || !chartData.cpu?.length || !chartData.memory?.length || !chartData.timestamps?.length) {
    return <p>Cargando maquinas virtuales...</p>;
  }

  const latestCpu = chartData.cpu.at(-1);
  const latestMemory = chartData.memory.at(-1);

  const data = [
    { name: 'Uso de CPU (MHz)', value: latestCpu, fill: '#8884d8' },
    { name: 'Uso de Memoria (MB)', value: latestMemory, fill: '#82ca9d' },
  ];

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg text-center">
      <StyledCard>
        <CardContent>
          {/* Título */}
          <Title variant="h1" gutterBottom>
            Información de la Máquina Virtual
          </Title>
          <Divider style={{ backgroundColor: '#282c60', margin: '5px 0 0px 0' }} />

          {/* Información principal */}
          <div className="text-left mt-4">
            <InfoText variant="body2"><strong>Nombre:</strong> {selectedVm.name}</InfoText>
            <InfoText variant="body2"><strong>Hostname:</strong> {selectedVm.hostname}</InfoText>
            {/*
            <InfoText variant="body2"><strong>Estado:</strong> {selectedVm.estado ? 'Encendida' : 'Apagada'}</InfoText>

            <InfoText variant="body2"><strong>Host:</strong> {selectedVm.host || 'Desconocido'}</InfoText>
          */}
          </div>

          {/* Botón de Estado */}
          <InfoText variant="body2"><strong>Estado: </strong>
            <StatusButton variant="contained" active={selectedVm.estado}>
              {selectedVm.estado ? 'Encendida' : 'Apagada'}
            </StatusButton>
          </InfoText>

          <Divider style={{ backgroundColor: '#282c60', margin: '5px 0 0px 0' }} />

          {/* Especificaciones de hardware */}
          <div className="text-left mt-4">
            <InfoText variant="body2"><strong>Núcleos:</strong> {selectedVm.nucleos} VCPU´s</InfoText>
            <InfoText variant="body2"><strong>Memoria RAM:</strong> {selectedVm.memory_gb} GB</InfoText>
            <InfoText variant="body2"><strong>Almacenamiento:</strong> {selectedVm.storage_total_gb} GB</InfoText>
            {/*disks: latestVm?.disks,
            <InfoText variant="body2"><strong>Cores por Socket:</strong> {selectedVm.cores_per_socket}</InfoText>
*/}
          </div>

          <Divider style={{ backgroundColor: '#282c60', margin: '0 0 0px 0' }} />

          {/* Información del sistema */}
          <div className="text-left mt-4">
            {/*<InfoText variant="body2"><strong>UUID:</strong> {selectedVm.instance_uuid}</InfoText>
            <InfoText variant="body2"><strong>VMware
              Tools:</strong> {selectedVm.tools_status} (Versión: {selectedVm.tools_version})</InfoText>*/}
            <InfoText variant="body2"><strong>OS:</strong> {selectedVm.os_fullname}</InfoText>
          </div>

          <Divider style={{ backgroundColor: '#282c60', margin: '0px 0 0px 0' }} />

          {/* Direcciones IP */}

          <div className="text-left mt-4 bg-gray-800 p-2 rounded-md max-h-32 overflow-y-auto">
            <InfoText variant="body2"><strong>Direcciones IP:</strong> {selectedVm.ip_addresses?.join(', ') || 'N/A'}
            </InfoText>

            {/*<h3 className="mt-2">Adaptadores de Red</h3>
            <ul>
              {selectedVm.network_adapters?.length > 0
                ? selectedVm.network_adapters.map((adapter, index) => <li key={index}>{adapter}</li>)
                : <li>No hay información de red</li>}
            </ul>*/}
          </div>

          {/* <Divider style={{ backgroundColor: '#282c60', margin: '10px 0' }} />

           Discos
          <div className="text-left mt-4">
            <h3 className="text-lg font-semibold">Discos</h3>
            <ul>
              {selectedVm.disks?.length > 0
                ? selectedVm.disks.map((disk, index) => <li key={index}>{disk}</li>)
                : <li>No hay información de discos</li>}
            </ul>
          </div>*/}

          {/*<Divider style={{ backgroundColor: '#282c60', margin: '0px 0 0px 0' }} />

          {/* Gráficos y métricas */}
          {/*<div className="text-left mt-4">
            <InfoText variant="body2"><strong>CPU:</strong> {latestCpu} MHz</InfoText>
            <InfoText variant="body2"><strong>Memoria:</strong> {latestMemory} MB</InfoText>
          </div>

          <div className="flex justify-center my-4">
            <RadialBarChart width={300} height={300} cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={20}
                            data={data}>
              <RadialBar minAngle={15} clockWise dataKey="value" fill="#4CAF50" />
              <Tooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff' }} />
            </RadialBarChart>
          </div>*/}

        </CardContent>
      </StyledCard>
    </div>
  );
};

export default RadialBarComponent;
