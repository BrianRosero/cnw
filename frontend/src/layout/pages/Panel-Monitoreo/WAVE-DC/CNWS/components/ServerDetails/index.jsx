import React, { useEffect, useState } from 'react';

// @mui material components
import { Card, CardContent, Grid, Divider, Typography } from '@mui/material';

// Soft UI Dashboard PRO React components
import SoftBox from '@/components/SoftBox';
import SoftTypography from '@/components/SoftTypography';
import SoftButton from '@/components/SoftButton';

// Images
import serverpng from '@/assets/images/vcenter (2).png';
import wavesWhite from '@/assets/images/shapes/waves-white.svg';
import Chart from 'react-apexcharts';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const API_URL = 'http://192.168.200.155:8083/vcenter/resources-cnws';

function ServerDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (!data) return <p>Error al cargar datos.</p>;

  const chartOptions = (label, percent, color) => ({
    chart: { type: 'radialBar' },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: { background: '#ffffff' },
        dataLabels: { value: { fontSize: '15px', color: '#fff', fontWeight: 'bold' } },
      },
    },
    labels: [label],
    colors: [color],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#000d15'],
        stops: [0, 100],
      },
    },
  });

  return (
    <SoftBox
      position="relative"
      py={1}
      px={{ xs: 3, sm: 6, md: 8 }}
      mt={3}
      borderRadius="xl"
      variant="gradient"
      sx={{ backgroundColor: "rgba(0,74,143,0.71)" }} // Verde similar a GreenLake
    >
      <SoftBox
        component="img"
        src={wavesWhite}
        alt="pattern-line"
        width="100%"
        position="absolute"
        left="0"
        top="0"
        opacity={0.8}
      />
      <Grid container alignItems="center" position="relative" spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <SoftBox px={{ xs: 0, md: 1.5 }}>

            <SoftBox display="flex" flexDirection="column" gap={2}>
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <SoftTypography variant="h3" color="white">
                  Maquinas Virtuales por Hosts
                </SoftTypography>
                <Chart
                  type="bar"
                  height={250}
                  series={[{ name: 'Cantidad VMs', data: data.hosts.map(host => host.vm_count) }]}
                  options={{
                    chart: { type: 'bar', toolbar: { show: true } },
                    xaxis: { categories: data.hosts.map(host => host.name) },
                    colors: ['rgb(89,175,65)'],
                    dataLabels: { enabled: true },
                  }}
                />
              </div>

              <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg">
                <SoftTypography variant="h3" color="white">
                  Uso de memoria RAM
                </SoftTypography>
                <Chart
                  type="pie"
                  series={[
                    parseFloat(((data.memory.used_tb / data.memory.total_tb) * 100).toFixed(1)),
                    parseFloat((100 - (data.memory.used_tb / data.memory.total_tb) * 100).toFixed(1)),
                  ]}
                  options={{
                    labels: [
                      `Usado: ${((data.memory.used_tb / data.memory.total_tb) * 100).toFixed(1)}%`,
                      `Libre: ${(100 - (data.memory.used_tb / data.memory.total_tb) * 100).toFixed(1)}%`,
                    ],
                    tooltip: {
                      y: {
                        formatter: (value, { seriesIndex }) => {
                          return seriesIndex === 0
                            ? `${data.memory.used_tb.toFixed(2)} TB usados`
                            : `${(data.memory.total_tb - data.memory.used_tb).toFixed(2)} TB libres`;
                        },
                      },
                    },
                    colors: ['#004a8f', '#59af41'],
                    legend: {
                      labels: { colors: 'white', fontWeight: 'bold' },
                    },
                  }}
                />
              </div>

              <div>
                <SoftTypography variant="h3" color="white">
                  Uso de Almacenamiento
                </SoftTypography>
                <Chart
                  type="pie"
                  series={[
                    parseFloat(((data.storage.used_tb / data.storage.total_tb) * 100).toFixed(0)),
                    parseFloat((100 - (data.storage.used_tb / data.storage.total_tb) * 100).toFixed(0)),
                  ]}
                  options={{
                    labels: [
                      `Usado: ${((data.storage.used_tb / data.storage.total_tb) * 100).toFixed(0)}%`,
                      `Libre: ${(100 - (data.storage.used_tb / data.storage.total_tb) * 100).toFixed(0)}%`,
                    ],
                    tooltip: {
                      y: {
                        formatter: (value, { seriesIndex }) => {
                          return seriesIndex === 0
                            ? `${data.storage.used_tb.toFixed(0)} TB usados`
                            : `${(data.storage.total_tb - data.storage.used_tb).toFixed(0)} TB libres`;
                        },
                      },
                    },
                    colors: ['#004a8f', '#59af41'],
                    legend: {
                      labels: { colors: 'white', fontWeight: 'bold' },
                    },
                  }}
                />
              </div>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SoftBox textAlign="center">
            <SoftBox
              padding={9}
              component="img"
              src={serverpng}
              alt="server image"
              display={{ xs: 'none', md: 'block' }}
              width="100%"
              maxWidth={600}
              mt={{ xs: 0, lg: -16 }}
            />
            <SoftTypography variant="h3" color="white" opacity={0.7}>
              Nombre del Servidor
            </SoftTypography>
            <SoftTypography variant="h2" fontWeight="bold" color="white">
              CNWS
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={4} lg={2}>
          <SoftBox px={{ xs: 0, md: 1 }}>
            <SoftBox display="flex" flexDirection="column" gap={1}>
              <SoftBox>
                <SoftTypography variant="h3" color="white" opacity={0.7}>
                  CPU
                </SoftTypography>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  {data.cpu.cores} <SoftTypography variant="button" color="white"
                                                   verticalAlign="top">VCPUs</SoftTypography>
                </SoftTypography>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  {data.cpu.total_cpu_ghz.toFixed(1)}  <SoftTypography variant="button" color="white"
                                                           verticalAlign="top">GHz</SoftTypography>
                </SoftTypography>
                <Chart type="radialBar" series={[data.cpu.usage_percent]}
                       options={chartOptions('CPU', data.cpu.usage_percent, '#00ff34')} />
              </SoftBox>
              <SoftBox>
                <SoftTypography variant="h3" color="white" opacity={0.7}>
                  RAM
                </SoftTypography>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  {data.memory.total_tb} <SoftTypography variant="button" color="white"
                                                         verticalAlign="top">TB</SoftTypography>
                </SoftTypography>
                <Chart type="radialBar" series={[data.memory.usage_percent]}
                       options={chartOptions('RAM', data.memory.usage_percent, '#af0019')} />
              </SoftBox>
              <SoftBox>
                <SoftTypography variant="h3" color="white" opacity={0.7}>
                  Almacenamiento
                </SoftTypography>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  {data.storage.total_tb} <SoftTypography variant="button" color="white"
                                                          verticalAlign="top">TB</SoftTypography>
                </SoftTypography>
                <Chart type="radialBar" series={[data.storage.usage_percent]}
                       options={chartOptions('Storage', data.storage.usage_percent, '#0046af')} />
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default ServerDetails;