import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
  TextField, InputAdornment, IconButton, Button,
  AppBar, Toolbar, Tooltip,
  Tabs, Tab,
  Badge,
  Menu, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select,
  LinearProgress,
  Alert,
  Snackbar,
  Card, CardContent, CardActions, CardHeader,
  Accordion, AccordionSummary, AccordionDetails,
  Pagination,
  ButtonGroup,
  useMediaQuery,
  useTheme,
  Checkbox, FormControlLabel, FormGroup,
  ToggleButton, ToggleButtonGroup,
  Fab,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import PaletteIcon from '@mui/icons-material/Palette'; // Icono principal de Diseño Visual
import ColorLensIcon from '@mui/icons-material/ColorLens'; // Colores y Temas
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'; // Iconografía
import TextFieldsIcon from '@mui/icons-material/TextFields'; // Tipografía
import AppsIcon from '@mui/icons-material/Apps'; // Componentes UI
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'; // Recursos Gráficos
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import CodeIcon from '@mui/icons-material/Code'; // Código
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'; // Selector de Color
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp'; // Descargar
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Acordeón
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Copiar

// Para simular la carga dinámica de iconos de Material-UI
import * as MuiIcons from '@mui/icons-material';

// --- Datos Simulados ---

const currentUser = {
  id: 'DESIGN001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Diseñadora UI/UX',
};

const brandColors = [
  { name: 'Primary Blue', hex: '#004a8f', rgb: 'rgb(0,74,143)', usage: 'Botones principales, enlaces, encabezados' },
  { name: 'Accent Green', hex: '#4caf50', rgb: 'rgb(76, 175, 80)', usage: 'Éxito, confirmaciones, elementos interactivos secundarios' },
  { name: 'Warning Orange', hex: '#ff9800', rgb: 'rgb(255, 152, 0)', usage: 'Advertencias, notificaciones' },
  { name: 'Error Red', hex: '#f44336', rgb: 'rgb(244, 67, 54)', usage: 'Errores, alertas críticas' },
  { name: 'Text Dark', hex: '#212121', rgb: 'rgb(33, 33, 33)', usage: 'Texto principal, iconos' },
  { name: 'Text Light', hex: '#757575', rgb: 'rgb(117, 117, 117)', usage: 'Texto secundario, descripciones' },
  { name: 'Background Light', hex: '#f5f5f5', rgb: 'rgb(245, 245, 245)', usage: 'Fondos de sección, tarjetas' },
];

const typographyScales = [
  { name: 'Heading 1', tag: 'h1', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1, fontFamily: 'Roboto, sans-serif', usage: 'Títulos de página principales' },
  { name: 'Heading 2', tag: 'h2', fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2, fontFamily: 'Roboto, sans-serif', usage: 'Subtítulos de sección' },
  { name: 'Body Text', tag: 'p', fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, fontFamily: 'Open Sans, sans-serif', usage: 'Párrafos de contenido' },
  { name: 'Caption', tag: 'span', fontSize: '0.8rem', fontWeight: 400, lineHeight: 1.4, fontFamily: 'Open Sans, sans-serif', usage: 'Etiquetas pequeñas, texto auxiliar' },
];

// Simulamos algunos iconos populares de Material-UI
const materialIconsExamples = [
  'Home', 'Settings', 'AccountCircle', 'ShoppingCart', 'Favorite', 'Build',
  'Delete', 'Edit', 'Visibility', 'Notifications', 'Dashboard', 'CloudUpload',
  'Code', 'Palette', 'TextFields', 'Apps', 'PhotoLibrary', 'Gavel',
  'FolderShared', 'Assessment', 'History', 'Memory', 'Link', 'Publish',
];

