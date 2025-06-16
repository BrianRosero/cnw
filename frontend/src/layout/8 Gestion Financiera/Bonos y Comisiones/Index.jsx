import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  FormGroup, FormControlLabel, Switch, Checkbox, OutlinedInput,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icono principal de Comisiones
import PercentIcon from '@mui/icons-material/Percent'; // Esquema de Comisiones
import GroupIcon from '@mui/icons-material/Group'; // Gestión de Comerciales
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Cálculo de Comisiones / Ganancias
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'; // Pagos de Comisiones
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Crear nuevo
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Eliminar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import DownloadIcon from '@mui/icons-material/Download'; // Descargar
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración general
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Pagado
import PendingActionsIcon from '@mui/icons-material/PendingActions'; // Pendiente
import BlockIcon from '@mui/icons-material/Block'; // Anulado/Bloqueado
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // % Crecimiento
import PeopleIcon from '@mui/icons-material/People'; // Clientes
import PriceCheckIcon from '@mui/icons-material/PriceCheck'; // Ganancias
import RuleIcon from '@mui/icons-material/Rule'; // Reglas
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Período
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Monto Comisión
import DateRangeIcon from '@mui/icons-material/DateRange'; // Rango de Fechas
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar

// --- Datos Simulados para Comisiones ---

const currentUser = {
  id: 'ADM001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Gerente Comercial',
};

const commissionSchemes = [
  {
    id: 'SCH001',
    name: 'Esquema Estándar - Ventas Nuevas',
    description: 'Comisión base para ventas de clientes nuevos.',
    type: 'Ventas', // 'Ventas', 'Ganancia'
    calculationMethod: 'Porcentaje sobre Venta Neta', // 'Porcentaje sobre Venta Neta', 'Porcentaje sobre Ganancia Bruta', 'Escalonado por Venta', 'Fijo por Venta'
    rate: 0.05, // 5%
    minSalesThreshold: 1000, // USD
    isActive: true,
    applicableProducts: [], // empty means all
  },
  {
    id: 'SCH002',
    name: 'Esquema Premium - Alto Volumen',
    description: 'Tasa de comisión mejorada para ventas que superan $10,000.',
    type: 'Ventas',
    calculationMethod: 'Escalonado por Venta',
    tiers: [
      { min: 0, max: 10000, rate: 0.03 }, // 3% hasta 10k
      { min: 10000.01, max: 50000, rate: 0.07 }, // 7% de 10k a 50k
      { min: 50000.01, max: Infinity, rate: 0.10 }, // 10% de 50k en adelante
    ],
    isActive: true,
    applicableProducts: ['PROD_A', 'PROD_B'], // Solo aplica a ciertos productos
  },
  {
    id: 'SCH003',
    name: 'Esquema de Ganancia - Servicios',
    description: 'Comisión sobre el margen de ganancia de servicios.',
    type: 'Ganancia',
    calculationMethod: 'Porcentaje sobre Ganancia Bruta',
    rate: 0.20, // 20%
    minProfitThreshold: 50, // USD
    isActive: true,
    applicableProducts: ['SERV_INST', 'SERV_MANT'],
  },
];

const salesRepresentatives = [
  { id: 'SR001', name: 'Laura Restrepo', email: 'laura.r@example.com', clients: ['CL001', 'CL004'] },
  { id: 'SR002', name: 'Diego Márquez', email: 'diego.m@example.com', clients: ['CL002', 'CL005'] },
  { id: 'SR003', name: 'Sofía Vargas', email: 'sofia.v@example.com', clients: ['CL003'] },
];

