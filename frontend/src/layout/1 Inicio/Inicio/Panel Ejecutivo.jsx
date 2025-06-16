import React from 'react';
import { Box, Typography } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

function PanelEjecutivo() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <BusinessCenterIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Contenido del Panel Ejecutivo
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Aquí podrás ver métricas clave, reportes y resúmenes estratégicos para la toma de decisiones.
        Implementa tus gráficos, tablas y KPIs aquí.
      </Typography>
      {/* Agrega más contenido de tu Panel Ejecutivo aquí */}
    </Box>
  );
}

export default PanelEjecutivo;