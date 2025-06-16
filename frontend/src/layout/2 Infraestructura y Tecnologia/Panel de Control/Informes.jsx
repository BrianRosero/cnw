import React from 'react';
import { Box, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

function Informes() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <DescriptionIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Generación y Consulta de Informes
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Crea informes detallados de operación, seguridad, cumplimiento y más.
        Opciones de filtrado, exportación y programación.
      </Typography>
      {/* ... Tu código real para los informes ... */}
    </Box>
  );
}

export default Informes;