const simulatedSales = [
  { id: 'SALE001', invoiceId: 'FV2025-001', clientId: 'CL001', saleRepId: 'SR001', amount: 1500.00, cost: 800.00, date: '2025-05-25', status: 'Cerrada', schemeId: 'SCH001', products: ['PROD_C'] },
  { id: 'SALE002', invoiceId: 'FV2025-002', clientId: 'CL002', saleRepId: 'SR002', amount: 250.75, cost: 100.00, date: '2025-06-01', status: 'Cerrada', schemeId: 'SCH001', products: ['PROD_D'] },
  { id: 'SALE003', invoiceId: 'FV2025-003', clientId: 'CL003', saleRepId: 'SR003', amount: 750.00, cost: 300.00, date: '2025-05-30', status: 'Cerrada', schemeId: 'SCH001', products: ['PROD_E'] },
  { id: 'SALE004', invoiceId: 'FV2025-004', clientId: 'CL004', saleRepId: 'SR001', amount: 12000.00, cost: 7000.00, date: '2025-06-05', status: 'Cerrada', schemeId: 'SCH002', products: ['PROD_A'] }, // High value sale for SR001
  { id: 'SALE005', invoiceId: 'FV2025-005', clientId: 'CL005', saleRepId: 'SR002', amount: 400.00, cost: 150.00, date: '2025-06-10', status: 'Cerrada', schemeId: 'SCH003', products: ['SERV_INST'] }, // Service sale for SR002
];

const commissionPayments = [
  { id: 'PAY001', repId: 'SR001', period: 'Mayo 2025', totalCommission: 125.00, status: 'Pagado', paymentDate: '2025-06-05' },
  { id: 'PAY002', repId: 'SR002', period: 'Mayo 2025', totalCommission: 12.50, status: 'Pagado', paymentDate: '2025-06-05' },
  { id: 'PAY003', repId: 'SR003', period: 'Mayo 2025', totalCommission: 37.50, status: 'Pagado', paymentDate: '2025-06-05' },
];

// Helper to get Commercial Name
const getCommercialName = (id) => salesRepresentatives.find(rep => rep.id === id)?.name || 'N/A';
const getSchemeName = (id) => commissionSchemes.find(scheme => scheme.id === id)?.name || 'N/A';

