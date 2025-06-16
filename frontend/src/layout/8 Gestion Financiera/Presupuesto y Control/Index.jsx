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
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup,
  useMediaQuery,
  useTheme,
  FormGroup, FormControlLabel, Switch, Checkbox,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // Icono principal de Presupuestos y Control
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Presupuestos
import TrackChangesIcon from '@mui/icons-material/TrackChanges'; // Control de Gasto
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Alertas
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Reportes
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Crear nuevo
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import DownloadIcon from '@mui/icons-material/Download'; // Descargar
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Período
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Cumplido
import WarningIcon from '@mui/icons-material/Warning'; // Advertencia
import ErrorIcon from '@mui/icons-material/Error'; // Excedido
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Desviación Positiva
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Desviación Negativa
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // General
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'; // Departamento
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BarChartIcon from '@mui/icons-material/BarChart';
import LineChartIcon from '@mui/icons-material/Timeline'; // Proyecto

// --- Gráficos (simulados) ---
const DummyBarChart = ({ title, data }) => (
  <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 2, textAlign: 'center', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <BarChartIcon sx={{ fontSize: 50, color: '#9e9e9e' }} />
    <Typography variant="subtitle1" sx={{ mt: 1, color: '#616161' }}>{title}</Typography>
    <Typography variant="body2" color="text.secondary">(Gráfico de Barras Simulado)</Typography>
  </Box>
);

const DummyLineChart = ({ title, data }) => (
  <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 2, textAlign: 'center', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <LineChartIcon sx={{ fontSize: 50, color: '#9e9e9e' }} />
    <Typography variant="subtitle1" sx={{ mt: 1, color: '#616161' }}>{title}</Typography>
    <Typography variant="body2" color="text.secondary">(Gráfico de Línea Simulado)</Typography>
  </Box>
);

// --- Datos Simulados ---

const currentUser = {
  id: 'BUD001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Control de Presupuesto',
};

const departments = [
  { id: 'DP001', name: 'Marketing' },
  { id: 'DP002', name: 'Ventas' },
  { id: 'DP003', name: 'Desarrollo de Producto' },
  { id: 'DP004', name: 'Recursos Humanos' },
];

const projects = [
  { id: 'PRJ001', name: 'Lanzamiento Nueva App' },
  { id: 'PRJ002', name: 'Expansión Mercado Latam' },
];

const budgetCategories = [
  'Salarios', 'Alquiler', 'Marketing y Publicidad', 'Materiales y Suministros',
  'Software y Licencias', 'Viajes', 'Mantenimiento', 'Servicios Públicos', 'Consultoría', 'Otros'
];

