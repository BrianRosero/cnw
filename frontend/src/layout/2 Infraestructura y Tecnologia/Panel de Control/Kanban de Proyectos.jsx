import React from 'react';
import { Box, Typography } from '@mui/material';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

function Kanban() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <ViewKanbanIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Tablero Kanban de Tareas
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Organiza y sigue el progreso de tus tareas operativas y proyectos con este tablero visual.
        Arrastra y suelta tarjetas entre estados.
      </Typography>
      {/* ... Tu código real para el Kanban ... */}
    </Box>
  );
}

export default Kanban;