// Componente principal
function SalesCommissionPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('commission_schemes'); // 'commission_schemes', 'sales_reps', 'commission_calc', 'payment_management'
  const [schemes, setSchemes] = useState(commissionSchemes);
  const [salesReps, setSalesReps] = useState(salesRepresentatives);
  const [sales, setSales] = useState(simulatedSales);
  const [payments, setPayments] = useState(commissionPayments);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'viewScheme', 'newScheme', 'editScheme', 'viewRep', 'editRep', 'viewSale', 'processPayment'
  const [selectedItem, setSelectedItem] = useState(null); // Used for scheme, rep, sale, payment

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

  // --- Funciones de Gestión de Esquemas ---
  const handleViewScheme = (scheme) => {
    setSelectedItem(scheme);
    setDialogType('viewScheme');
    setDialogOpen(true);
  };

  const handleCreateNewScheme = () => {
    setSelectedItem(null);
    setDialogType('newScheme');
    setDialogOpen(true);
  };

  const handleEditScheme = (scheme) => {
    setSelectedItem(scheme);
    setDialogType('editScheme');
    setDialogOpen(true);
  };

  const handleSaveScheme = (newSchemeData) => {
    if (selectedItem) {
      // Editing existing scheme
      setSchemes(schemes.map(s => s.id === selectedItem.id ? { ...s, ...newSchemeData } : s));
      showSnackbar('Esquema de comisión actualizado con éxito.', 'success');
    } else {
      // Creating new scheme
      const newId = `SCH${String(schemes.length + 1).padStart(3, '0')}`;
      setSchemes([...schemes, { id: newId, ...newSchemeData, isActive: true }]);
      showSnackbar('Esquema de comisión creado con éxito.', 'success');
    }
    setDialogOpen(false);
  };

  const handleDeleteScheme = (schemeId) => {
    setSchemes(schemes.filter(s => s.id !== schemeId));
    showSnackbar('Esquema de comisión eliminado.', 'info');
  };

  // --- Funciones de Gestión de Comerciales ---
  const handleViewRep = (rep) => {
    setSelectedItem(rep);
    setDialogType('viewRep');
    setDialogOpen(true);
  };

  const handleCreateNewRep = () => {
    setSelectedItem(null);
    setDialogType('newRep');
    setDialogOpen(true);
  };

  const handleEditRep = (rep) => {
    setSelectedItem(rep);
    setDialogType('editRep');
    setDialogOpen(true);
  };

  const handleSaveRep = (newRepData) => {
    if (selectedItem) {
      setSalesReps(salesReps.map(r => r.id === selectedItem.id ? { ...r, ...newRepData } : r));
      showSnackbar('Datos de comercial actualizados.', 'success');
    } else {
      const newId = `SR${String(salesReps.length + 1).padStart(3, '0')}`;
      setSalesReps([...salesReps, { id: newId, ...newRepData, clients: [] }]);
      showSnackbar('Comercial creado con éxito.', 'success');
    }
    setDialogOpen(false);
  };

  const handleDeleteRep = (repId) => {
    setSalesReps(salesReps.filter(r => r.id !== repId));
    showSnackbar('Comercial eliminado.', 'info');
  };

  // --- Funciones de Cálculo de Comisiones ---
  const calculateCommission = (sale, scheme) => {
    let commission = 0;
    const netSale = sale.amount;
    const grossProfit = sale.amount - sale.cost;

    if (!scheme.isActive) return 0; // No commission if scheme is inactive

    if (scheme.type === 'Ventas') {
      if (scheme.calculationMethod === 'Porcentaje sobre Venta Neta') {
        if (netSale >= scheme.minSalesThreshold) {
          commission = netSale * scheme.rate;
        }
      } else if (scheme.calculationMethod === 'Escalonado por Venta') {
        let remainingAmount = netSale;
        scheme.tiers.forEach(tier => {
          if (remainingAmount > 0) {
            const applicableAmount = Math.min(remainingAmount, tier.max - tier.min);
            if (applicableAmount > 0) {
              commission += applicableAmount * tier.rate;
              remainingAmount -= applicableAmount;
            }
          }
        });
      }
    } else if (scheme.type === 'Ganancia') {
      if (scheme.calculationMethod === 'Porcentaje sobre Ganancia Bruta') {
        if (grossProfit >= scheme.minProfitThreshold) {
          commission = grossProfit * scheme.rate;
        }
      }
    }
    return commission;
  };

  const calculateAllCommissions = useCallback(() => {
    const updatedSales = sales.map(sale => {
      const scheme = schemes.find(s => s.id === sale.schemeId);
      if (scheme) {
        const commissionAmount = calculateCommission(sale, scheme);
        return { ...sale, commission: commissionAmount };
      }
      return { ...sale, commission: 0 }; // No scheme found
    });
    return updatedSales;
  }, [sales, schemes]);

  useEffect(() => {
    // Recalcular comisiones cuando cambian las ventas o los esquemas
    setSales(calculateAllCommissions());
  }, [calculateAllCommissions]);


  // --- Funciones de Gestión de Pagos ---
  const handleProcessPayment = (repId, period) => {
    const repSales = sales.filter(s => s.saleRepId === repId && s.date.startsWith(period));
    const totalCommission = repSales.reduce((sum, sale) => sum + (sale.commission || 0), 0);

    if (totalCommission > 0) {
      const newPaymentId = `PAY${String(payments.length + 1).padStart(3, '0')}`;
      setPayments([...payments, {
        id: newPaymentId,
        repId: repId,
        period: period,
        totalCommission: totalCommission,
        status: 'Pendiente',
        paymentDate: null,
        details: repSales.map(s => ({ saleId: s.id, amount: s.commission || 0, invoiceId: s.invoiceId }))
      }]);
      showSnackbar(`Pago de comisión para ${getCommercialName(repId)} (${period}) generado.`, 'success');
    } else {
      showSnackbar(`No hay comisiones pendientes para ${getCommercialName(repId)} en el período ${period}.`, 'info');
    }
  };

  const handleMarkPaymentAsPaid = (paymentId) => {
    setPayments(payments.map(p =>
      p.id === paymentId ? { ...p, status: 'Pagado', paymentDate: new Date().toISOString().split('T')[0] } : p
    ));
    showSnackbar('Pago de comisión marcado como "Pagado".', 'success');
  };

  const getDialogComponent = () => {
    switch (dialogType) {
      case 'viewScheme':
      case 'newScheme':
      case 'editScheme':
        return <SchemeFormDialog />;
      case 'viewRep':
      case 'newRep':
      case 'editRep':
        return <RepFormDialog />;
      case 'viewSale':
        return <SaleDetailDialog />;
      case 'processPayment':
        return <ProcessPaymentDialog />;
      default:
        return null;
    }
  };

  // --- Dialogos Internos ---

  const SchemeFormDialog = () => {
    const [formData, setFormData] = useState(selectedItem || {
      name: '', description: '', type: 'Ventas', calculationMethod: 'Porcentaje sobre Venta Neta',
      rate: 0, minSalesThreshold: 0, minProfitThreshold: 0, isActive: true, tiers: [{ min: 0, max: 0, rate: 0 }], applicableProducts: []
    });

    useEffect(() => {
      // Initialize tiers if method is tiered and tiers are not set or empty
      if (formData.calculationMethod === 'Escalonado por Venta' && (!formData.tiers || formData.tiers.length === 0)) {
        setFormData(prev => ({ ...prev, tiers: [{ min: 0, max: 0, rate: 0 }] }));
      }
    }, [formData.calculationMethod]);

    const handleChange = (e) => {
      let value = e.target.value;
      if (e.target.name === 'rate' || e.target.name === 'minSalesThreshold' || e.target.name === 'minProfitThreshold') {
        value = parseFloat(value) || 0;
      }
      setFormData({ ...formData, [e.target.name]: value });
    };

    const handleTierChange = (index, field, value) => {
      const newTiers = [...formData.tiers];
      newTiers[index][field] = parseFloat(value) || 0;
      setFormData({ ...formData, tiers: newTiers });
    };

    const addTier = () => {
      setFormData({ ...formData, tiers: [...formData.tiers, { min: 0, max: 0, rate: 0 }] });
    };

    const removeTier = (index) => {
      const newTiers = formData.tiers.filter((_, i) => i !== index);
      setFormData({ ...formData, tiers: newTiers });
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.type || !formData.calculationMethod) {
        showSnackbar('Por favor, completa todos los campos obligatorios.', 'error');
        return;
      }
      handleSaveScheme(formData);
    };

    const isViewMode = dialogType === 'viewScheme';

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>
          {isViewMode ? 'Detalles del Esquema' : (dialogType === 'newScheme' ? 'Crear Nuevo Esquema' : 'Editar Esquema')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre del Esquema" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Descripción" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={2} disabled={isViewMode} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel>Tipo de Comisión</InputLabel>
                <Select label="Tipo de Comisión" name="type" value={formData.type} onChange={handleChange}>
                  <MenuItem value="Ventas">Sobre Ventas</MenuItem>
                  <MenuItem value="Ganancia">Sobre Ganancia Bruta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel>Método de Cálculo</InputLabel>
                <Select label="Método de Cálculo" name="calculationMethod" value={formData.calculationMethod} onChange={handleChange}>
                  <MenuItem value="Porcentaje sobre Venta Neta">Porcentaje sobre Venta Neta</MenuItem>
                  <MenuItem value="Porcentaje sobre Ganancia Bruta">Porcentaje sobre Ganancia Bruta</MenuItem>
                  <MenuItem value="Escalonado por Venta">Escalonado por Venta</MenuItem>
                  <MenuItem value="Fijo por Venta">Fijo por Venta (ej. $100 por venta)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {(formData.calculationMethod === 'Porcentaje sobre Venta Neta' || formData.calculationMethod === 'Porcentaje sobre Ganancia Bruta') && (
              <Grid item xs={12} sm={6}>
                <TextField label="Tasa (%)" name="rate" type="number" value={formData.rate * 100} onChange={(e) => setFormData({...formData, rate: parseFloat(e.target.value) / 100})} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} required disabled={isViewMode} />
              </Grid>
            )}
            {formData.type === 'Ventas' && formData.calculationMethod !== 'Escalonado por Venta' && (
              <Grid item xs={12} sm={6}>
                <TextField label="Umbral Mín. Ventas (USD)" name="minSalesThreshold" type="number" value={formData.minSalesThreshold} onChange={handleChange} fullWidth disabled={isViewMode} />
              </Grid>
            )}
            {formData.type === 'Ganancia' && (
              <Grid item xs={12} sm={6}>
                <TextField label="Umbral Mín. Ganancia (USD)" name="minProfitThreshold" type="number" value={formData.minProfitThreshold} onChange={handleChange} fullWidth disabled={isViewMode} />
              </Grid>
            )}

            {formData.calculationMethod === 'Escalonado por Venta' && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#2196f3' }}>Niveles Escalonados</Typography>
                {formData.tiers.map((tier, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 1, border: '1px solid #eee', p: 1, borderRadius: 1 }}>
                    <Grid item xs={12} sm={4}>
                      <TextField label="Mínimo Venta" type="number" value={tier.min} onChange={(e) => handleTierChange(index, 'min', e.target.value)} fullWidth disabled={isViewMode} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField label="Máximo Venta" type="number" value={tier.max} onChange={(e) => handleTierChange(index, 'max', e.target.value)} fullWidth disabled={isViewMode} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField label="Tasa (%)" type="number" value={tier.rate * 100} onChange={(e) => handleTierChange(index, 'rate', parseFloat(e.target.value) / 100)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} disabled={isViewMode} />
                    </Grid>
                    <Grid item xs={12} sm={1} display="flex" alignItems="center">
                      {!isViewMode && formData.tiers.length > 1 && (
                        <Tooltip title="Eliminar Nivel">
                          <IconButton color="error" onClick={() => removeTier(index)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Grid>
                  </Grid>
                ))}
                {!isViewMode && (
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={addTier} sx={{ mt: 1, bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' }, color: '#fff' }}>
                    Añadir Nivel
                  </Button>
                )}
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} disabled={isViewMode} />}
                label="Esquema Activo"
              />
            </Grid>
            {isViewMode && selectedItem && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Productos Aplicables:</Typography>
                {selectedItem.applicableProducts && selectedItem.applicableProducts.length > 0 ? (
                  selectedItem.applicableProducts.map((prod, idx) => <Chip key={idx} label={prod} sx={{mr:1, mb:1}} />)
                ) : (
                  <Typography variant="body2">Aplica a todos los productos.</Typography>
                )}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
              {dialogType === 'newScheme' ? 'Crear Esquema' : 'Guardar Cambios'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const RepFormDialog = () => {
    const [formData, setFormData] = useState(selectedItem || { name: '', email: '', clients: [] });
    const [availableClients, setAvailableClients] = useState([
      { id: 'CL001', name: 'Cliente A S.A.S.' },
      { id: 'CL002', name: 'Tecno Innovación Ltda.' },
      { id: 'CL003', name: 'Distribuidora del Centro' },
      { id: 'CL004', name: 'Servicios Logísticos Omega' },
      { id: 'CL005', name: 'Marketing Digital Pro' },
      { id: 'CL006', name: 'Nuevo Cliente SAP' },
    ].filter(client => !salesReps.some(rep => rep.id !== (selectedItem?.id || '') && rep.clients.includes(client.id)))); // Filter out clients already assigned to other reps

    useEffect(() => {
      // Re-filter available clients on dialog open or selectedItem change
      setAvailableClients([
        { id: 'CL001', name: 'Cliente A S.A.S.' },
        { id: 'CL002', name: 'Tecno Innovación Ltda.' },
        { id: 'CL003', name: 'Distribuidora del Centro' },
        { id: 'CL004', name: 'Servicios Logísticos Omega' },
        { id: 'CL005', name: 'Marketing Digital Pro' },
        { id: 'CL006', name: 'Nuevo Cliente SAP' },
      ].filter(client => {
        const isAssignedToOtherRep = salesReps.some(rep => rep.id !== (selectedItem?.id || '') && rep.clients.includes(client.id));
        const isAssignedToCurrentRep = selectedItem && selectedItem.clients.includes(client.id);
        return !isAssignedToOtherRep || isAssignedToCurrentRep;
      }));
    }, [selectedItem, salesReps]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClientChange = (e) => {
      const { value } = e.target;
      setFormData(prev => ({
        ...prev,
        clients: typeof value === 'string' ? value.split(',') : value,
      }));
    };

    const handleSubmit = () => {
      if (!formData.name || !formData.email) {
        showSnackbar('Por favor, completa el nombre y el email del comercial.', 'error');
        return;
      }
      handleSaveRep(formData);
    };

    const isViewMode = dialogType === 'viewRep';

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>
          {isViewMode ? 'Detalles del Comercial' : (dialogType === 'newRep' ? 'Registrar Nuevo Comercial' : 'Editar Comercial')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Nombre del Comercial" name="name" value={formData.name} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required disabled={isViewMode} />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={isViewMode}>
                <InputLabel id="clients-select-label">Clientes Asignados</InputLabel>
                <Select
                  labelId="clients-select-label"
                  multiple
                  value={formData.clients}
                  onChange={handleClientChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Clientes Asignados" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={availableClients.find(c => c.id === value)?.name || value} />
                      ))}
                    </Box>
                  )}
                >
                  {availableClients.map((client) => (
                    <MenuItem
                      key={client.id}
                      value={client.id}
                      disabled={
                        !isViewMode && // Only disable if not in view mode
                        salesReps.some(rep => rep.id !== (selectedItem?.id || '') && rep.clients.includes(client.id)) && // If assigned to ANOTHER rep
                        !formData.clients.includes(client.id) // AND is not already selected by current rep
                      }
                    >
                      <Checkbox checked={formData.clients.indexOf(client.id) > -1} />
                      <ListItemText primary={client.name} />
                    </MenuItem>
                  ))}
                </Select>
                {availableClients.length === 0 && !isViewMode && (
                  <Alert severity="info" sx={{mt:1}}>No hay clientes disponibles para asignar.</Alert>
                )}
                {isViewMode && formData.clients.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{mt:1}}>Este comercial no tiene clientes asignados.</Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            {isViewMode ? 'Cerrar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
              {dialogType === 'newRep' ? 'Registrar Comercial' : 'Guardar Cambios'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  const SaleDetailDialog = () => {
    const sale = selectedItem;
    const commercialName = getCommercialName(sale?.saleRepId);
    const commissionAmount = sale?.commission || 0; // Already calculated and stored in `sales` state

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>Detalles de la Venta y Comisión</DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          {sale ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600 }}>Venta #{sale.id}</Typography>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Número Factura:</Typography>
                <Typography variant="body1">{sale.invoiceId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Cliente ID:</Typography>
                <Typography variant="body1">{sale.clientId}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Comercial:</Typography>
                <Typography variant="body1">{commercialName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Fecha de Venta:</Typography>
                <Typography variant="body1">{sale.date}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Monto de Venta:</Typography>
                <Typography variant="body1">USD {sale.amount.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Costo de Venta:</Typography>
                <Typography variant="body1">USD {sale.cost.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Esquema de Comisión Aplicado:</Typography>
                <Chip label={getSchemeName(sale.schemeId)} color="primary" sx={{mt:0.5}} />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#4caf50' }}>
                  Comisión Generada: USD {commissionAmount.toFixed(2)}
                </Typography>
                {commissionAmount === 0 && (
                  <Alert severity="warning" sx={{mt:1}}>Esta venta no generó comisión según el esquema aplicado o el umbral mínimo no se cumplió.</Alert>
                )}
              </Grid>
            </Grid>
          ) : (
            <Typography>Cargando detalles de la venta...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const ProcessPaymentDialog = () => {
    const [period, setPeriod] = useState(new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'));
    const [selectedRep, setSelectedRep] = useState('');

    const repsWithPendingCommissions = salesReps.filter(rep => {
      const repSales = sales.filter(s => s.saleRepId === rep.id && s.commission > 0);
      const totalCommissions = repSales.reduce((sum, s) => sum + s.commission, 0);
      return totalCommissions > 0 && !payments.some(p => p.repId === rep.id && p.period === period && p.status === 'Pagado');
    });


    const handleGeneratePayment = () => {
      if (!selectedRep || !period) {
        showSnackbar('Por favor, selecciona un comercial y un período.', 'error');
        return;
      }
      handleProcessPayment(selectedRep, period);
      setDialogOpen(false);
    };

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2196f3', color: '#fff' }}>Generar Pago de Comisión</DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Comercial</InputLabel>
            <Select
              value={selectedRep}
              label="Comercial"
              onChange={(e) => setSelectedRep(e.target.value)}
            >
              <MenuItem value=""><em>Seleccionar Comercial</em></MenuItem>
              {repsWithPendingCommissions.map(rep => (
                <MenuItem key={rep.id} value={rep.id}>{rep.name}</MenuItem>
              ))}
            </Select>
            {repsWithPendingCommissions.length === 0 && (
              <Alert severity="info" sx={{mt:1}}>No hay comerciales con comisiones pendientes para generar pagos en este período.</Alert>
            )}
          </FormControl>
          <TextField
            label="Período de Pago (YYYY-MM)"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            fullWidth
            margin="normal"
            helperText="Formato: AAAA-MM (ej. 2025-06)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cancelar</Button>
          <Button variant="contained" onClick={handleGeneratePayment} sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
            Generar Pago
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#1976d2', borderBottom: '1px solid #2196f3' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#bdbdbd' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <AttachMoneyIcon sx={{ fontSize: 36, mr: 1, color: '#ffc107' }} /> {/* Naranja para comisiones */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Esquema de Comisiones de Ventas
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#2196f3', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#2196f3' }}>
            Potencia tu Equipo de Ventas
          </Typography>
          <Typography variant="h6" color="#616161">
            Gestión transparente y eficiente de las comisiones de tus comerciales.
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
                backgroundColor: '#2196f3', // Azul vibrante
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#2196f3', // Azul vibrante
                },
              },
            }}
          >
            <Tab label="Esquemas de Comisión" value="commission_schemes" icon={<PercentIcon />} iconPosition="start" />
            <Tab label="Gestión de Comerciales" value="sales_reps" icon={<GroupIcon />} iconPosition="start" />
            <Tab label="Cálculo de Comisiones" value="commission_calc" icon={<TrendingUpIcon />} iconPosition="start" />
            <Tab label="Pagos de Comisiones" value="payment_management" icon={<PaidOutlinedIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Esquemas de Comisión */}
          {currentTab === 'commission_schemes' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <PercentIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Definición de Esquemas de Comisión
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewScheme} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Crear Nuevo Esquema
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Esquema</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Método de Cálculo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Activo</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schemes.length > 0 ? (
                      schemes.map((scheme) => (
                        <TableRow key={scheme.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{scheme.name}</Typography>
                          </TableCell>
                          <TableCell>{scheme.type}</TableCell>
                          <TableCell>{scheme.calculationMethod}</TableCell>
                          <TableCell>
                            <Chip
                              label={scheme.isActive ? 'Sí' : 'No'}
                              color={scheme.isActive ? 'success' : 'error'}
                              size="small"
                              icon={scheme.isActive ? <CheckCircleIcon sx={{fontSize:'inherit'}}/> : <BlockIcon sx={{fontSize:'inherit'}}/>}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewScheme(scheme)}><VisibilityIcon color="primary" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar Esquema">
                              <IconButton size="small" onClick={() => handleEditScheme(scheme)}><EditIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Esquema">
                              <IconButton size="small" onClick={() => handleDeleteScheme(scheme.id)}><DeleteOutlineIcon color="error" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={5} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay esquemas de comisión definidos.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(schemes.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="info" sx={{ mt: 3 }}>
                Define reglas claras y justas para calcular las comisiones de tu equipo de ventas.
              </Alert>
            </Paper>
          )}

          {/* Tab: Gestión de Comerciales */}
          {currentTab === 'sales_reps' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <GroupIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Administración de Comerciales y Clientes
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleCreateNewRep} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Registrar Nuevo Comercial
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Clientes Asignados</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesReps.length > 0 ? (
                      salesReps.map((rep) => (
                        <TableRow key={rep.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{rep.name}</Typography>
                          </TableCell>
                          <TableCell>{rep.email}</TableCell>
                          <TableCell>
                            {rep.clients.length > 0 ? (
                              rep.clients.map((clientId, index) => (
                                <Chip key={index} label={clientId} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                              ))
                            ) : (
                              <Typography variant="body2" color="text.secondary">Ninguno</Typography>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => handleViewRep(rep)}><VisibilityIcon color="primary" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar Comercial">
                              <IconButton size="small" onClick={() => handleEditRep(rep)}><EditIcon color="action" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Comercial">
                              <IconButton size="small" onClick={() => handleDeleteRep(rep.id)}><DeleteOutlineIcon color="error" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={4} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay comerciales registrados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(salesReps.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="info" sx={{ mt: 3 }}>
                Asigna clientes a cada comercial para un seguimiento preciso de las comisiones.
              </Alert>
            </Paper>
          )}

          {/* Tab: Cálculo de Comisiones */}
          {currentTab === 'commission_calc' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Cálculo de Comisiones por Venta
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => setSales(calculateAllCommissions())}>
                  Recalcular Todas
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{mb:3}}>
                Las comisiones se recalculan automáticamente en base a los esquemas activos.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Venta ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Comercial</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha Venta</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Monto Venta</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Ganancia Bruta</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#4caf50' }}>Comisión Generada</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Esquema</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sales.length > 0 ? (
                      sales.map((sale) => (
                        <TableRow key={sale.id} hover sx={{ bgcolor: sale.commission === 0 ? '#ffebee' : 'inherit' }}> {/* Highlight sales with 0 commission */}
                          <TableCell>{sale.id}</TableCell>
                          <TableCell>{getCommercialName(sale.saleRepId)}</TableCell>
                          <TableCell>{sale.date}</TableCell>
                          <TableCell align="right">USD {sale.amount.toFixed(2)}</TableCell>
                          <TableCell align="right">USD {(sale.amount - sale.cost).toFixed(2)}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600, color: sale.commission > 0 ? '#4caf50' : '#d32f2f' }}>
                            USD {sale.commission ? sale.commission.toFixed(2) : '0.00'}
                          </TableCell>
                          <TableCell align="center">
                            <Chip label={getSchemeName(sale.schemeId)} size="small" />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Ver Detalles de Cálculo">
                              <IconButton size="small" onClick={() => { setSelectedItem(sale); setDialogType('viewSale'); setDialogOpen(true); }}><VisibilityIcon color="primary" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={8} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay ventas registradas para cálculo de comisiones.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(sales.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="success" sx={{ mt: 3 }}>
                Monitorea en tiempo real las comisiones generadas por cada venta.
              </Alert>
            </Paper>
          )}

          {/* Tab: Pagos de Comisiones */}
          {currentTab === 'payment_management' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <PaidOutlinedIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión y Liquidación de Pagos de Comisiones
                </Typography>
                <Button variant="contained" startIcon={<MonetizationOnIcon />} onClick={() => { setDialogType('processPayment'); setDialogOpen(true); }} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Generar Pago de Comisión
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{mb:3}}>
                Aquí puedes liquidar las comisiones acumuladas para tus comerciales.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>ID Pago</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Comercial</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Período</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#4caf50' }}>Total Comisión</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha Pago</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.length > 0 ? (
                      payments.map((payment) => (
                        <TableRow key={payment.id} hover>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{getCommercialName(payment.repId)}</TableCell>
                          <TableCell>{payment.period}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 600, color: '#4caf50' }}>USD {payment.totalCommission.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip
                              label={payment.status}
                              color={payment.status === 'Pagado' ? 'success' : 'info'}
                              size="small"
                              icon={payment.status === 'Pagado' ? <CheckCircleIcon sx={{fontSize:'inherit'}}/> : <PendingActionsIcon sx={{fontSize:'inherit'}}/>}
                            />
                          </TableCell>
                          <TableCell>{payment.paymentDate || 'N/A'}</TableCell>
                          <TableCell align="center">
                            {payment.status !== 'Pagado' && (
                              <Tooltip title="Marcar como Pagado">
                                <IconButton size="small" onClick={() => handleMarkPaymentAsPaid(payment.id)}><CheckCircleIcon color="success" /></IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles del Pago">
                              <IconButton size="small" onClick={() => showSnackbar(`Ver detalles del pago ${payment.id}`, 'info')}><VisibilityIcon color="primary" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Descargar Reporte">
                              <IconButton size="small" onClick={() => showSnackbar(`Descargando reporte de pago ${payment.id}`, 'info')}><DownloadIcon color="action" /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay pagos de comisiones registrados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(payments.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="success" sx={{ mt: 3 }}>
                Procesa y registra los pagos de comisiones de manera eficiente.
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

export default SalesCommissionPanel;