const simulatedBudgets = [
  {
    id: 'BUD2025-01-MKT',
    name: 'Presupuesto Marketing Q2 2025',
    type: 'Departamento',
    ownerId: 'DP001', // Department ID
    period: '2025-Q2',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    totalBudget: 50000,
    status: 'Activo',
    lineItems: [
      { category: 'Marketing y Publicidad', budgeted: 25000, actual: 23000, description: 'Campaña digital y eventos' },
      { category: 'Salarios', budgeted: 15000, actual: 16000, description: 'Sueldos equipo marketing' },
      { category: 'Software y Licencias', budgeted: 5000, actual: 4800, description: 'Herramientas de marketing' },
      { category: 'Otros', budgeted: 5000, actual: 5500, description: 'Varios' },
    ],
  },
  {
    id: 'BUD2025-02-PRJ001',
    name: 'Presupuesto Lanzamiento App 2025',
    type: 'Proyecto',
    ownerId: 'PRJ001', // Project ID
    period: '2025-Q2',
    startDate: '2025-04-01',
    endDate: '2025-09-30',
    totalBudget: 120000,
    status: 'Activo',
    lineItems: [
      { category: 'Desarrollo de Producto', budgeted: 60000, actual: 58000, description: 'Desarrollo y pruebas' },
      { category: 'Marketing y Publicidad', budgeted: 30000, actual: 32000, description: 'Pre-lanzamiento y lanzamiento' },
      { category: 'Consultoría', budgeted: 15000, actual: 14500, description: 'Consultores externos' },
      { category: 'Salarios', budgeted: 15000, actual: 14000, description: 'Personal dedicado' },
    ],
  },
  {
    id: 'BUD2025-03-GEN',
    name: 'Presupuesto General Administrativo Mensual',
    type: 'General',
    ownerId: null, // No specific owner
    period: '2025-06',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    totalBudget: 30000,
    status: 'Activo',
    lineItems: [
      { category: 'Alquiler', budgeted: 5000, actual: 5000, description: 'Oficina principal' },
      { category: 'Servicios Públicos', budgeted: 1500, actual: 1600, description: 'Electricidad, agua, internet' },
      { category: 'Salarios', budgeted: 20000, actual: 19500, description: 'Personal administrativo' },
      { category: 'Materiales y Suministros', budgeted: 2000, actual: 2200, description: 'Materiales de oficina' },
      { category: 'Otros', budgeted: 1500, actual: 1800, description: 'Gastos menores' },
    ],
  },
  {
    id: 'BUD2025-04-DP002',
    name: 'Presupuesto Ventas Q2 2025',
    type: 'Departamento',
    ownerId: 'DP002',
    period: '2025-Q2',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    totalBudget: 40000,
    status: 'Activo',
    lineItems: [
      { category: 'Salarios', budgeted: 25000, actual: 24500, description: 'Comisiones y salarios fijos' },
      { category: 'Viajes', budgeted: 8000, actual: 8500, description: 'Visitas a clientes' },
      { category: 'Marketing y Publicidad', budgeted: 5000, actual: 5200, description: 'Material promocional' },
      { category: 'Otros', budgeted: 2000, actual: 1900, description: 'Gastos varios' },
    ]
  },
];

// Helper para obtener nombre del dueño
const getOwnerName = (type, id) => {
  if (type === 'Departamento') return departments.find(d => d.id === id)?.name || 'N/A';
  if (type === 'Proyecto') return projects.find(p => p.id === id)?.name || 'N/A';
  return 'N/A';
};

// Helper para formato de moneda
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Helper para calcular uso del presupuesto
const calculateBudgetUsage = (lineItems) => {
  const budgetedTotal = lineItems.reduce((sum, item) => sum + item.budgeted, 0);
  const actualTotal = lineItems.reduce((sum, item) => sum + item.actual, 0);
  const remaining = budgetedTotal - actualTotal;
  const percentageUsed = budgetedTotal > 0 ? (actualTotal / budgetedTotal) * 100 : 0;
  return { budgetedTotal, actualTotal, remaining, percentageUsed };
};

