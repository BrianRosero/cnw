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
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart'; // Icono principal de Análisis Financiero
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Estado de Ganancias
import QueryStatsIcon from '@mui/icons-material/QueryStats'; // KPIs Comerciales
import DescriptionIcon from '@mui/icons-material/Description'; // Reportes Financieros
import FilterListIcon from '@mui/icons-material/FilterList'; // Filtros
import RefreshIcon from '@mui/icons-material/Refresh'; // Refrescar datos
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Crecimiento
import TrendingDownIcon from '@mui/icons-material/TrendingDown'; // Decrecimiento
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Dinero
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Positivo
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Cuidado
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Negativo
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'; // Gráficos
import BarChartIcon from '@mui/icons-material/BarChart'; // Gráficos
import LineChartIcon from '@mui/icons-material/Timeline'; // Gráficos de línea
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Fechas
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Expandir

// --- Gráficos (simulados) ---
// Normalmente aquí integrarías librerías como Chart.js o Recharts
const DummyPieChart = ({ title, data }) => (
  <Box sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 2, textAlign: 'center', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <PieChartOutlineIcon sx={{ fontSize: 50, color: '#9e9e9e' }} />
    <Typography variant="subtitle1" sx={{ mt: 1, color: '#616161' }}>{title}</Typography>
    <Typography variant="body2" color="text.secondary">(Gráfico de Torta Simulado)</Typography>
  </Box>
);

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
  id: 'FIN001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Gerente Financiero',
};

// Datos para P&L (Estado de Ganancias y Pérdidas)
const financialData = {
  '2025-05': {
    period: 'Mayo 2025',
    totalRevenue: 150000,
    costOfGoodsSold: 60000,
    grossProfit: 90000,
    operatingExpenses: {
      salaries: 25000,
      rent: 5000,
      marketing: 8000,
      utilities: 2000,
      depreciation: 1500,
      others: 3000,
    },
    totalOperatingExpenses: 44500,
    operatingIncome: 45500,
    nonOperatingIncome: 1000,
    nonOperatingExpenses: 500,
    earningsBeforeTax: 46000,
    incomeTaxExpense: 10000,
    netIncome: 36000,
  },
  '2025-04': {
    period: 'Abril 2025',
    totalRevenue: 130000,
    costOfGoodsSold: 55000,
    grossProfit: 75000,
    operatingExpenses: {
      salaries: 24000,
      rent: 5000,
      marketing: 7000,
      utilities: 1800,
      depreciation: 1500,
      others: 2500,
    },
    totalOperatingExpenses: 41800,
    operatingIncome: 33200,
    nonOperatingIncome: 800,
    nonOperatingExpenses: 400,
    earningsBeforeTax: 33600,
    incomeTaxExpense: 7500,
    netIncome: 26100,
  },
  '2025-03': {
    period: 'Marzo 2025',
    totalRevenue: 160000,
    costOfGoodsSold: 62000,
    grossProfit: 98000,
    operatingExpenses: {
      salaries: 26000,
      rent: 5000,
      marketing: 9000,
      utilities: 2100,
      depreciation: 1500,
      others: 3200,
    },
    totalOperatingExpenses: 46800,
    operatingIncome: 51200,
    nonOperatingIncome: 1200,
    nonOperatingExpenses: 600,
    earningsBeforeTax: 51800,
    incomeTaxExpense: 12000,
    netIncome: 39800,
  },
};

