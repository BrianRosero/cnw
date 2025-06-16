import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function ReportesAutomatizados() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <AutoAwesomeIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
        Configuración de Reportes Automatizados
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Define la programación y el contenido de tus reportes periódicos para que se envíen automáticamente.
        Destinatarios, formatos y frecuencia.
      </Typography>
      {/* ... Tu código real para los reportes automatizados ... */}
    </Box>
  );
}

export default ReportesAutomatizados;