// Componente principal
function BudgetControlPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('budget_overview'); // 'budget_overview', 'expense_tracking', 'alerts_reporting', 'settings'
  const [budgets, setBudgets] = useState(simulatedBudgets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'viewBudget', 'newBudget', 'editBudget', 'trackExpense'
  const [selectedBudget, setSelectedBudget] = useState(null); // Used for budget details/edit/track

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // --- Funciones de Gestión de Presupuestos ---
  const handleViewBudget = (budget) => {
    setSelectedBudget(budget);
    setDialogType('viewBudget');
    setDialogOpen(true);
  };

  const handleCreateNewBudget = () => {
    setSelectedBudget(null);
    setDialogType('newBudget');
    setDialogOpen(true);
  };

  const handleEditBudget = (budget) => {
    setSelectedBudget(budget);
    setDialogType('editBudget');
    setDialogOpen(true);
  };

  const handleSaveBudget = (newBudgetData) => {
    if (selectedBudget) {
      // Editing existing budget
      setBudgets(budgets.map(b => b.id === selectedBudget.id ? { ...b, ...newBudgetData } : b));
      showSnackbar('Presupuesto actualizado con éxito.', 'success');
    } else {
      // Creating new budget
      const newId = `BUD${String(budgets.length + 1).padStart(4, '0')}`;
      // Calculate totalBudget from lineItems
      const calculatedTotalBudget = newBudgetData.lineItems.reduce((sum, item) => sum + item.budgeted, 0);
      setBudgets([...budgets, { id: newId, ...newBudgetData, totalBudget: calculatedTotalBudget, status: 'Activo' }]);
      showSnackbar('Presupuesto creado con éxito.', 'success');
    }
    setDialogOpen(false);
  };

  const handleDeleteBudget = (budgetId) => {
    setBudgets(budgets.filter(b => b.id !== budgetId));
    showSnackbar('Presupuesto eliminado.', 'info');
  };

  // --- Funciones de Seguimiento de Gastos ---
  const handleTrackExpense = (budget) => {
    setSelectedBudget(budget);
    setDialogType('trackExpense');
    setDialogOpen(true);
  };

  const handleSaveExpense = (budgetId, updatedLineItems) => {
    setBudgets(budgets.map(b => {
      if (b.id === budgetId) {
        const newTotalBudget = updatedLineItems.reduce((sum, item) => sum + item.budgeted, 0);
        return { ...b, lineItems: updatedLineItems, totalBudget: newTotalBudget };
      }
      return b;
    }));
    showSnackbar('Gastos actualizados con éxito.', 'success');
    setDialogOpen(false);
  };

  // --- Diálogos Internos ---

  const BudgetFormDialog = () => {
    const [formData, setFormData] = useState(selectedBudget || {
      name: '', type: 'General', ownerId: '', period: '', startDate: '', endDate: '',
      lineItems: [{ category: '', budgeted: 0, actual: 0, description: '' }]
    });

    const isViewMode = dialogType === 'viewBudget';

    useEffect(() => {
      if (!formData.lineItems || formData.lineItems.length === 0) {
        setFormData(prev => ({ ...prev, lineItems: [{ category: '', budgeted: 0, actual: 0, description: '' }] }));
      }
    }, []);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLineItemChange = (index, field, value) => {
      const newLineItems = [...formData.lineItems];
      newLineItems[index][field] = field === 'budgeted' || field === 'actual' ? parseFloat(value) || 0 : value;
      setFormData({ ...formData, lineItems: newLineItems });
    };

    const addLineItem = () => {
      setFormData({ ...formData, lineItems: [...formData.lineItems, { category: '', budgeted: 0, actual: 0, description: '' }] });
    };

    const removeLineItem = (index) => {
      const newLineItems = formData.lineItems.filter((_, i) => i !== index);
      setFormData({ ...formData, lineItems: newLineItems });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.period || !formData.startDate || !formData.endDate || formData.lineItems.length === 0) {
        showSnackbar('Por favor, completa todos los campos obligatorios y al menos una partida.', 'error');
        return;
      }
      handleSaveBudget(formData);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#1a237e', color: '#fff' }}>
          {isViewMode ? 'Detalles del Presupuesto' : (dialogType === 'newBudget' ? 'Crear Nuevo Presupuesto' : 'Editar Presupuesto')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre del Presupuesto" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel>Tipo de Presupuesto</InputLabel>
                <Select label="Tipo de Presupuesto" name="type" value={formData.type} onChange={handleChange}>
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Departamento">Por Departamento</MenuItem>
                  <MenuItem value="Proyecto">Por Proyecto</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {(formData.type === 'Departamento' || formData.type === 'Proyecto') && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={isViewMode}>
                  <InputLabel>{formData.type === 'Departamento' ? 'Departamento' : 'Proyecto'}</InputLabel>
                  <Select label={formData.type === 'Departamento' ? 'Departamento' : 'Proyecto'} name="ownerId" value={formData.ownerId} onChange={handleChange}>
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    {formData.type === 'Departamento' ?
                      departments.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>) :
                      projects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField label="Período (Ej. 2025-Q2, 2025-06)" name="period" value={formData.period} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de Inicio" name="startDate" type="date" value={formData.startDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de Fin" name="endDate" type="date" value={formData.endDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} disabled={isViewMode} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#1a237e' }}>Partidas Presupuestarias</Typography>
              {formData.lineItems.map((item, index) => (
                <Grid container spacing={2} key={index} sx={{ mb: 1, p: 1, borderRadius: 1, border: '1px solid #eee' }}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth disabled={isViewMode}>
                      <InputLabel>Categoría</InputLabel>
                      <Select label="Categoría" value={item.category} onChange={(e) => handleLineItemChange(index, 'category', e.target.value)}>
                        <MenuItem value=""><em>Seleccionar Categoría</em></MenuItem>
                        {budgetCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="Presupuestado" type="number" value={item.budgeted} onChange={(e) => handleLineItemChange(index, 'budgeted', e.target.value)} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">USD</InputAdornment> }} required disabled={isViewMode} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField label="Gasto Real (Actual)" type="number" value={item.actual} onChange={(e) => handleLineItemChange(index, 'actual', e.target.value)} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">USD</InputAdornment> }} disabled={isViewMode && dialogType !== 'trackExpense'} />
                  </Grid>
                  <Grid item xs={12} sm={2} display="flex" alignItems="center">
                    {!isViewMode && formData.lineItems.length > 1 && (
                      <Tooltip title="Eliminar Partida">
                        <IconButton color="error" onClick={() => removeLineItem(index)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Descripción de Partida" value={item.description} onChange={(e) => handleLineItemChange(index, 'description', e.target.value)} fullWidth multiline rows={1} disabled={isViewMode} />
                  </Grid>
                </Grid>
              ))}
              {!isViewMode && (
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addLineItem} sx={{ mt: 1, bgcolor: '#00c853', '&:hover': { bgcolor: '#00a142' }, color: '#fff' }}>
                  Añadir Partida
                </Button>
              )}
            </Grid>
            {isViewMode && formData.status && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={formData.status === 'Activo'} disabled />}
                  label={`Estado: ${formData.status}`}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#1a237e', '&:hover': { bgcolor: '#0d47a1' } }}>
              {dialogType === 'newBudget' ? 'Crear Presupuesto' : 'Guardar Cambios'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const TrackExpenseDialog = () => {
    const [currentLineItems, setCurrentLineItems] = useState(selectedBudget?.lineItems || []);

    const handleActualChange = (index, value) => {
      const newLineItems = [...currentLineItems];
      newLineItems[index].actual = parseFloat(value) || 0;
      setCurrentLineItems(newLineItems);
    };

    const handleSubmit = () => {
      handleSaveExpense(selectedBudget.id, currentLineItems);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#1a237e', color: '#fff' }}>
          Registrar Gasto para: {selectedBudget?.name}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Alert severity="info" sx={{mb: 2}}>
            Actualiza el "Gasto Real" para cada partida presupuestaria.
          </Alert>
          {currentLineItems.length > 0 ? (
            currentLineItems.map((item, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, bgcolor: '#fafafa' }}>
                <Typography variant="subtitle2" sx={{fontWeight: 600, color: '#333'}}>Categoría: {item.category}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{mb:1}}>{item.description}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Presupuestado"
                      value={formatCurrency(item.budgeted)}
                      fullWidth
                      InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">USD</InputAdornment> }}
                      sx={{ '& .MuiInputBase-input': { fontWeight: 'bold' } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Gasto Real (Actual)"
                      type="number"
                      value={item.actual}
                      onChange={(e) => handleActualChange(index, e.target.value)}
                      fullWidth
                      InputProps={{ startAdornment: <InputAdornment position="start">USD</InputAdornment> }}
                      required
                    />
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <Typography>No hay partidas presupuestarias definidas para este presupuesto.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#00c853', '&:hover': { bgcolor: '#00a142' } }}>
            Guardar Gastos
          </Button>
        </DialogActions>
      </Dialog>
    );
  };


  const getDialogComponent = () => {
    switch (dialogType) {
      case 'viewBudget':
      case 'newBudget':
      case 'editBudget':
        return <BudgetFormDialog />;
      case 'trackExpense':
        return <TrackExpenseDialog />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#1a237e', borderBottom: '1px solid #283593' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#e8eaf6' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <AssignmentTurnedInIcon sx={{ fontSize: 36, mr: 1, color: '#ffeb3b' }} /> {/* Amarillo para control */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Presupuestos y Control
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#3f51b5', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1a237e' }}>
            Gestión Financiera Estratégica
          </Typography>
          <Typography variant="h6" color="#616161">
            Controla tus gastos, monitorea el presupuesto y asegura la estabilidad financiera.
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
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#1a237e', // Azul marino
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#1a237e', // Azul marino
                },
              },
            }}
          >
            <Tab label="Vista General Presupuestaria" value="budget_overview" icon={<MonetizationOnIcon />} iconPosition="start" />
            <Tab label="Seguimiento de Gastos" value="expense_tracking" icon={<TrackChangesIcon />} iconPosition="start" />
            <Tab label="Alertas y Reportes" value="alerts_reporting" icon={<NotificationsActiveIcon />} iconPosition="start" />
            <Tab label="Configuración" value="settings" icon={<SettingsIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Vista General Presupuestaria */}
          {currentTab === 'budget_overview' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <MonetizationOnIcon sx={{ color: '#1a237e', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Resumen de Presupuestos Activos
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewBudget} sx={{ textTransform: 'none', bgcolor: '#00c853', '&:hover': { bgcolor: '#00a142' } }}>
                  Crear Nuevo Presupuesto
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e8eaf6' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Presupuesto</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Período</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Total Presupuestado</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Gasto Actual</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>% Usado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {budgets.length > 0 ? (
                      budgets.map((budget) => {
                        const { budgetedTotal, actualTotal, percentageUsed } = calculateBudgetUsage(budget.lineItems);
                        let statusChipColor = 'success';
                        let statusChipIcon = <CheckCircleIcon sx={{fontSize:'inherit'}}/>;
                        let statusText = 'Dentro del Presupuesto';

                        if (percentageUsed >= 100) {
                          statusChipColor = 'error';
                          statusChipIcon = <ErrorIcon sx={{fontSize:'inherit'}}/>;
                          statusText = 'Excedido';
                        } else if (percentageUsed >= 80) {
                          statusChipColor = 'warning';
                          statusChipIcon = <WarningIcon sx={{fontSize:'inherit'}}/>;
                          statusText = 'Casi Excedido';
                        }

                        return (
                          <TableRow key={budget.id} hover>
                            <TableCell component="th" scope="row">
                              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{budget.name}</Typography>
                              {budget.ownerId && (
                                <Chip label={`${budget.type}: ${getOwnerName(budget.type, budget.ownerId)}`} size="small" sx={{mt:0.5}} />
                              )}
                            </TableCell>
                            <TableCell>{budget.type}</TableCell>
                            <TableCell>{budget.period}</TableCell>
                            <TableCell align="right">{formatCurrency(budgetedTotal)}</TableCell>
                            <TableCell align="right" sx={{ color: percentageUsed > 100 ? '#d50000' : (percentageUsed >= 80 ? '#ff9800' : 'inherit') }}>
                              {formatCurrency(actualTotal)}
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min(percentageUsed, 100)} // Cap at 100% for visual bar
                                  color={percentageUsed >= 100 ? 'error' : (percentageUsed >= 80 ? 'warning' : 'primary')}
                                  sx={{ width: 80 }}
                                />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: percentageUsed >= 100 ? '#d50000' : (percentageUsed >= 80 ? '#ff9800' : '#1a237e') }}>
                                  {percentageUsed.toFixed(1)}%
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={statusText}
                                color={statusChipColor}
                                size="small"
                                icon={statusChipIcon}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title="Ver Detalles">
                                <IconButton size="small" onClick={() => handleViewBudget(budget)}><VisibilityIcon color="primary" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Editar Presupuesto">
                                <IconButton size="small" onClick={() => handleEditBudget(budget)}><EditIcon color="action" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Registrar Gasto">
                                <IconButton size="small" onClick={() => handleTrackExpense(budget)}><TrackChangesIcon color="secondary" /></IconButton>
                              </Tooltip>
                              <Tooltip title="Eliminar Presupuesto">
                                <IconButton size="small" onClick={() => handleDeleteBudget(budget.id)}><DeleteOutlineIcon color="error" /></IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow><TableCell colSpan={8} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay presupuestos definidos.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(budgets.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="info" sx={{ mt: 3 }}>
                Una visión general clara de tus compromisos financieros y su rendimiento actual.
              </Alert>
            </Paper>
          )}

          {/* Tab: Seguimiento de Gastos */}
          {currentTab === 'expense_tracking' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <TrackChangesIcon sx={{ color: '#1a237e', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Seguimiento Detallado de Gastos por Presupuesto
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Datos de gastos actualizados', 'info')}>
                  Refrescar Datos
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{ mb: 3 }}>
                Haz clic en "Registrar Gasto" para actualizar el gasto real de un presupuesto.
              </Alert>

              <Grid container spacing={3}>
                {budgets.length > 0 ? (
                  budgets.map((budget) => {
                    const { budgetedTotal, actualTotal, remaining, percentageUsed } = calculateBudgetUsage(budget.lineItems);
                    return (
                      <Grid item xs={12} md={6} lg={4} key={budget.id}>
                        <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #1a237e', height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <CardHeader
                            title={budget.name}
                            subheader={`${budget.period} | ${budget.type} ${budget.ownerId ? `: ${getOwnerName(budget.type, budget.ownerId)}` : ''}`}
                            titleTypographyProps={{ variant: 'h6', fontWeight: 600, color: '#1a237e' }}
                            subheaderTypographyProps={{ color: 'text.secondary' }}
                            action={
                              <Tooltip title="Registrar Gasto">
                                <IconButton color="secondary" onClick={() => handleTrackExpense(budget)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" color="text.secondary">Total Presupuestado:</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a237e' }}>{formatCurrency(budgetedTotal)}</Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Gasto Actual:</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: percentageUsed > 100 ? '#d50000' : (percentageUsed >= 80 ? '#ff9800' : '#00c853') }}>
                              {formatCurrency(actualTotal)}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Presupuesto Restante:</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: remaining < 0 ? '#d50000' : '#00c853' }}>
                              {formatCurrency(remaining)}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" color="text.secondary">Porcentaje Usado ({percentageUsed.toFixed(1)}%):</Typography>
                              <LinearProgress
                                variant="determinate"
                                value={Math.min(percentageUsed, 100)}
                                color={percentageUsed >= 100 ? 'error' : (percentageUsed >= 80 ? 'warning' : 'primary')}
                                sx={{ height: 10, borderRadius: 5, mt: 0.5 }}
                              />
                              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', mt: 0.5 }}>
                                {percentageUsed >= 100 ? 'Excedido' : (percentageUsed >= 80 ? 'Por encima del 80%' : 'Normal')}
                              </Typography>
                            </Box>
                          </CardContent>
                          <CardActions>
                            <Button size="small" startIcon={<VisibilityIcon />} onClick={() => handleViewBudget(budget)}>Ver Detalles</Button>
                            <Button size="small" startIcon={<EditIcon />} onClick={() => handleEditBudget(budget)}>Editar</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })
                ) : (
                  <Grid item xs={12}>
                    <Alert severity="info">No hay presupuestos activos para realizar seguimiento de gastos.</Alert>
                  </Grid>
                )}
              </Grid>

              <Alert severity="success" sx={{ mt: 3 }}>
                Mantén tus finanzas bajo control actualizando regularmente el gasto real.
              </Alert>
            </Paper>
          )}

          {/* Tab: Alertas y Reportes */}
          {currentTab === 'alerts_reporting' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <NotificationsActiveIcon sx={{ color: '#1a237e', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Alertas de Presupuesto y Reportes de Rendimiento
                </Typography>
                <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => showSnackbar('Descargando reporte de rendimiento general...', 'info')} sx={{ textTransform: 'none', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                  Generar Reporte General
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="error" sx={{ mb: 3 }}>
                ¡Atención! Estos son los presupuestos que requieren tu acción inmediata.
              </Alert>

              <Typography variant="h6" sx={{ color: '#d50000', mb: 2, display: 'flex', alignItems: 'center' }}>
                <ErrorIcon sx={{mr: 1, color: '#d50000'}} /> Presupuestos Excedidos o en Riesgo
              </Typography>
              <List sx={{ mb: 4, border: '1px solid #ffcdd2', borderRadius: 2, bgcolor: '#ffebee' }}>
                {budgets.filter(b => calculateBudgetUsage(b.lineItems).percentageUsed >= 80).length > 0 ? (
                  budgets.filter(b => calculateBudgetUsage(b.lineItems).percentageUsed >= 80).map(budget => {
                    const { percentageUsed, remaining } = calculateBudgetUsage(budget.lineItems);
                    const isExceeded = percentageUsed >= 100;
                    return (
                      <ListItem key={budget.id} divider>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: isExceeded ? '#d50000' : '#ff9800' }}>
                            {isExceeded ? <ErrorIcon /> : <WarningIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>{budget.name}</Typography>
                              <Chip label={isExceeded ? 'EXCEDIDO' : 'ALTO RIESGO'} color={isExceeded ? 'error' : 'warning'} size="small" />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Período: {budget.period} | Tipo: {budget.type} {budget.ownerId ? `(${getOwnerName(budget.type, budget.ownerId)})` : ''}
                              </Typography>
                              <Typography variant="body2" sx={{ color: isExceeded ? '#d50000' : '#ff9800', fontWeight: 600 }}>
                                {isExceeded ? `Gasto: ${percentageUsed.toFixed(1)}% del presupuesto` : `Usado: ${percentageUsed.toFixed(1)}% | Restante: ${formatCurrency(remaining)}`}
                              </Typography>
                            </Box>
                          }
                        />
                        <Tooltip title="Ver Detalles del Presupuesto">
                          <IconButton edge="end" onClick={() => handleViewBudget(budget)}><VisibilityIcon color="action" /></IconButton>
                        </Tooltip>
                      </ListItem>
                    );
                  })
                ) : (
                  <ListItem><ListItemText secondary="No hay presupuestos excedidos o en riesgo." sx={{textAlign: 'center', py: 2}} /></ListItem>
                )}
              </List>

              <Typography variant="h6" sx={{ color: '#1a237e', mb: 2, mt: 4, display: 'flex', alignItems: 'center' }}>
                <AnalyticsIcon sx={{mr: 1, color: '#1a237e'}} /> Reportes de Rendimiento Presupuestario
              </Typography>
              <Accordion sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <AccordionSummary expandIcon={<ChevronRightIcon />} sx={{ bgcolor: '#e8eaf6', borderRadius: '2px 2px 0 0' }}>
                  <Typography variant="subtitle1" sx={{fontWeight: 600}}>Reporte de Variación Mensual</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{mb:2}}>
                    Este reporte muestra la diferencia entre el gasto presupuestado y el gasto real mes a mes.
                  </Typography>
                  <DummyLineChart title="Variación Mensual de Gastos" data={[]} />
                  <Button startIcon={<DownloadIcon />} variant="outlined" sx={{ mt: 2 }}>Descargar CSV</Button>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <AccordionSummary expandIcon={<ChevronRightIcon />} sx={{ bgcolor: '#e8eaf6' }}>
                  <Typography variant="subtitle1" sx={{fontWeight: 600}}>Reporte por Categoría de Gasto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{mb:2}}>
                    Analiza dónde se está yendo tu dinero, mostrando el gasto real por categoría en todos los presupuestos.
                  </Typography>
                  <DummyBarChart title="Gasto Real por Categoría" data={[]} />
                  <Button startIcon={<DownloadIcon />} variant="outlined" sx={{ mt: 2 }}>Descargar CSV</Button>
                </AccordionDetails>
              </Accordion>
              <Alert severity="success" sx={{ mt: 3 }}>
                Mantente informado con alertas proactivas y reportes detallados.
              </Alert>
            </Paper>
          )}

          {/* Tab: Configuración */}
          {currentTab === 'settings' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SettingsIcon sx={{ color: '#1a237e', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Configuración del Panel de Presupuestos
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Administra las opciones generales y los valores predeterminados para la gestión de presupuestos.
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid #1a237e' }}>
                    <CardHeader title="Umbrales de Alerta" titleTypographyProps={{variant: 'h6', fontWeight: 600, color: '#1a237e'}} />
                    <CardContent>
                      <TextField
                        label="Umbral de Advertencia (%)"
                        type="number"
                        defaultValue={80} // Example default
                        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                        fullWidth
                        sx={{ mb: 2 }}
                        helperText="Porcentaje de uso del presupuesto para activar una alerta de 'Casi Excedido'."
                      />
                      <TextField
                        label="Umbral de Excedido (%)"
                        type="number"
                        defaultValue={100} // Example default
                        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                        fullWidth
                        helperText="Porcentaje de uso del presupuesto para activar una alerta de 'Excedido'."
                      />
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" sx={{ bgcolor: '#00c853', '&:hover': { bgcolor: '#00a142' } }} onClick={() => showSnackbar('Umbrales de alerta guardados.', 'success')}>Guardar Umbrales</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid #1a237e' }}>
                    <CardHeader title="Categorías Presupuestarias" titleTypographyProps={{variant: 'h6', fontWeight: 600, color: '#1a237e'}} />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{mb:1}}>
                        Aquí puedes gestionar las categorías de gasto disponibles para tus presupuestos.
                      </Typography>
                      <List dense>
                        {budgetCategories.map((cat, index) => (
                          <ListItem key={cat} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => showSnackbar(`Eliminar categoría: ${cat} (simulado)`, 'info')}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          }>
                            <ListItemText primary={cat} />
                          </ListItem>
                        ))}
                      </List>
                      <TextField
                        label="Añadir Nueva Categoría"
                        fullWidth
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => showSnackbar('Añadir nueva categoría (simulado)', 'info')}>
                                <AddCircleOutlineIcon color="primary" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid #1a237e' }}>
                    <CardHeader title="Departamentos" titleTypographyProps={{variant: 'h6', fontWeight: 600, color: '#1a237e'}} />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{mb:1}}>
                        Gestiona los departamentos que pueden tener presupuestos asignados.
                      </Typography>
                      <List dense>
                        {departments.map((dept) => (
                          <ListItem key={dept.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => showSnackbar(`Eliminar departamento: ${dept.name} (simulado)`, 'info')}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          }>
                            <ListItemText primary={dept.name} />
                          </ListItem>
                        ))}
                      </List>
                      <TextField
                        label="Añadir Nuevo Departamento"
                        fullWidth
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => showSnackbar('Añadir nuevo departamento (simulado)', 'info')}>
                                <AddCircleOutlineIcon color="primary" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ p: 2, borderRadius: 2, borderLeft: '4px solid #1a237e' }}>
                    <CardHeader title="Proyectos" titleTypographyProps={{variant: 'h6', fontWeight: 600, color: '#1a237e'}} />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" sx={{mb:1}}>
                        Gestiona los proyectos a los que se pueden asignar presupuestos.
                      </Typography>
                      <List dense>
                        {projects.map((proj) => (
                          <ListItem key={proj.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => showSnackbar(`Eliminar proyecto: ${proj.name} (simulado)`, 'info')}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          }>
                            <ListItemText primary={proj.name} />
                          </ListItem>
                        ))}
                      </List>
                      <TextField
                        label="Añadir Nuevo Proyecto"
                        fullWidth
                        sx={{ mt: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => showSnackbar('Añadir nuevo proyecto (simulado)', 'info')}>
                                <AddCircleOutlineIcon color="primary" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Alert severity="success" sx={{ mt: 3 }}>
                Personaliza la plataforma para que se ajuste a las necesidades específicas de tu control presupuestario.
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

export default BudgetControlPanel;