// Datos para KPIs
const kpiData = {
  '2025-05': {
    salesConversionRate: 0.12, // 12%
    averageDealValue: 2500, // USD
    customerAcquisitionCost: 350, // USD
    customerRetentionRate: 0.85, // 85%
    grossProfitMargin: (financialData['2025-05'].grossProfit / financialData['2025-05'].totalRevenue), // Calculated
    netProfitMargin: (financialData['2025-05'].netIncome / financialData['2025-05'].totalRevenue), // Calculated
    cashConversionCycle: 45, // days
    debtToEquityRatio: 0.8,
  },
  '2025-04': {
    salesConversionRate: 0.10, // 10%
    averageDealValue: 2300, // USD
    customerAcquisitionCost: 380, // USD
    customerRetentionRate: 0.82, // 82%
    grossProfitMargin: (financialData['2025-04'].grossProfit / financialData['2025-04'].totalRevenue),
    netProfitMargin: (financialData['2025-04'].netIncome / financialData['2025-04'].totalRevenue),
    cashConversionCycle: 50,
    debtToEquityRatio: 0.9,
  },
  '2025-03': {
    salesConversionRate: 0.13, // 13%
    averageDealValue: 2700, // USD
    customerAcquisitionCost: 320, // USD
    customerRetentionRate: 0.88, // 88%
    grossProfitMargin: (financialData['2025-03'].grossProfit / financialData['2025-03'].totalRevenue),
    netProfitMargin: (financialData['2025-03'].netIncome / financialData['2025-03'].totalRevenue),
    cashConversionCycle: 40,
    debtToEquityRatio: 0.75,
  },
};

// Datos para Reportes Financieros (simulados)
const financialReports = [
  {
    id: 'RPT001',
    name: 'Estado de Flujos de Efectivo - Trimestre 1 2025',
    type: 'Flujo de Efectivo',
    period: 'Q1 2025',
    dateGenerated: '2025-04-15',
    generatedBy: 'Andrés Finanzas',
    status: 'Finalizado',
    downloadUrl: '/reports/cash_flow_q1_2025.pdf', // Placeholder
  },
  {
    id: 'RPT002',
    name: 'Balance General - Mayo 2025',
    type: 'Balance General',
    period: 'Mayo 2025',
    dateGenerated: '2025-06-05',
    generatedBy: 'Andrés Finanzas',
    status: 'Finalizado',
    downloadUrl: '/reports/balance_sheet_may_2025.pdf', // Placeholder
  },
  {
    id: 'RPT003',
    name: 'Análisis de Variación de Presupuesto - Mayo 2025',
    type: 'Análisis Presupuestal',
    period: 'Mayo 2025',
    dateGenerated: '2025-06-10',
    generatedBy: 'Andrés Finanzas',
    status: 'En Revisión',
    downloadUrl: null,
  },
];

// Helper para formato de moneda
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Helper para formato de porcentaje
const formatPercentage = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

// Helper para obtener la diferencia porcentual entre dos valores
const getPercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? Infinity : (current < 0 ? -Infinity : 0);
  return ((current - previous) / Math.abs(previous)) * 100;
};

