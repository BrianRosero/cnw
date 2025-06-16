import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoritesPanel from './FavoritesPanel';
import RecentPagesPanel from './RecentPagesPanel';
import HistoryPanel from './HistoryPanel';

// Datos de ejemplo (en una aplicación real, vendrían de un estado global o de una API)
const initialFavorites = [
  { id: '1', title: 'Google', url: 'https://www.google.com' },
  { id: '2', title: 'React Documentation', url: 'https://react.dev/' },
];

const initialRecentPages = [
  { id: '3', title: 'Material-UI Docs', url: 'https://mui.com/' },
  { id: '4', title: 'Stack Overflow', url: 'https://stackoverflow.com/' },
];

const initialHistory = [
  { id: '5', title: 'Netflix', url: 'https://www.netflix.com' },
  { id: '6', title: 'Amazon', url: 'https://www.amazon.com' },
  { id: '7', title: 'YouTube', url: 'https://www.youtube.com' },
];

function QuickAccessPage() {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [recentPages, setRecentPages] = useState(initialRecentPages);
  const [history, setHistory] = useState(initialHistory);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulación de guardar/cargar desde LocalStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('quickAccessFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    const storedRecentPages = localStorage.getItem('quickAccessRecentPages');
    if (storedRecentPages) {
      setRecentPages(JSON.parse(storedRecentPages));
    }
    const storedHistory = localStorage.getItem('quickAccessHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quickAccessFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('quickAccessRecentPages', JSON.stringify(recentPages));
  }, [recentPages]);

  useEffect(() => {
    localStorage.setItem('quickAccessHistory', JSON.stringify(history));
  }, [history]);

  // Funciones para manipular los datos (ej. agregar/remover favoritos)
  const addFavorite = (page) => {
    if (!favorites.some(fav => fav.id === page.id)) {
      setFavorites([...favorites, page]);
    }
  };

  const removeFavorite = (pageId) => {
    setFavorites(favorites.filter(fav => fav.id !== pageId));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHistory = history.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.url.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          🚀 Tus Accesos Rápidos
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Organiza y encuentra tus páginas favoritas, recientes y visitadas.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar en historial..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mt: 3, maxWidth: 500 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <FavoritesPanel favorites={favorites} onRemoveFavorite={removeFavorite} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <RecentPagesPanel recentPages={recentPages} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <HistoryPanel history={filteredHistory} onAddFavorite={addFavorite} />
        </Grid>
        {/* Aquí podrías agregar más paneles como widgets personalizados */}
      </Grid>
    </Container>
  );
}

export default QuickAccessPage;