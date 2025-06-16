import React from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Para agregar a favoritos desde historial

function HistoryPanel({ history, onAddFavorite }) {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <HistoryIcon sx={{ mr: 1, color: 'secondary.main' }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Historial
        </Typography>
      </Box>
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {history.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay elementos en el historial.
          </Typography>
        ) : (
          <List>
            {history.map((page) => (
              <ListItem key={page.id} component="a" href={page.url} target="_blank" rel="noopener noreferrer" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <ListItemText
                  primary={page.title}
                  secondary={page.url}
                  primaryTypographyProps={{ noWrap: true }}
                  secondaryTypographyProps={{ noWrap: true }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="add to favorites" onClick={(e) => { e.preventDefault(); onAddFavorite(page); }}>
                    <StarBorderIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
}

export default HistoryPanel;