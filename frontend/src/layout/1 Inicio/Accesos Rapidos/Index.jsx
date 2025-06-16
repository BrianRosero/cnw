import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Button, IconButton, AppBar, Toolbar, Tooltip,
  Card, CardContent, CardHeader, Avatar,
  List, ListItem, ListItemText, ListItemAvatar,
  Badge,
  Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, Checkbox, FormControlLabel, FormGroup,
  TextField,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home'; // Volver al Inicio
import FlashOnIcon from '@mui/icons-material/FlashOn'; // Icono principal de Acceso Rápido
import StarIcon from '@mui/icons-material/Star'; // Favoritos (relleno)
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Favoritos (contorno)
import HistoryIcon from '@mui/icons-material/History'; // Módulos Recientes / Historial
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles / Acceder
import LinkIcon from '@mui/icons-material/Link'; // Enlaces
import PushPinIcon from '@mui/icons-material/PushPin'; // Pin de Favoritos
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard general
import GroupWorkIcon from '@mui/icons-material/GroupWork'; // Integraciones Corporativas
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Automatización y Conectividad
import SettingsIcon from '@mui/icons-material/Settings'; // Personalización del Sistema
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Cerrar Sesión
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notificaciones
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Perfil

// Asumiendo que CategoryIcon y AssignmentIcon existen o se importan.
// Si no, puedes importar de @mui/icons-material:
import CategoryIcon from '@mui/icons-material/Category';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SaveIcon from '@mui/icons-material/Save';

// --- Datos Simulados ---

const currentUser = {
  id: 'USER001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Carlos%20Admin&backgroundColor=b6e3f4,c0aede,d1d4f9',
  role: 'Administrador de Plataforma',
};

// Módulos disponibles en el sistema (simulados)
const availableModules = [
  { id: 'dashboard_general', name: 'Dashboard General', icon: <DashboardIcon />, path: '/dashboard' },
  { id: 'corporate_integrations', name: 'Integraciones Corporativas', icon: <GroupWorkIcon />, path: '/integraciones' },
  { id: 'automation_connectivity', name: 'Automatización y Conectividad', icon: <AutoAwesomeIcon />, path: '/automatizacion' },
  { id: 'system_personalization', name: 'Personalización del Sistema', icon: <SettingsIcon />, path: '/personalizacion' },
  { id: 'user_management', name: 'Gestión de Usuarios', icon: <PeopleIcon />, path: '/gestion-usuarios' },
  { id: 'financial_reports', name: 'Reportes Financieros', icon: <AttachMoneyIcon />, path: '/reportes-financieros' },
  { id: 'product_catalog', name: 'Catálogo de Productos', icon: <CategoryIcon />, path: '/catalogo-productos' }, // Asumiendo CategoryIcon
  { id: 'customer_support', name: 'Mesa de Ayuda / Soporte', icon: <QuestionAnswerIcon />, path: '/mesa-ayuda' },
  { id: 'project_management', name: 'Gestión de Proyectos', icon: <AssignmentIcon />, path: '/gestion-proyectos' }, // Asumiendo AssignmentIcon
];


// Datos simulados del usuario para este panel
const initialUserData = {
  favorites: [
    { id: 'dashboard_general', type: 'module', name: 'Dashboard General', path: '/dashboard', icon: <DashboardIcon /> },
    { id: 'favorite_report_link', type: 'link', name: 'Reporte de Ventas Q2', url: 'https://bi.example.com/sales_q2', icon: <AttachMoneyIcon /> },
    { id: 'automation_connectivity', type: 'module', name: 'Automatización y Conectividad', path: '/automatizacion', icon: <AutoAwesomeIcon /> },
  ],
  recentModules: [
    { id: 'financial_reports', name: 'Reportes Financieros', path: '/reportes-financieros', lastAccessed: '2025-06-12 16:30' },
    { id: 'user_management', name: 'Gestión de Usuarios', path: '/gestion-usuarios', lastAccessed: '2025-06-12 15:45' },
    { id: 'corporate_integrations', name: 'Integraciones Corporativas', path: '/integraciones', lastAccessed: '2025-06-12 14:10' },
    { id: 'dashboard_general', name: 'Dashboard General', path: '/dashboard', lastAccessed: '2025-06-12 10:00' },
  ],
};

