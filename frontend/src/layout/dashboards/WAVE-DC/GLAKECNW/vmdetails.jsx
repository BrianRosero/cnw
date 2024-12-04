import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  CircularProgress,
  LinearProgress,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import BarChartIcon from '@mui/icons-material/BarChart';

// Estilo personalizado para las tarjetas
const StyledCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '15px',
  color: '#333',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#4caf50',
  fontWeight: 'bold',
}));

const DashboardButton = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  background: '#4caf50',
  borderRadius: '20px',
  padding: '5px 15px',
  '&:hover': {
    background: '#45a049',
  },
}));

const dataLineChart = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 600 },
  { name: 'Jun', value: 700 },
];

const dataPieChart = [
  { name: 'Less than 30 min', value: 15 },
  { name: '30 min to 1 hr', value: 25 },
  { name: 'More than 1 hr', value: 60 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const dataBarChart = [
  { name: 'US', active: 4000, new: 2400 },
  { name: 'France', active: 3000, new: 1398 },
  { name: 'India', active: 2000, new: 9800 },
  { name: 'Colombia', active: 2780, new: 3908 },
];

const VMDetailsDashboard = ({ vm }) => {
  if (!vm) {
    return <Typography color="error">Cargando datos de la máquina virtual...</Typography>;
  }

  const renderKeyValue = (key, value) => (
    <Box display="flex" justifyContent="space-between" mb={1}>
      <Typography variant="body2" color="primary">
        {key}:
      </Typography>
      <Typography variant="body2" color="secondary">
        {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value || 'N/A'}
      </Typography>
    </Box>
  );

  const renderSection = (title, icon, data) => (
    <div>
      <Box display="flex" alignItems="center" mb={2}>
        <StyledTypography variant="h2" gutterBottom sx={{ ml: 1 }}>
          {icon}
        </StyledTypography>
        <StyledTypography variant="h2" gutterBottom sx={{ ml: 1 }}>
        </StyledTypography>
        <StyledTypography variant="h2" gutterBottom sx={{ ml: 1 }}>
        </StyledTypography>
        <StyledTypography variant="h3" gutterBottom sx={{ ml: 1 }}>
          {title}
        </StyledTypography>
      </Box>
      <Divider sx={{ background: '#4caf50', mb: 2 }} />
      {Object.entries(data).map(([key, value]) =>
        typeof value === 'object' && value !== null ? (
          renderKeyValue(key, JSON.stringify(value, null, 2))
        ) : (
          renderKeyValue(key, value)
        ),
      )}
    </div>
  );

  return (
    <div>
      <Typography variant="h1" sx={{ color: '#4caf50', mb: 3, textAlign: 'center' }}>
        Manquina virtual -
        {vm.name && (
          <Typography variant="h1" sx={{ color: '#4caf50', ml: 2, display: 'inline' }}>
            {vm.name}
          </Typography>
        )}
      </Typography>

      <Grid container spacing={4} padding={2}>
        <Grid item xs={12} md={6} lg={2}>
          <StyledCard>
            <CardContent>
              {renderSection('Identidad', <BarChartIcon sx={{ color: '#4caf50' }} />, vm.identity)}
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <StyledCard>
            <CardContent>
              {renderSection('CPU', <MemoryIcon sx={{ color: '#4caf50' }} />, vm.cpu)}
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <StyledCard>
            <CardContent>
              {vm.disks?.map((disk, index) =>
                renderSection(`Disco ${index + 1}`, <StorageIcon sx={{ color: '#4caf50' }} />, disk.value),
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <StyledCard>
            <CardContent>
              {renderSection('Estado de Energía', <PowerSettingsNewIcon sx={{ color: '#4caf50' }} />, {
                power_state: vm.power_state,
                guest_OS: vm.guest_OS,
                name: vm.name,
              })}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Gráficos de rendimiento */}
        <Grid item xs={12} md={6} lg={4}>
          <StyledCard>
            <CardContent>
              <StyledTypography variant="h6" gutterBottom>
                Active Users
              </StyledTypography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dataLineChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4caf50" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <StyledCard>
            <CardContent>
              <StyledTypography variant="h6" gutterBottom>
                Time Spent per Day
              </StyledTypography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dataPieChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label
                  >
                    {dataPieChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <StyledCard>
            <CardContent>
              <StyledTypography variant="h6" gutterBottom>
                Users by Country
              </StyledTypography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dataBarChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="active" fill="#8884d8" />
                  <Bar dataKey="new" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Información de la máquina virtual */}
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <StyledTypography variant="h5">Estado General</StyledTypography>
                <DashboardButton startIcon={<PowerSettingsNewIcon />}>Encender/Apagar</DashboardButton>
              </Box>
              <Divider sx={{ background: '#4caf50', mt: 2, mb: 2 }} />
              <Box display="flex" justifyContent="space-around">
                <Box textAlign="center">
                  <MemoryIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                  <Typography variant="body1">Memoria</Typography>
                  <Typography variant="h6" color="secondary">
                    {vm.memory.size_MiB} MiB
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <StorageIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                  <Typography variant="body1">Discos</Typography>
                  <Typography variant="h6" color="secondary">
                    {vm.disks.length}
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <NetworkCheckIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                  <Typography variant="body1">Adaptadores de Red</Typography>
                  <Typography variant="h6" color="secondary">
                    {vm.nics.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        {vm.nics?.map((nic, index) =>
          renderSection(`Adaptador de Red ${index + 1}`, <NetworkCheckIcon sx={{ color: '#4caf50' }} />, nic.value),
        )}
      </Grid>
    </div>
  );
};

export default VMDetailsDashboard;
