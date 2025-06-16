import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArticleIcon from '@mui/icons-material/Article';

// Importa tus componentes existentes
import PanelEjecutivo from './Panel Ejecutivo.jsx';
import Dashboard from './Dashboard General.jsx';
import Noticias from './Noticias y Comunicados.jsx';

function Inicio() {
  // Estado para controlar qué panel se está mostrando
  const [currentView, setCurrentView] = useState('menu'); // 'menu', 'ejecutivo', 'dashboard', 'noticias'

  const handleGoBack = () => {
    setCurrentView('menu'); // Vuelve al menú principal
  };

  const renderContent = () => {
    switch (currentView) {
      case 'ejecutivo':
        return <PanelEjecutivo />;
      case 'dashboard':
        return <Dashboard />;
      case 'noticias':
        return <Noticias />;
      case 'menu':
      default:
        return (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                onClick={() => setCurrentView('ejecutivo')}
              >
                <BusinessCenterIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Panel Ejecutivo</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                onClick={() => setCurrentView('dashboard')}
              >
                <DashboardIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Dashboard General</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                onClick={() => setCurrentView('noticias')}
              >
                <ArticleIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">Noticias y Comunicados</Typography>
              </Button>
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Página de Inicio
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ¡Bienvenido! Selecciona una opción para empezar.
        </Typography>
      </Box>

      {currentView !== 'menu' && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Volver al Menú
          </Button>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 4, minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {renderContent()}
      </Paper>
    </Container>
  );
}

export default Inicio;