function QuickAccessPanel({ onGoToHome, onNavigate }) {
  const [userData, setUserData] = useState(initialUserData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [editingItem, setEditingItem] = useState(null); // Item being edited

  // Form state for adding/editing favorites
  const [favoriteForm, setFavoriteForm] = useState({
    type: 'module', // 'module' or 'link'
    moduleId: '', // if type is module
    name: '',     // if type is link or custom module name
    url: '',      // if type is link
  });

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // --- Manejo de Favoritos ---

  const handleAddFavoriteClick = () => {
    setDialogMode('add');
    setFavoriteForm({ type: 'module', moduleId: '', name: '', url: '' });
    setDialogOpen(true);
  };

  const handleEditFavoriteClick = (item) => {
    setDialogMode('edit');
    setEditingItem(item);
    setFavoriteForm({
      type: item.type,
      moduleId: item.type === 'module' ? item.id : '',
      name: item.name,
      url: item.type === 'link' ? item.url : '',
    });
    setDialogOpen(true);
  };

  const handleDeleteFavorite = (id) => {
    setUserData(prev => ({
      ...prev,
      favorites: prev.favorites.filter(fav => fav.id !== id),
    }));
    showSnackbar('Elemento de favoritos eliminado.', 'info');
  };

  const handleFavoriteFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setFavoriteForm({ ...favoriteForm, [name]: value, moduleId: '', name: '', url: '' }); // Reset fields when type changes
    } else if (name === 'moduleId') {
      const selectedModule = availableModules.find(mod => mod.id === value);
      setFavoriteForm({
        ...favoriteForm,
        moduleId: value,
        name: selectedModule ? selectedModule.name : '',
      });
    } else {
      setFavoriteForm({ ...favoriteForm, [name]: value });
    }
  };

  const handleSaveFavorite = () => {
    const { type, moduleId, name, url } = favoriteForm;

    if (!name.trim()) {
      showSnackbar('El nombre del favorito no puede estar vacío.', 'error');
      return;
    }

    let newItem;
    if (type === 'module') {
      const selectedModule = availableModules.find(mod => mod.id === moduleId);
      if (!selectedModule) {
        showSnackbar('Debe seleccionar un módulo válido.', 'error');
        return;
      }
      if (userData.favorites.some(fav => fav.type === 'module' && fav.id === moduleId && fav.id !== (editingItem ? editingItem.id : null))) {
        showSnackbar('Este módulo ya está en tus favoritos.', 'warning');
        return;
      }
      newItem = { id: selectedModule.id, type: 'module', name: selectedModule.name, path: selectedModule.path, icon: selectedModule.icon };
    } else { // type === 'link'
      if (!url.trim() || !/^https?:\/\/.+/.test(url.trim())) {
        showSnackbar('Debe introducir una URL válida.', 'error');
        return;
      }
      if (userData.favorites.some(fav => fav.type === 'link' && fav.url === url && fav.id !== (editingItem ? editingItem.id : null))) {
        showSnackbar('Este enlace ya está en tus favoritos.', 'warning');
        return;
      }
      // Generate a unique ID for the link
      newItem = { id: `link_${Date.now()}`, type: 'link', name, url, icon: <LinkIcon /> };
    }

    if (dialogMode === 'add') {
      setUserData(prev => ({
        ...prev,
        favorites: [...prev.favorites, newItem],
      }));
      showSnackbar('Favorito añadido con éxito.', 'success');
    } else { // edit mode
      setUserData(prev => ({
        ...prev,
        favorites: prev.favorites.map(fav => fav.id === editingItem.id ? newItem : fav),
      }));
      showSnackbar('Favorito actualizado con éxito.', 'success');
    }

    setDialogOpen(false);
  };


  const FavoriteDialog = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#455a64', color: '#fff' }}>
        {dialogMode === 'add' ? 'Añadir Nuevo Favorito' : 'Editar Favorito'}
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Favorito</InputLabel>
          <Select
            label="Tipo de Favorito"
            name="type"
            value={favoriteForm.type}
            onChange={handleFavoriteFormChange}
            disabled={dialogMode === 'edit'} // Cannot change type when editing
          >
            <MenuItem value="module">Módulo del Sistema</MenuItem>
            <MenuItem value="link">Enlace Externo / URL</MenuItem>
          </Select>
        </FormControl>

        {favoriteForm.type === 'module' ? (
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccionar Módulo</InputLabel>
            <Select
              label="Seleccionar Módulo"
              name="moduleId"
              value={favoriteForm.moduleId}
              onChange={handleFavoriteFormChange}
            >
              <MenuItem value=""><em>Ninguno</em></MenuItem>
              {availableModules.map(module => (
                <MenuItem key={module.id} value={module.id}>
                  <Box display="flex" alignItems="center">
                    {React.cloneElement(module.icon, { sx: { mr: 1, color: '#1976d2' } })}
                    {module.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : ( // type === 'link'
          <>
            <TextField
              label="Nombre del Enlace"
              name="name"
              value={favoriteForm.name}
              onChange={handleFavoriteFormChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="URL del Enlace"
              name="url"
              value={favoriteForm.url}
              onChange={handleFavoriteFormChange}
              fullWidth
              margin="normal"
              required
              helperText="Debe empezar con http:// o https://"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="secondary">
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSaveFavorite} startIcon={<SaveIcon />} sx={{ bgcolor: '#8bc34a', '&:hover': { bgcolor: '#689f38' } }}>
          {dialogMode === 'add' ? 'Añadir' : 'Guardar'} Favorito
        </Button>
      </DialogActions>
    </Dialog>
  );


  // --- Navegación / Acceso ---

  const handleAccessItem = (item) => {
    if (item.type === 'module') {
      if (onNavigate) {
        onNavigate(item.path);
        showSnackbar(`Accediendo a módulo: ${item.name}`, 'info');
        // Simulate adding to recent history if not already there, or moving to top
        setUserData(prev => {
          const updatedRecent = prev.recentModules.filter(r => r.id !== item.id);
          return {
            ...prev,
            recentModules: [{ ...item, lastAccessed: new Date().toLocaleString() }, ...updatedRecent].slice(0, 5), // Keep top 5
          };
        });
      } else {
        showSnackbar(`Función de navegación no disponible para: ${item.name}`, 'warning');
      }
    } else if (item.type === 'link') {
      window.open(item.url, '_blank'); // Open external link in new tab
      showSnackbar(`Abriendo enlace externo: ${item.name}`, 'info');
    }
  };

  const handleClearHistory = () => {
    setUserData(prev => ({
      ...prev,
      recentModules: [],
    }));
    showSnackbar('Historial de módulos recientes limpiado.', 'info');
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#eef2f6', minHeight: '100vh', color: '#000000', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={2} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #37474f' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#eceff1' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <FlashOnIcon sx={{ fontSize: 36, mr: 1, color: '#8bc34a' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Accesos Rápidos y Favoritos
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#b0bec5', color: '#37474f', fontWeight: 600 }}
          />
          <Tooltip title="Cerrar Sesión">
            <IconButton color="inherit" onClick={() => showSnackbar('Sesión cerrada (simulado).', 'info')}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            Tus Herramientas al Alcance de la Mano
          </Typography>
          <Typography variant="h6" color="#616161">
            Personaliza tus accesos directos y revisa tus módulos recientes.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Panel de Favoritos */}
          <Grid item xs={12} md={7}>
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #cfd8dc', borderRadius: 2 }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <StarIcon sx={{ color: '#ffc107', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#004a8f' }}>
                  Mis Favoritos
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddFavoriteClick} sx={{ textTransform: 'none', bgcolor: '#8bc34a', '&:hover': { bgcolor: '#689f38' } }}>
                  Añadir Favorito
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#cfd8dc' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Agrega aquí los módulos o enlaces que más utilizas para un acceso rápido.
              </Alert>

              <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 1, bgcolor: '#f5f5f5' }}>
                {userData.favorites.length === 0 ? (
                  <ListItem>
                    <ListItemText secondary="No has añadido ningún favorito aún. ¡Haz clic en 'Añadir Favorito' para empezar!" />
                  </ListItem>
                ) : (
                  userData.favorites.map((item) => (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        <Box>
                          <Tooltip title="Editar Favorito">
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditFavoriteClick(item)}>
                              <EditIcon color="action" fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar Favorito">
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFavorite(item.id)}>
                              <DeleteOutlineIcon color="error" fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                      sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1, '&:hover': { bgcolor: '#f0f4f7' } }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#bbdefb', color: '#1976d2' }}>
                          {item.icon || <LinkIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                            {item.name}
                            <Chip
                              label={item.type === 'module' ? 'Módulo' : 'Enlace'}
                              size="small"
                              color={item.type === 'module' ? 'primary' : 'secondary'}
                              sx={{ ml: 1 }}
                            />
                          </Typography>
                        }
                        secondary={item.type === 'link' ? (
                          <Tooltip title={item.url}>
                            <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: isMobile ? '150px' : '250px' }}>{item.url}</Typography>
                          </Tooltip>
                        ) : (
                          <Typography variant="caption" color="text.secondary">{item.path}</Typography>
                        )}
                        onClick={() => handleAccessItem(item)}
                        sx={{ cursor: 'pointer', mr: 2 }}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          </Grid>

          {/* Panel de Módulos Recientes */}
          <Grid item xs={12} md={5}>
            <Paper elevation={4} sx={{ p: 4, bgcolor: '#ffffff', border: '1px solid #cfd8dc', borderRadius: 2 }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <HistoryIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#004a8f' }}>
                  Módulos Recientes
                </Typography>
                <Button variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={handleClearHistory} sx={{ textTransform: 'none', color: '#d32f2f', borderColor: '#d32f2f' }}>
                  Limpiar Historial
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#cfd8dc' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Aquí se muestra tu historial de módulos accedidos recientemente.
              </Alert>

              <List sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 1, bgcolor: '#f5f5f5', maxHeight: 400, overflowY: 'auto' }}>
                {userData.recentModules.length === 0 ? (
                  <ListItem>
                    <ListItemText secondary="No hay módulos recientes. ¡Empieza a navegar para ver tu historial!" />
                  </ListItem>
                ) : (
                  userData.recentModules.map((item) => {
                    const module = availableModules.find(mod => mod.id === item.id);
                    return (
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <Tooltip title="Acceder">
                            <IconButton edge="end" aria-label="access" onClick={() => handleAccessItem({ type: 'module', ...item })}>
                              <VisibilityIcon color="primary" fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        }
                        sx={{ bgcolor: '#ffffff', mb: 1, borderRadius: 1, boxShadow: 1, '&:hover': { bgcolor: '#f0f4f7' } }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#e0f2f7', color: '#1976d2' }}>
                            {module?.icon || <HistoryIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>}
                          secondary={<Typography variant="caption" color="text.secondary">Último acceso: {item.lastAccessed}</Typography>}
                          onClick={() => handleAccessItem({ type: 'module', ...item })}
                          sx={{ cursor: 'pointer' }}
                        />
                      </ListItem>
                    );
                  })
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Dialogo para Añadir/Editar Favorito */}
      {dialogOpen && <FavoriteDialog />}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default QuickAccessPanel;