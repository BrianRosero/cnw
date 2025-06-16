import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

function Dashboard() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <DashboardIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Contenido del Dashboard General
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Visualiza datos importantes de diferentes áreas de tu aplicación.
        Aquí puedes integrar tus widgets, gráficos de rendimiento, etc.
      </Typography>
      {/* Agrega más contenido de tu Dashboard aquí */}
    </Box>
  );
}

export default Dashboard;