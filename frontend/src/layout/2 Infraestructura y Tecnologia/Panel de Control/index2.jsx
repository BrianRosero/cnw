import React, { useState } from 'react';
import {
  Container, Typography, Button, Box, Grid, Paper,
  AppBar, Toolbar, IconButton, Tooltip
} from '@mui/material';

// Iconos de Material-UI para cada sección
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'; // Icono principal del Data Center

// Importa tus componentes existentes
import CalendarioActividades from './Calendario de Actividades.jsx';
import EstadisticasGenerales from './Estadísticas Generales.jsx';
import Informes from './Informes';
import Kanban from './Kanban de Proyectos.jsx';
import Rendimiento from './Rendimiento';
import ReportesAutomatizados from './Reportes Automatizados.jsx';
import HomeIcon from '@mui/icons-material/Home';

// Agrega una prop 'onGoToHome' para que reciba la función de navegación a la página de Inicio
function DataCenterPanel({ onGoToHome }) {
  const [currentModule, setCurrentModule] = useState('menu'); // 'menu', 'calendario', 'estadisticas', etc.

  const handleGoBackToPanelMenu = () => {
    setCurrentModule('menu'); // Vuelve al menú principal del *panel del Data Center*
  };

  const moduleOptions = [
    { id: 'calendario', title: 'Calendario de Actividades', icon: <CalendarMonthIcon sx={{ fontSize: 60 }} />, component: <CalendarioActividades /> },
    { id: 'estadisticas', title: 'Estadísticas Generales', icon: <BarChartIcon sx={{ fontSize: 60 }} />, component: <EstadisticasGenerales /> },
    { id: 'informes', title: 'Informes Detallados', icon: <DescriptionIcon sx={{ fontSize: 60 }} />, component: <Informes /> },
    { id: 'kanban', title: 'Gestión de Tareas Kanban', icon: <ViewKanbanIcon sx={{ fontSize: 60 }} />, component: <Kanban /> },
    { id: 'rendimiento', title: 'Monitoreo de Rendimiento', icon: <SpeedIcon sx={{ fontSize: 60 }} />, component: <Rendimiento /> },
    { id: 'reportes', title: 'Reportes Automatizados', icon: <AutoAwesomeIcon sx={{ fontSize: 60 }} />, component: <ReportesAutomatizados /> },
  ];

  const renderContent = () => {
    if (currentModule === 'menu') {
      return (
        <Grid container spacing={4} justifyContent="center" sx={{ p: 4 }}>
          {moduleOptions.map((option) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={option.id}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    bgcolor: 'background.default',
                  },
                  border: '1px solid rgba(129, 212, 250, 0.3)',
                }}
                onClick={() => setCurrentModule(option.id)}
              >
                <Box sx={{ color: 'primary.light', mb: 1 }}>
                  {option.icon}
                </Box>
                <Typography variant="h6" align="center" sx={{ color: 'text.primary' }}>
                  {option.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      const selectedModule = moduleOptions.find(option => option.id === currentModule);
      return selectedModule ? selectedModule.component : null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Toolbar>
          {/* Botón para volver al menú de la aplicación (HOME) */}
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="home"
                onClick={onGoToHome} // Usa la prop onGoToHome
                sx={{ mr: 2 }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Botón para volver al menú del Panel de Control del Data Center */}
          {currentModule !== 'menu' && (
            <Tooltip title="Volver al Panel Principal (Data Center)">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={handleGoBackToPanelMenu}
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}

          <SettingsInputAntennaIcon sx={{ fontSize: 36, mr: 1, color: 'primary.light' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.08em' }}>
            Panel de Control del Data Center
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.light' }}>
            {currentModule === 'menu' ? "Centro de Comando y Monitoreo" : `Módulo de ${moduleOptions.find(opt => opt.id === currentModule)?.title || '...'}`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {currentModule === 'menu' ? "Accede a las herramientas clave para la gestión y optimización de tu infraestructura." : "Información detallada y herramientas de gestión para este módulo."}
          </Typography>
        </Box>

        <Paper elevation={8} sx={{ p: currentModule === 'menu' ? 0 : 5, minHeight: '70vh', bgcolor: 'background.paper', border: '1px solid rgba(129, 212, 250, 0.2)' }}>
          {renderContent()}
        </Paper>
      </Container>
    </Box>
  );
}

export default DataCenterPanel;