// Componente principal
function FinancialAnalysisPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('profit_loss'); // 'profit_loss', 'kpis', 'financial_reports'
  const [selectedPeriod, setSelectedPeriod] = useState('2025-05'); // Default to latest period
  const [currentFinancialData, setCurrentFinancialData] = useState(financialData['2025-05']);
  const [currentKpiData, setCurrentKpiData] = useState(kpiData['2025-05']);
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

  // Update data when selectedPeriod changes
  useEffect(() => {
    setCurrentFinancialData(financialData[selectedPeriod] || {});
    setCurrentKpiData(kpiData[selectedPeriod] || {});
  }, [selectedPeriod]);

  // Available periods for selection
  const availablePeriods = useMemo(() => {
    return Object.keys(financialData).sort((a, b) => new Date(b) - new Date(a));
  }, []);

  // --- Financial Calculations for P&L ---
  const calculateFinancialMetrics = useCallback((data) => {
    if (!data || Object.keys(data).length === 0) {
      return { totalRevenue: 0, costOfGoodsSold: 0, grossProfit: 0, totalOperatingExpenses: 0, operatingIncome: 0, earningsBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, operatingExpenses: {} };
    }

    const totalOperatingExpenses = Object.values(data.operatingExpenses).reduce((sum, val) => sum + val, 0);
    const operatingIncome = data.grossProfit - totalOperatingExpenses;
    const earningsBeforeTax = operatingIncome + data.nonOperatingIncome - data.nonOperatingExpenses;
    const netIncome = earningsBeforeTax - data.incomeTaxExpense;

    return {
      ...data,
      totalOperatingExpenses,
      operatingIncome,
      earningsBeforeTax,
      netIncome,
    };
  }, []);

  const financialSummary = useMemo(() => {
    return calculateFinancialMetrics(currentFinancialData);
  }, [currentFinancialData, calculateFinancialMetrics]);

  const previousPeriodData = useMemo(() => {
    const currentIndex = availablePeriods.indexOf(selectedPeriod);
    if (currentIndex < availablePeriods.length - 1) {
      return calculateFinancialMetrics(financialData[availablePeriods[currentIndex + 1]]);
    }
    return null;
  }, [selectedPeriod, availablePeriods, calculateFinancialMetrics]);


  // Helper to render KPI status based on value and trend
  const renderKpiStatus = (value, goodThreshold, badThreshold, type = 'number') => {
    let icon = null;
    let color = 'text.primary';
    let text = type === 'percentage' ? formatPercentage(value) : formatCurrency(value);

    if (type === 'percentage') {
      if (value >= goodThreshold) {
        icon = <TrendingUpIcon fontSize="small" sx={{ color: '#4caf50' }} />; // Green for good growth/value
        color = '#4caf50';
      } else if (value <= badThreshold) {
        icon = <TrendingDownIcon fontSize="small" sx={{ color: '#f44336' }} />; // Red for bad decline/value
        color = '#f44336';
      } else {
        icon = <WarningAmberIcon fontSize="small" sx={{ color: '#ffb300' }} />; // Amber for warning/neutral
        color = '#ffb300';
      }
    } else if (type === 'currency' || type === 'number') {
      if (value >= goodThreshold) {
        icon = <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#4caf50' }} />;
        color = '#4caf50';
      } else if (value <= badThreshold) {
        icon = <ErrorOutlineIcon fontSize="small" sx={{ color: '#f44336' }} />;
        color = '#f44336';
      } else {
        icon = <WarningAmberIcon fontSize="small" sx={{ color: '#ffb300' }} />;
        color = '#ffb300';
      }
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: color, fontWeight: 600 }}>
        {icon} {text}
      </Box>
    );
  };

  // --- KPI Comparison Helper ---
  const getKpiTrend = (kpiName) => {
    if (!previousPeriodData || !kpiData[availablePeriods[availablePeriods.indexOf(selectedPeriod) + 1]]) return null;

    const currentVal = currentKpiData[kpiName];
    const prevVal = kpiData[availablePeriods[availablePeriods.indexOf(selectedPeriod) + 1]][kpiName];

    if (typeof currentVal === 'undefined' || typeof prevVal === 'undefined') return null;

    const change = getPercentageChange(currentVal, prevVal);
    const isPositiveTrend = (kpiName === 'salesConversionRate' || kpiName === 'averageDealValue' || kpiName === 'customerRetentionRate' || kpiName.includes('ProfitMargin')) ? true : false;
    const isNegativeTrend = (kpiName === 'customerAcquisitionCost' || kpiName === 'cashConversionCycle' || kpiName === 'debtToEquityRatio') ? true : false;

    let icon = null;
    let color = 'text.secondary';

    if (change === 0) {
      icon = null;
      color = 'text.secondary';
    } else if ((isPositiveTrend && change > 0) || (isNegativeTrend && change < 0)) {
      icon = <TrendingUpIcon sx={{ fontSize: '1rem', color: '#4caf50' }} />;
      color = '#4caf50';
    } else if ((isPositiveTrend && change < 0) || (isNegativeTrend && change > 0)) {
      icon = <TrendingDownIcon sx={{ fontSize: '1rem', color: '#f44336' }} />;
      color = '#f44336';
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: color, fontSize: '0.8rem' }}>
        {icon} {change !== 0 ? `${change > 0 ? '+' : ''}${change.toFixed(1)}% vs. P.Anterior` : 'Sin cambios'}
      </Box>
    );
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#2e7d32', borderBottom: '1px solid #388e3c' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#e8f5e9' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <ShowChartIcon sx={{ fontSize: 36, mr: 1, color: '#ffb300' }} /> {/* Ámbar para finanzas */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Panel de Análisis Financiero
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#4caf50', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#2e7d32' }}>
            Inteligencia Financiera para Decisiones Estratégicas
          </Typography>
          <Typography variant="h6" color="#616161">
            Analiza ganancias, monitorea KPIs y genera reportes para una visión clara de tu negocio.
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
                backgroundColor: '#2e7d32', // Verde oscuro vibrante
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#2e7d32', // Verde oscuro vibrante
                },
              },
            }}
          >
            <Tab label="Estado de Ganancias" value="profit_loss" icon={<AccountBalanceWalletIcon />} iconPosition="start" />
            <Tab label="KPIs Comerciales y Financieros" value="kpis" icon={<QueryStatsIcon />} iconPosition="start" />
            <Tab label="Reportes Financieros" value="financial_reports" icon={<DescriptionIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Filtros Globales (si aplica) - para futuras expansiones */}
        <Grid container spacing={3} sx={{mb: 4, display: 'flex', alignItems: 'center'}}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="period-select-label">Período de Análisis</InputLabel>
              <Select
                labelId="period-select-label"
                value={selectedPeriod}
                label="Período de Análisis"
                onChange={(e) => setSelectedPeriod(e.target.value)}
                startAdornment={<InputAdornment position="start"><CalendarTodayIcon sx={{color: '#9e9e9e'}}/></InputAdornment>}
              >
                {availablePeriods.map(period => (
                  <MenuItem key={period} value={period}>{financialData[period]?.period || period}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Alert severity="info" icon={<FilterListIcon />} sx={{ display: 'flex', alignItems: 'center' }}>
              Los datos mostrados corresponden al período: **{financialData[selectedPeriod]?.period || selectedPeriod}**
            </Alert>
          </Grid>
        </Grid>


        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Estado de Ganancias y Pérdidas */}
          {currentTab === 'profit_loss' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <AccountBalanceWalletIcon sx={{ color: '#2e7d32', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Estado de Ganancias y Pérdidas (P&L)
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('Datos del P&L actualizados', 'info')}>
                  Actualizar Datos
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="success" sx={{ mb: 3 }}>
                Este reporte resume los ingresos, costos y gastos de la empresa durante un período específico.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#e8f5e9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '60%' }}>Concepto</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, width: '20%' }}>Monto</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, width: '20%' }}>% sobre Ingresos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Ingresos */}
                    <TableRow sx={{ bgcolor: '#f0f4c3' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#558b2f' }}>Ingresos Totales</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#558b2f' }}>{formatCurrency(financialSummary.totalRevenue)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#558b2f' }}>{formatPercentage(1)}</TableCell>
                    </TableRow>
                    {/* Costo de Ventas */}
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>Costo de Bienes Vendidos (COGS)</TableCell>
                      <TableCell align="right">{formatCurrency(financialSummary.costOfGoodsSold)}</TableCell>
                      <TableCell align="right">{formatPercentage(financialSummary.costOfGoodsSold / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>
                    {/* Ganancia Bruta */}
                    <TableRow sx={{ bgcolor: '#e8f5e9' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#2e7d32' }}>Ganancia Bruta</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#2e7d32' }}>{formatCurrency(financialSummary.grossProfit)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#2e7d32' }}>{formatPercentage(financialSummary.grossProfit / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>

                    {/* Gastos Operativos */}
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, pt: 2, color: '#3f51b5' }}>Gastos Operativos</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {Object.entries(financialSummary.operatingExpenses).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ pl: 4 }}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</TableCell>
                        <TableCell align="right">{formatCurrency(value)}</TableCell>
                        <TableCell align="right">{formatPercentage(value / financialSummary.totalRevenue)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: '#f3e5f5' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#673ab7' }}>Total Gastos Operativos</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#673ab7' }}>{formatCurrency(financialSummary.totalOperatingExpenses)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#673ab7' }}>{formatPercentage(financialSummary.totalOperatingExpenses / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>

                    {/* Ingreso Operativo */}
                    <TableRow sx={{ bgcolor: '#e0f2f7' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#0288d1' }}>Ingreso Operativo</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#0288d1' }}>{formatCurrency(financialSummary.operatingIncome)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#0288d1' }}>{formatPercentage(financialSummary.operatingIncome / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>

                    {/* Otros Ingresos y Gastos */}
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>Otros Ingresos</TableCell>
                      <TableCell align="right">{formatCurrency(financialSummary.nonOperatingIncome)}</TableCell>
                      <TableCell align="right">{formatPercentage(financialSummary.nonOperatingIncome / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>Otros Gastos</TableCell>
                      <TableCell align="right">{formatCurrency(financialSummary.nonOperatingExpenses)}</TableCell>
                      <TableCell align="right">{formatPercentage(financialSummary.nonOperatingExpenses / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>

                    {/* Ganancia Antes de Impuestos */}
                    <TableRow sx={{ bgcolor: '#fff3e0' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#ef6c00' }}>Ganancia Antes de Impuestos</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#ef6c00' }}>{formatCurrency(financialSummary.earningsBeforeTax)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#ef6c00' }}>{formatPercentage(financialSummary.earningsBeforeTax / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>

                    {/* Gasto de Impuestos */}
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>Gasto de Impuestos</TableCell>
                      <TableCell align="right">{formatCurrency(financialSummary.incomeTaxExpense)}</TableCell>
                      <TableCell align="right">{formatPercentage(financialSummary.incomeTaxExpense / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>

                    {/* Ganancia Neta */}
                    <TableRow sx={{ bgcolor: '#c8e6c9' }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1b5e20' }}>Ganancia Neta</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1b5e20' }}>{formatCurrency(financialSummary.netIncome)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1b5e20' }}>{formatPercentage(financialSummary.netIncome / financialSummary.totalRevenue)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DummyBarChart title="Ingresos vs. Gastos Operativos" data={[]} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DummyPieChart title="Distribución de Gastos Operativos" data={[]} />
                </Grid>
              </Grid>

              <Alert severity="info" sx={{ mt: 3 }}>
                Este estado proporciona una visión clara de la rentabilidad operativa de su empresa.
              </Alert>
            </Paper>
          )}

          {/* Tab: KPIs Comerciales y Financieros */}
          {currentTab === 'kpis' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <QueryStatsIcon sx={{ color: '#2e7d32', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Key Performance Indicators (KPIs)
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => showSnackbar('KPIs actualizados', 'info')}>
                  Actualizar KPIs
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="warning" sx={{ mb: 3 }}>
                Monitorea estos indicadores clave para evaluar el desempeño y la salud financiera de tu negocio.
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #2196f3' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">KPI Comercial</Typography>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mt: 0.5 }}>
                        Tasa de Conversión de Ventas
                      </Typography>
                      {renderKpiStatus(currentKpiData.salesConversionRate, 0.11, 0.08, 'percentage')}
                      {getKpiTrend('salesConversionRate')}
                      <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                        Porcentaje de leads convertidos en clientes.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #2196f3' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">KPI Comercial</Typography>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mt: 0.5 }}>
                        Valor Promedio por Negocio (ADR)
                      </Typography>
                      {renderKpiStatus(currentKpiData.averageDealValue, 2400, 2000, 'currency')}
                      {getKpiTrend('averageDealValue')}
                      <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                        Monto promedio de cada venta cerrada.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #2196f3' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">KPI Comercial</Typography>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mt: 0.5 }}>
                        Costo de Adquisición de Clientes (CAC)
                      </Typography>
                      {renderKpiStatus(currentKpiData.customerAcquisitionCost, 300, 400, 'currency')} {/* Lower is better */}
                      {getKpiTrend('customerAcquisitionCost')}
                      <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                        Costo promedio para adquirir un nuevo cliente.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #2e7d32' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">KPI Financiero</Typography>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mt: 0.5 }}>
                        Margen de Ganancia Bruta
                      </Typography>
                      {renderKpiStatus(currentKpiData.grossProfitMargin, 0.58, 0.50, 'percentage')}
                      {getKpiTrend('grossProfitMargin')}
                      <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                        Porcentaje de ingresos que retiene la empresa después de incurrir en costos de bienes vendidos.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #2e7d32' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">KPI Financiero</Typography>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mt: 0.5 }}>
                        Margen de Ganancia Neta
                      </Typography>
                      {renderKpiStatus(currentKpiData.netProfitMargin, 0.25, 0.15, 'percentage')}
                      {getKpiTrend('netProfitMargin')}
                      <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                        Porcentaje de ingresos que queda después de que se deducen todos los gastos.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card elevation={2} sx={{ borderRadius: 2, borderLeft: '5px solid #2e7d32' }}>
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">KPI Financiero</Typography>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 600, mt: 0.5 }}>
                        Ciclo de Conversión de Efectivo
                      </Typography>
                      {renderKpiStatus(currentKpiData.cashConversionCycle, 40, 55, 'number')} {/* Lower is better */}
                      {getKpiTrend('cashConversionCycle')}
                      <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                        Días que le toma a la empresa convertir inversiones en inventario y cuentas por cobrar en efectivo.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{mt: 3}}>
                <Grid item xs={12} md={6}>
                  <DummyLineChart title="Tendencia de Margen de Ganancia Neta" data={[]} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DummyBarChart title="CAC vs. Valor Promedio por Negocio" data={[]} />
                </Grid>
              </Grid>

              <Alert severity="success" sx={{ mt: 3 }}>
                Utiliza estos KPIs para medir el progreso hacia tus objetivos estratégicos.
              </Alert>
            </Paper>
          )}

          {/* Tab: Reportes Financieros */}
          {currentTab === 'financial_reports' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
                <DescriptionIcon sx={{ color: '#2e7d32', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Generación y Gestión de Reportes Financieros
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => showSnackbar('Funcionalidad para generar nuevo reporte (simulado)', 'info')} sx={{ textTransform: 'none', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                  Generar Nuevo Reporte
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Accede a reportes financieros clave para un análisis profundo y cumplimiento.
              </Alert>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: '#e8f5e9' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Nombre del Reporte</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Período</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Fecha Generación</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Generado Por</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {financialReports.length > 0 ? (
                      financialReports.map((report) => (
                        <TableRow key={report.id} hover>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{report.name}</Typography>
                          </TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{report.period}</TableCell>
                          <TableCell>{report.dateGenerated}</TableCell>
                          <TableCell>{report.generatedBy}</TableCell>
                          <TableCell>
                            <Chip
                              label={report.status}
                              color={report.status === 'Finalizado' ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            {report.downloadUrl && (
                              <Tooltip title="Descargar Reporte">
                                <IconButton size="small" href={report.downloadUrl} target="_blank" disabled={report.status !== 'Finalizado'}>
                                  <DownloadIcon color={report.status === 'Finalizado' ? 'primary' : 'disabled'} />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Ver Detalles">
                              <IconButton size="small" onClick={() => showSnackbar(`Visualizando detalles del reporte ${report.id}`, 'info')}>
                                <VisibilityIcon color="action" />
                              </IconButton>
                            </Tooltip>
                            {report.status !== 'Finalizado' && (
                              <Tooltip title="Marcar como Finalizado">
                                <IconButton size="small" onClick={() => showSnackbar(`Reporte ${report.id} marcado como finalizado (simulado)`, 'success')}>
                                  <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay reportes financieros disponibles.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination count={Math.ceil(financialReports.length / 10)} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
              <Alert severity="success" sx={{ mt: 3 }}>
                Todos tus reportes financieros en un solo lugar, listos para descargar y analizar.
              </Alert>
            </Paper>
          )}
        </Box>
      </Container>

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

export default FinancialAnalysisPanel;