import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import QuickAccessCard from './QuickAccessCard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function RecentPagesPanel({ recentPages }) {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <AccessTimeIcon sx={{ mr: 1, color: 'info.main' }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Recientes
        </Typography>
      </Box>
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {recentPages.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay páginas recientes.
          </Typography>
        ) : (
          recentPages.map((page) => (
            <QuickAccessCard key={page.id} page={page} />
          ))
        )}
      </Box>
    </Paper>
  );
}

export default RecentPagesPanel;