const uiComponents = [
  {
    name: 'Botón Primario',
    description: 'Botón principal para acciones afirmativas.',
    type: 'Button',
    variant: 'contained',
    color: 'primary',
    codeSnippet: `<Button variant="contained" color="primary">Click Aquí</Button>`,
    preview: <Button variant="contained" color="primary">Click Aquí</Button>,
    properties: { size: ['small', 'medium', 'large'], disabled: [true, false] }
  },
  {
    name: 'Botón Secundario',
    description: 'Botón para acciones menos prominentes.',
    type: 'Button',
    variant: 'outlined',
    color: 'primary',
    codeSnippet: `<Button variant="outlined" color="primary">Más Información</Button>`,
    preview: <Button variant="outlined" color="primary">Más Información</Button>,
    properties: { size: ['small', 'medium', 'large'], disabled: [true, false] }
  },
  {
    name: 'Card de Contenido',
    description: 'Contenedor flexible para agrupar información.',
    type: 'Card',
    codeSnippet: `<Card sx={{ p: 2, boxShadow: 3 }}>\n  <Typography variant="h6">Título de Tarjeta</Typography>\n  <Typography variant="body2">Contenido breve de la tarjeta.</Typography>\n</Card>`,
    preview: (
      <Card sx={{ p: 2, boxShadow: 3, maxWidth: 300 }}>
        <Typography variant="h6" sx={{ color: '#212121' }}>Título de Tarjeta</Typography>
        <Typography variant="body2" color="text.secondary">Contenido breve de la tarjeta para mostrar su apariencia.</Typography>
      </Card>
    ),
    properties: { elevation: [1, 3, 5], border: [true, false] }
  },
  {
    name: 'Campo de Texto Estándar',
    description: 'Input básico para entrada de texto.',
    type: 'TextField',
    variant: 'outlined',
    codeSnippet: `<TextField label="Nombre Completo" variant="outlined" />`,
    preview: <TextField label="Nombre Completo" variant="outlined" />,
    properties: { required: [true, false], helperText: ['Ingresa tu nombre', ''] }
  }
];

const graphicAssets = [
  { id: 'LOGO001', name: 'Logo Principal', type: 'PNG', size: '250x100px', downloadUrl: '/assets/logo-primary.png', preview: '/assets/logo-primary.png' },
  { id: 'ICONSET01', name: 'Set de Iconos Custom', type: 'SVG', size: 'N/A', downloadUrl: '/assets/custom-icons.zip', preview: '' },
  { id: 'BANNER001', name: 'Banner Hero Home', type: 'JPG', size: '1920x1080px', downloadUrl: '/assets/hero-banner.jpg', preview: '/assets/hero-banner.jpg' },
];

// Helper para copiar al portapapeles
const copyToClipboard = async (text, showSnackbar) => {
  try {
    await navigator.clipboard.writeText(text);
    showSnackbar('Copiado al portapapeles', 'success');
  } catch (err) {
    showSnackbar('Error al copiar', 'error');
  }
};

