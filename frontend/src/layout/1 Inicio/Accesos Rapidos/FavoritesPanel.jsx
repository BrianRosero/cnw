import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import QuickAccessCard from './QuickAccessCard.jsx';
import StarIcon from '@mui/icons-material/Star';

function FavoritesPanel({ favorites, onRemoveFavorite }) {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <StarIcon sx={{ mr: 1, color: 'warning.main' }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Favoritos
        </Typography>
      </Box>
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {favorites.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No tienes páginas favoritas aún.
          </Typography>
        ) : (
          favorites.map((page) => (
            <QuickAccessCard
              key={page.id}
              page={page}
              onToggleFavorite={() => onRemoveFavorite(page.id)} // En favoritos, el botón es para remover
              isFavorite={true}
            />
          ))
        )}
      </Box>
    </Paper>
  );
}

export default FavoritesPanel;