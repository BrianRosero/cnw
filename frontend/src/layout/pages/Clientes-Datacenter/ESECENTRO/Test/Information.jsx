import React from 'react';
import { Box, Card, CardContent, Grid, Typography, styled } from '@mui/material';
import Chart from 'react-apexcharts';

// Estilos personalizados para el contenedor del mini-gráfico
const MiniChartContainer = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Estilos personalizados para el texto de información
const InfoText = styled(Typography)(({ theme }) => ({
  color: '#282c60',
  fontSize: '0.9rem',
  marginRight: theme.spacing(1),
}));

// Función para formatear valores de GB con dos decimales
const formatGB = (gb) => {
  if (typeof gb === 'number') {
    return gb.toFixed(2);
  }
  return gb;
};

// Componente funcional Information
const Information = ({ selectedVm, chartData }) => {
  // Si no hay datos disponibles, muestra un mensaje
  if (!selectedVm || !chartData || !chartData.cpu?.length || !chartData.memory?.length) {
    return <p>Cargando información...</p>;
  }

  // Obtiene los últimos valores de CPU y memoria
  const latestCpu = chartData.cpu.at(-1);
  const latestMemoryUsedMb = chartData.memory.at(-1); // Valor en MB
  const latestMemoryUsedGb = latestMemoryUsedMb / 1024; // Convertir MB a GB
  const totalMemoryGb = selectedVm.memory_gb;
  const storageTotalGb = selectedVm.storage_total_gb;
  const totalGuestDiskUsedSpaceGB = selectedVm.totalGuestDiskUsedSpaceGB;
  const totalStorageGb = selectedVm.total_storage_gb; // Asume que tienes esta propiedad

  // Calcula los porcentajes de uso de memoria y almacenamiento
  const memoryUsagePercentage = totalMemoryGb ? (latestMemoryUsedGb / totalMemoryGb) * 100 : 0;
  const storageUsagePercentage = totalStorageGb ? (storageTotalGb / totalStorageGb) * 100 : 0;

  const gaugeChart = (label, value, max, color = '#1a73e8') => ({
    chart: {
      type: 'radialBar',
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '70%' },
        dataLabels: {
          name: {
            offsetY: 0,
            color: '#6a6969',
            fontSize: '14px',
          },
          value: {
            fontSize: '22px',
            color: '#282c60',
            offsetY: 5,
          },
        },
      },
    },
    labels: [label],
    colors: [color],
    series: [Math.min((value / max) * 100, 100)], // Para que se adapte al gauge
  });

  // Opciones de configuración para el gráfico de CPU
  const cpuOptions = {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
          background: 'transparent', // Fondo transparente para el centro
          image: undefined,
        },
        track: {
          strokeWidth: '150%',
          background: '#e0e0e0',
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            formatter: (val) => `${val}%`, // Formatear el valor con porcentaje
            fontSize: '1rem',
            color: '#282c60',
            offsetY: 5,
          },
        },
        strokeWidth: '12px',
      },
    },
    colors: ['#009100'],
    stroke: {
      lineCap: 'round',
    },
  };

  // Opciones de configuración para el gráfico de memoria
  const memoryOptions = {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
          background: 'transparent',
          image: undefined,
        },
        track: {
          strokeWidth: '150%',
          background: '#e0e0e0',
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            formatter: (val) => `${val}%`, // Formatear el valor con porcentaje
            fontSize: '1rem',
            color: '#282c60',
            offsetY: 5,
          },
        },
        strokeWidth: '12px',
      },
    },
    colors: ['#1a73e8'],
    stroke: {
      lineCap: 'round',
    },
  };

  // Opciones de configuración para el gráfico de almacenamiento
  const storageOptions = {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
          background: 'transparent',
          image: undefined,
        },
        track: {
          strokeWidth: '150%',
          background: '#e0e0e0',
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            formatter: (val) => `${val}%`, // Formatear el valor con porcentaje
            fontSize: '1rem',
            color: '#282c60',
            offsetY: 5,
          },
        },
        strokeWidth: '12px',
      },
    },
    colors: ['#fbbc05'],
    stroke: {
      lineCap: 'round',
    },
  };

  // Series de datos para los gráficos
  const cpuSeries = [latestCpu ? latestCpu : 0];
  const memorySeries = [Math.round(memoryUsagePercentage)];
  const storageSeries = [Math.round(storageUsagePercentage)];

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4} alignItems="center" sx={{ mt: -6 }}> {/* Ajuste con marginTop negativo */}
          <Grid item>
            <Box display="flex" alignItems="center">
              <InfoText variant="body2"><strong>CPU:</strong> {latestCpu} MHz</InfoText>
              <MiniChartContainer>
                <Chart options={cpuOptions} series={cpuSeries} type="radialBar" height={80} width={80} />
              </MiniChartContainer>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <InfoText variant="body2"><strong>Memoria:</strong> {formatGB(latestMemoryUsedGb)} GB</InfoText>
              <MiniChartContainer>
                <Chart options={memoryOptions} series={memorySeries} type="radialBar" height={80} width={80} />
              </MiniChartContainer>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <InfoText variant="body2"><strong>Almacenamiento:</strong> {Math.round(storageTotalGb)} GB</InfoText>
              <MiniChartContainer>
                <Chart options={storageOptions} series={storageSeries} type="radialBar" height={80} width={80} />
              </MiniChartContainer>
            </Box>
          </Grid>
          {/* Otros datos */}
          <Grid item>
            <InfoText variant="body2"><strong>Núcleos:</strong> {selectedVm.nucleos}</InfoText>
          </Grid>
          <Grid item>
            <InfoText variant="body2"><strong>Núcleos:</strong>{Math.round(totalGuestDiskUsedSpaceGB)} GB</InfoText>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Information;