// Componente principal
function VisualDesignPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('colors_themes');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'viewColor', 'editColor', 'newColor', 'viewTypography', 'editTypography', 'newTypography', 'viewComponent', 'editComponent', 'newComponent', 'viewAsset', 'newAsset'
  const [selectedItem, setSelectedItem] = useState(null); // For detailed view/edit

  const [searchTerm, setSearchTerm] = useState(''); // Para búsqueda de iconos
  const [selectedIconFilter, setSelectedIconFilter] = useState('all'); // Para filtrar iconos

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Diálogos para edición/vista
  const ColorFormDialog = () => {
    const [formData, setFormData] = useState(selectedItem || { name: '', hex: '#000000', rgb: '', usage: '' });
    const isViewMode = dialogType === 'viewColor';

    const handleChange = (e) => {
      let value = e.target.value;
      if (e.target.name === 'hex' && !value.startsWith('#')) {
        value = '#' + value; // Asegurar el prefijo #
      }
      setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.hex) {
        showSnackbar('Nombre y HEX son obligatorios.', 'error');
        return;
      }
      // Simular conversión HEX a RGB si no se proporciona
      if (!formData.rgb && formData.hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        const hex = formData.hex.slice(1);
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        formData.rgb = `rgb(${r}, ${g}, ${b})`;
      }

      showSnackbar('Color guardado (simulado).', 'success');
      setDialogOpen(false);
      // Actualizar estado en una app real
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>
          {isViewMode ? 'Detalles del Color' : (dialogType === 'newColor' ? 'Añadir Nuevo Color' : 'Editar Color')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre del Color" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Código HEX" name="hex" value={formData.hex} onChange={handleChange} fullWidth required disabled={isViewMode}
                         InputProps={{
                           startAdornment: (
                             <InputAdornment position="start">
                               <FormatColorFillIcon sx={{ color: formData.hex || '#000' }} />
                             </InputAdornment>
                           ),
                         }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Código RGB" name="rgb" value={formData.rgb} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Uso/Propósito" name="usage" value={formData.usage} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
              Guardar Color
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const TypographyFormDialog = () => {
    const [formData, setFormData] = useState(selectedItem || { name: '', tag: 'p', fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, fontFamily: 'Roboto, sans-serif', usage: '' });
    const isViewMode = dialogType === 'viewTypography';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.fontSize || !formData.fontFamily) {
        showSnackbar('Nombre, tamaño y fuente son obligatorios.', 'error');
        return;
      }
      showSnackbar('Tipografía guardada (simulado).', 'success');
      setDialogOpen(false);
      // Actualizar estado en una app real
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>
          {isViewMode ? 'Detalles de Tipografía' : (dialogType === 'newTypography' ? 'Añadir Nueva Tipografía' : 'Editar Tipografía')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre del Estilo" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Etiqueta HTML (e.g., h1, p)" name="tag" value={formData.tag} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tamaño de Fuente (e.g., 16px, 1.2rem)" name="fontSize" value={formData.fontSize} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel>Peso de Fuente</InputLabel>
                <Select label="Peso de Fuente" name="fontWeight" value={formData.fontWeight} onChange={handleChange}>
                  <MenuItem value={300}>Ligero (300)</MenuItem>
                  <MenuItem value={400}>Regular (400)</MenuItem>
                  <MenuItem value={500}>Medio (500)</MenuItem>
                  <MenuItem value={600}>Semi-bold (600)</MenuItem>
                  <MenuItem value={700}>Bold (700)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Altura de Línea (e.g., 1.5)" name="lineHeight" value={formData.lineHeight} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Familia de Fuente (e.g., 'Roboto, sans-serif')" name="fontFamily" value={formData.fontFamily} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Uso/Propósito" name="usage" value={formData.usage} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#212121', mt: 2 }}>Previsualización:</Typography>
              <Typography variant="body1" sx={{ fontSize: formData.fontSize, fontWeight: formData.fontWeight, lineHeight: formData.lineHeight, fontFamily: formData.fontFamily, border: '1px dashed #ccc', p: 2, borderRadius: 1 }}>
                El rápido zorro marrón salta sobre el perro perezoso.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
              Guardar Tipografía
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const ComponentFormDialog = () => {
    const [formData, setFormData] = useState(selectedItem || { name: '', description: '', type: '', variant: '', color: '', codeSnippet: '' });
    const isViewMode = dialogType === 'viewComponent';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.type) {
        showSnackbar('Nombre y Tipo son obligatorios.', 'error');
        return;
      }
      showSnackbar('Componente guardado (simulado).', 'success');
      setDialogOpen(false);
      // Actualizar estado en una app real
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>
          {isViewMode ? 'Detalles del Componente UI' : (dialogType === 'newComponent' ? 'Añadir Nuevo Componente' : 'Editar Componente')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre del Componente" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tipo (e.g., Button, Card, TextField)" name="type" value={formData.type} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Variante (e.g., contained, outlined)" name="variant" value={formData.variant} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Color (e.g., primary, secondary)" name="color" value={formData.color} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descripción" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Snippet de Código" name="codeSnippet" value={formData.codeSnippet} onChange={handleChange} fullWidth multiline rows={4} disabled={isViewMode} helperText="Código de ejemplo para implementar el componente." />
            </Grid>
            {isViewMode && selectedItem?.preview && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#212121' }}>Previsualización:</Typography>
                <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {selectedItem.preview}
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
              Guardar Componente
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const AssetFormDialog = () => {
    const [formData, setFormData] = useState(selectedItem || { name: '', type: '', size: '', downloadUrl: '', preview: '' });
    const isViewMode = dialogType === 'viewAsset';

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.type) {
        showSnackbar('Nombre y Tipo son obligatorios.', 'error');
        return;
      }
      showSnackbar('Recurso gráfico guardado (simulado).', 'success');
      setDialogOpen(false);
      // Actualizar estado en una app real
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>
          {isViewMode ? 'Detalles del Recurso Gráfico' : (dialogType === 'newAsset' ? 'Añadir Nuevo Recurso Gráfico' : 'Editar Recurso Gráfico')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre del Recurso" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tipo (e.g., PNG, SVG, JPG)" name="type" value={formData.type} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tamaño/Dimensiones" name="size" value={formData.size} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="URL de Descarga" name="downloadUrl" value={formData.downloadUrl} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="URL de Previsualización" name="preview" value={formData.preview} onChange={handleChange} fullWidth disabled={isViewMode} />
            </Grid>
            {isViewMode && formData.preview && (
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#212121' }}>Previsualización:</Typography>
                <Box sx={{ border: '1px dashed #ccc', p: 2, borderRadius: 1, maxWidth: '100%', display: 'inline-block' }}>
                  <img src={formData.preview} alt={formData.name} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                </Box>
              </Grid>
            )}
            {!isViewMode && (
              <Grid item xs={12}>
                <Alert severity="info">
                  Adjunta el archivo real aquí (funcionalidad simulada).
                  <Button variant="outlined" size="small" startIcon={<CloudUploadIcon />} sx={{ml:2}}>Subir Archivo</Button>
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
              Guardar Recurso
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };


  const getDialogComponent = () => {
    switch (dialogType) {
      case 'viewColor':
      case 'editColor':
      case 'newColor':
        return <ColorFormDialog />;
      case 'viewTypography':
      case 'editTypography':
      case 'newTypography':
        return <TypographyFormDialog />;
      case 'viewComponent':
      case 'editComponent':
      case 'newComponent':
        return <ComponentFormDialog />;
      case 'viewAsset':
      case 'newAsset':
        return <AssetFormDialog />;
      default:
        return null;
    }
  };

  // Filtrado de iconos de Material-UI
  const filteredMaterialIcons = useMemo(() => {
    let icons = [];
    if (selectedIconFilter === 'popular') {
      icons = materialIconsExamples;
    } else { // 'all' o búsqueda
      icons = Object.keys(MuiIcons).filter(iconName =>
        iconName.endsWith('Icon') && iconName !== 'CreateSvgIcon' // Excluir el componente base
      ).map(iconName => iconName.replace('Icon', '')); // Quitar 'Icon' del nombre
    }

    return icons.filter(iconName =>
      iconName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, selectedIconFilter]);


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#e3f2fd', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#2196f3', borderBottom: '1px solid #1976d2' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#e3f2fd' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <PaletteIcon sx={{ fontSize: 36, mr: 1, color: '#cddc39' }} /> {/* Verde lima para el diseño */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Recursos de Diseño Visual
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#90caf9', color: '#1a237e', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#2196f3' }}>
            Sistema de Diseño y Guía de Estilo
          </Typography>
          <Typography variant="h6" color="#616161">
            Centraliza y gestiona todos los elementos visuales para una marca consistente.
          </Typography>
        </Box>

        {/* Pestañas de Navegación Principal */}
        <Paper elevation={2} sx={{ mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#2196f3', // Azul principal
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#2196f3', // Azul principal
                },
              },
            }}
          >
            <Tab label="Colores y Temas" value="colors_themes" icon={<ColorLensIcon />} iconPosition="start" />
            <Tab label="Iconografía" value="iconography" icon={<CollectionsBookmarkIcon />} iconPosition="start" />
            <Tab label="Tipografía" value="typography" icon={<TextFieldsIcon />} iconPosition="start" />
            <Tab label="Componentes UI" value="ui_components" icon={<AppsIcon />} iconPosition="start" />
            <Tab label="Recursos Gráficos" value="graphic_assets" icon={<PhotoLibraryIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Colores y Temas */}
          {currentTab === 'colors_themes' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <ColorLensIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Paleta de Colores y Temas de Marca
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => { setSelectedItem(null); setDialogType('newColor'); setDialogOpen(true); }} sx={{ textTransform: 'none', bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
                  Añadir Nuevo Color
                </Button>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Colores actualizados', 'info')}>
                  Refrescar
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Define y visualiza los colores principales de tu marca para una consistencia visual.
              </Alert>

              <Grid container spacing={3}>
                {brandColors.map((color) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={color.hex}>
                    <Card elevation={3} sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
                      <Box sx={{ height: 100, bgcolor: color.hex, borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #ccc' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.getContrastText(color.hex), textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                          {color.name}
                        </Typography>
                      </Box>
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>HEX: <Chip label={color.hex} size="small" onClick={() => copyToClipboard(color.hex, showSnackbar)} icon={<ContentCopyIcon fontSize="small"/>} sx={{ml:0.5, '& .MuiChip-icon': {fontSize:14} }} /></Typography>
                        <Typography variant="subtitle2" color="text.secondary">RGB: <Chip label={color.rgb} size="small" onClick={() => copyToClipboard(color.rgb, showSnackbar)} icon={<ContentCopyIcon fontSize="small"/>} sx={{ml:0.5, '& .MuiChip-icon': {fontSize:14} }} /></Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>{color.usage}</Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid #eee' }}>
                        <Tooltip title="Ver Detalles">
                          <IconButton size="small" onClick={() => { setSelectedItem(color); setDialogType('viewColor'); setDialogOpen(true); }}><VisibilityIcon color="primary" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Color">
                          <IconButton size="small" onClick={() => { setSelectedItem(color); setDialogType('editColor'); setDialogOpen(true); }}><EditIcon color="action" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Color">
                          <IconButton size="small" onClick={() => showSnackbar(`Color ${color.name} eliminado (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Alert severity="success" sx={{ mt: 3 }}>
                Una paleta de colores bien definida garantiza la coherencia y la identidad de marca.
              </Alert>
            </Paper>
          )}

          {/* Tab: Iconografía */}
          {currentTab === 'iconography' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <CollectionsBookmarkIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Biblioteca de Iconos (Material Icons y Custom)
                </Typography>
                <TextField
                  label="Buscar Icono"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: isMobile ? '100%' : 250 }}
                />
                <ToggleButtonGroup
                  value={selectedIconFilter}
                  exclusive
                  onChange={(e, newFilter) => { if(newFilter !== null) setSelectedIconFilter(newFilter); }}
                  size="small"
                  sx={{
                    backgroundColor: '#e3f2fd',
                    '& .MuiToggleButton-root': {
                      '&.Mui-selected': {
                        backgroundColor: '#2196f3',
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: '#1976d2',
                        }
                      }
                    }
                  }}
                >
                  <ToggleButton value="popular">Populares</ToggleButton>
                  <ToggleButton value="all">Todos</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="success" sx={{ mb: 3 }}>
                Explora y utiliza iconos para mejorar la usabilidad y estética de tu sitio.
              </Alert>

              <Grid container spacing={2} sx={{ maxHeight: 600, overflowY: 'auto', p: 1, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                {filteredMaterialIcons.length > 0 ? (
                  filteredMaterialIcons.map((iconName) => {
                    const IconComponent = MuiIcons[iconName]; // Obtener el componente del icono dinámicamente
                    return (
                      <Grid item xs={6} sm={4} md={3} lg={2} key={iconName}>
                        <Paper elevation={1} sx={{ p: 1, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2 }}>
                          {IconComponent && <IconComponent sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />}
                          <Typography variant="caption" sx={{ wordBreak: 'break-word', fontWeight: 600, color: '#333' }}>{iconName}</Typography>
                          <IconButton size="small" onClick={() => copyToClipboard(`import ${iconName} from '@mui/icons-material/${iconName}';`, showSnackbar)} sx={{ mt: 1 }}>
                            <CodeIcon fontSize="small" />
                          </IconButton>
                        </Paper>
                      </Grid>
                    );
                  })
                ) : (
                  <Grid item xs={12}><Alert severity="warning">No se encontraron iconos para "{searchTerm}".</Alert></Grid>
                )}
              </Grid>
              <Alert severity="info" sx={{ mt: 3 }}>
                Considera también cargar tus propios sets de iconos personalizados en la sección de "Recursos Gráficos".
              </Alert>
            </Paper>
          )}

          {/* Tab: Tipografía */}
          {currentTab === 'typography' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <TextFieldsIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Guía de Tipografía y Escalas de Fuente
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => { setSelectedItem(null); setDialogType('newTypography'); setDialogOpen(true); }} sx={{ textTransform: 'none', bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
                  Añadir Nueva Tipografía
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Define la jerarquía tipográfica para asegurar legibilidad y atractivo visual.
              </Alert>

              <Grid container spacing={3}>
                {typographyScales.map((typo, index) => (
                  <Grid item xs={12} key={index}>
                    <Card elevation={2} sx={{ borderRadius: 2, border: '1px solid #e0e0e0', p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#212121' }}>{typo.name}</Typography>
                        <ButtonGroup size="small">
                          <Tooltip title="Ver Detalles">
                            <IconButton onClick={() => { setSelectedItem(typo); setDialogType('viewTypography'); setDialogOpen(true); }}><VisibilityIcon color="primary" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Editar Tipografía">
                            <IconButton onClick={() => { setSelectedItem(typo); setDialogType('editTypography'); setDialogOpen(true); }}><EditIcon color="action" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar Tipografía">
                            <IconButton onClick={() => showSnackbar(`Tipografía ${typo.name} eliminada (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton>
                          </Tooltip>
                        </ButtonGroup>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{typo.usage}</Typography>
                      <Typography variant="body1" sx={{
                        fontSize: typo.fontSize,
                        fontWeight: typo.fontWeight,
                        lineHeight: typo.lineHeight,
                        fontFamily: typo.fontFamily,
                        color: '#212121',
                        borderLeft: '4px solid #cddc39', // Verde lima
                        pl: 2, py: 1,
                        bgcolor: '#f5f5f5',
                        borderRadius: 1,
                      }}>
                        El veloz murciélago hindú comía feliz cardillo y kiwi. ({typo.tag}, {typo.fontSize})
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={`Font-size: ${typo.fontSize}`} size="small" />
                        <Chip label={`Font-weight: ${typo.fontWeight}`} size="small" />
                        <Chip label={`Line-height: ${typo.lineHeight}`} size="small" />
                        <Chip label={`Font-family: ${typo.fontFamily.split(',')[0].replace(/'/g, '')}`} size="small" />
                        <Tooltip title="Copiar CSS">
                          <IconButton size="small" onClick={() => copyToClipboard(`font-size: ${typo.fontSize};\nfont-weight: ${typo.fontWeight};\nline-height: ${typo.lineHeight};\nfont-family: ${typo.fontFamily};`, showSnackbar)}>
                            <CodeIcon fontSize="small"/>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Alert severity="success" sx={{ mt: 3 }}>
                Una buena tipografía mejora la legibilidad y la experiencia del usuario.
              </Alert>
            </Paper>
          )}

          {/* Tab: Componentes UI */}
          {currentTab === 'ui_components' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <AppsIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Librería de Componentes de Interfaz de Usuario
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => { setSelectedItem(null); setDialogType('newComponent'); setDialogOpen(true); }} sx={{ textTransform: 'none', bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
                  Añadir Nuevo Componente
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="success" sx={{ mb: 3 }}>
                Centraliza y documenta los componentes UI para un desarrollo eficiente y consistente.
              </Alert>

              <Grid container spacing={3}>
                {uiComponents.map((comp, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card elevation={3} sx={{ borderRadius: 2, border: '1px solid #e0e0e0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardHeader
                        title={comp.name}
                        subheader={comp.type}
                        titleTypographyProps={{ variant: 'h6', color: '#212121' }}
                        subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                        sx={{ borderBottom: '1px solid #eee', bgcolor: '#e3f2fd', p: 2 }}
                        action={
                          <ButtonGroup size="small">
                            <Tooltip title="Ver Detalles">
                              <IconButton onClick={() => { setSelectedItem(comp); setDialogType('viewComponent'); setDialogOpen(true); }}><VisibilityIcon color="primary" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar Componente">
                              <IconButton onClick={() => { setSelectedItem(comp); setDialogType('editComponent'); setDialogOpen(true); }}><EditIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Componente">
                              <IconButton onClick={() => showSnackbar(`Componente ${comp.name} eliminado (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton>
                            </Tooltip>
                          </ButtonGroup>
                        }
                      />
                      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{comp.description}</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121', mb: 1 }}>Previsualización:</Typography>
                        <Box sx={{ border: '1px dashed #ccc', p: 2, borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80, mb: 2 }}>
                          {comp.preview}
                        </Box>
                        {comp.codeSnippet && (
                          <Box sx={{ bgcolor: '#f0f0f0', p: 1.5, borderRadius: 1, position: 'relative', overflowX: 'auto' }}>
                            <Typography variant="caption" sx={{ position: 'absolute', top: 4, right: 8, color: 'text.secondary' }}>Snippet:</Typography>
                            <pre style={{ margin: 0, fontSize: '0.85rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                    <code>{comp.codeSnippet}</code>
                                </pre>
                            <Tooltip title="Copiar Código">
                              <IconButton size="small" sx={{ position: 'absolute', bottom: 4, right: 4 }} onClick={() => copyToClipboard(comp.codeSnippet, showSnackbar)}>
                                <ContentCopyIcon fontSize="small"/>
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )}
                        {comp.properties && (
                          <Box sx={{mt:2}}>
                            <Typography variant="subtitle2" sx={{fontWeight: 600, color: '#212121', mb:1}}>Propiedades Comunes:</Typography>
                            {Object.entries(comp.properties).map(([key, values]) => (
                              <Chip key={key} label={`${key}: ${values.join(', ')}`} size="small" sx={{mr:1, mb:1}} />
                            ))}
                          </Box>
                        )}
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid #eee', p: 1 }}>
                        {/* Actions already handled in CardHeader */}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Alert severity="info" sx={{ mt: 3 }}>
                Asegura que todos los desarrolladores utilicen los mismos componentes visuales.
              </Alert>
            </Paper>
          )}

          {/* Tab: Recursos Gráficos */}
          {currentTab === 'graphic_assets' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <PhotoLibraryIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Librería de Recursos Gráficos y Logotipos
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => { setSelectedItem(null); setDialogType('newAsset'); setDialogOpen(true); }} sx={{ textTransform: 'none', bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>
                  Añadir Nuevo Recurso
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{ mb: 3 }}>
                Gestiona logos, banners, ilustraciones y otros activos visuales de la marca.
              </Alert>

              <Grid container spacing={3}>
                {graphicAssets.map((asset) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={asset.id}>
                    <Card elevation={3} sx={{ borderRadius: 2, border: '1px solid #e0e0e0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ height: 150, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #eee', p: 1 }}>
                        {asset.preview ? (
                          <img src={asset.preview} alt={asset.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : (
                          <Typography variant="body2" color="text.secondary">No preview available</Typography>
                        )}
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ color: '#212121' }}>{asset.name}</Typography>
                        <Typography variant="body2" color="text.secondary">Tipo: {asset.type} | Tamaño: {asset.size}</Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid #eee' }}>
                        {asset.downloadUrl && (
                          <Tooltip title="Descargar">
                            <IconButton size="small" href={asset.downloadUrl} target="_blank" download><GetAppIcon color="primary" /></IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Ver Detalles">
                          <IconButton size="small" onClick={() => { setSelectedItem(asset); setDialogType('viewAsset'); setDialogOpen(true); }}><VisibilityIcon color="action" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Recurso">
                          <IconButton size="small" onClick={() => { setSelectedItem(asset); setDialogType('newAsset'); setDialogOpen(true); }}><EditIcon color="action" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Recurso">
                          <IconButton size="small" onClick={() => showSnackbar(`Recurso ${asset.name} eliminado (simulado).`, 'info')}><DeleteOutlineIcon color="error" /></IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Alert severity="success" sx={{ mt: 3 }}>
                Facilita el acceso a los activos gráficos para diseñadores y desarrolladores.
              </Alert>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Renderizar el Dialogo Dinámicamente */}
      {getDialogComponent()}

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

export default VisualDesignPanel;