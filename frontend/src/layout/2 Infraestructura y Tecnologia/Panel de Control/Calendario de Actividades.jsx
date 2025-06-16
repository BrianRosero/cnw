import React from 'react';
import { Box, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function CalendarioActividades() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <CalendarMonthIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Calendario de Actividades del Data Center
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Gestiona y visualiza todas las tareas de mantenimiento, actualizaciones y eventos programados.
        Aquí iría tu componente de calendario interactivo.
      </Typography>
      {/* ... Tu código real para el calendario ... */}
    </Box>
  );
}

export default CalendarioActividades;