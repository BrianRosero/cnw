import React from 'react';
import { Box, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

function EstadisticasGenerales() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <BarChartIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Estadísticas Generales del Sistema
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Accede a una vista panorámica del rendimiento global de tu infraestructura.
        Gráficos de uso de CPU, memoria, red, almacenamiento, etc.
      </Typography>
      {/* ... Tu código real para las estadísticas ... */}
    </Box>
  );
}

export default EstadisticasGenerales;