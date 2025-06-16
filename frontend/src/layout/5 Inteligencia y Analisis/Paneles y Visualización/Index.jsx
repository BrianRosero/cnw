import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  List, ListItem, ListItemText, ListItemIcon,
  Card, CardContent, CardHeader, LinearProgress, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, ToggleButton, ToggleButtonGroup,
  // Para gráficos (simulados, se integrarían con librerías como Chart.js o Recharts)
  // Recharts: BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Icono principal de Paneles
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // Análisis de Clientes
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // KPIs Estratégicos
import TrendingDownIcon from '@mui/icons-material/TrendingDown' // KPIs Estratégicos
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'; // KPIs Estratégicos
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Financieros
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; // Operativos
import CodeIcon from '@mui/icons-material/Code'; // Técnicos
import InsightsIcon from '@mui/icons-material/Insights'; // IA Empresarial / Insights
import SmartToyIcon from '@mui/icons-material/SmartToy'; // IA Interna / Consultas
import AnalyticsIcon from '@mui/icons-material/Analytics'; // General Analytics
import InfoIcon from '@mui/icons-material/Info'; // Información
import WarningIcon from '@mui/icons-material/Warning'; // Alerta
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito
import RefreshIcon from '@mui/icons-material/Refresh'; // Actualizar
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Ayuda / Consulta
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Oportunidad
import DiagnosisIcon from '@mui/icons-material/Psychology'; // Diagnóstico (simulado)

// --- Datos Simulados de Paneles ---

// Datos para Análisis de Clientes
const customerAnalyticsData = {
  totalCustomers: 75000,
  newCustomersLastMonth: 1200,
  churnRate: '2.5%', // Tasa de abandono
  customerSegments: [
    { name: 'Empresas Grandes', count: 15000, revenueShare: '60%' },
    { name: 'PyMEs', count: 40000, revenueShare: '30%' },
    { name: 'Freelancers', count: 20000, revenueShare: '10%' },
  ],
  top5Customers: [
    { name: 'Tech Solutions Inc.', revenue: '$1.2M', growth: '+15%' },
    { name: 'Global Innovations', revenue: '$980K', growth: '+10%' },
    { name: 'Alpha Corp.', revenue: '$750K', growth: '-5%' },
    { name: 'Blue Sky Services', revenue: '$600K', growth: '+20%' },
    { name: 'Dynamic Ventures', revenue: '$550K', growth: '+8%' },
  ],
};

// Datos para KPIs Estratégicos
const kpiData = {
  financial: [
    { name: 'Ingresos Netos (MTD)', value: '$5.2M', target: '$5.0M', status: 'success', trend: 'up' },
    { name: 'Margen de Beneficio Bruto', value: '45%', target: '42%', status: 'success', trend: 'up' },
    { name: 'Costo de Adquisición de Cliente (CAC)', value: '$150', target: '$130', status: 'warning', trend: 'up' },
    { name: 'Flujo de Caja Operativo', value: '$1.8M', target: '$1.5M', status: 'success', trend: 'up' },
  ],
  technical: [
    { name: 'Uptime del Servicio (Últimos 30 días)', value: '99.98%', target: '99.9%', status: 'success', trend: 'up' },
    { name: 'Tiempo Promedio de Recuperación (MTTR)', value: '1.5 hrs', target: '2 hrs', status: 'success', trend: 'down' },
    { name: 'Incidentes Críticos Abiertos', value: 2, target: 0, status: 'error', trend: 'up' },
    { name: 'Cobertura de Pruebas Automatizadas', value: '85%', target: '90%', status: 'warning', trend: 'up' },
  ],
  operational: [
    { name: 'Pedidos Procesados (Diario)', value: 850, target: 800, status: 'success', trend: 'up' },
    { name: 'Tiempo de Ciclo de Producción', value: '4 días', target: '3 días', status: 'warning', trend: 'up' },
    { name: 'Tasa de Defectos', value: '0.5%', target: '0.2%', status: 'error', trend: 'up' },
    { name: 'Satisfacción del Empleado (eNPS)', value: '70', target: '75', status: 'warning', trend: 'down' },
  ],
};

// Datos para Gestión de IA Empresarial
const aiInsightsData = {
  lastRefresh: '2025-06-11 21:00',
  insights: [
    {
      id: 'AI-001',
      type: 'Diagnóstico',
      title: 'Incremento en Tasa de Abandono de Clientes PyME en Región X',
      description: 'El modelo de IA detectó un aumento del 15% en el _churn_ de clientes PyME en la región Norte en el último trimestre, en comparación con el promedio histórico.',
      priority: 'Alta',
      status: 'Activo',
      generatedDate: '2025-06-10',
      suggestedAction: 'Investigar la calidad del soporte y la satisfacción con el producto en la Región X. Considerar campañas de retención personalizadas.',
      relatedData: ['Datos de soporte', 'Encuestas de satisfacción', 'Historial de ventas'],
    },
    {
      id: 'AI-002',
      type: 'Oportunidad',
      title: 'Potencial de Venta Cruzada de Producto B a Clientes A',
      description: 'La IA identificó que clientes que compraron el "Producto A" tienen una alta propensión a adquirir el "Producto B" si se les ofrece un descuento inicial.',
      priority: 'Media',
      status: 'Activo',
      generatedDate: '2025-06-08',
      suggestedAction: 'Lanzar una campaña de marketing dirigida a clientes actuales de Producto A con una oferta especial para Producto B. Monitorear tasa de conversión.',
      relatedData: ['Historial de compras', 'Demografía de clientes', 'Comportamiento de uso'],
    },
    {
      id: 'AI-003',
      type: 'Diagnóstico',
      title: 'Desviación en el Proceso de Onboarding de Nuevos Empleados (Paso 3)',
      description: 'El sistema de IA detectó que el 20% de los nuevos empleados experimentan retrasos en la activación de accesos a sistemas (Paso 3 del Onboarding WF-001).',
      priority: 'Baja',
      status: 'Revisado',
      generatedDate: '2025-06-05',
      suggestedAction: 'Revisar la configuración automatizada del paso 3 del workflow de onboarding. Alertar al equipo de TI para investigación.',
      relatedData: ['Datos de workflow', 'Tickets de soporte'],
    },
  ],
};

// Datos para IA Interna (Consultas Automáticas)
const internalAIData = {
  lastQueries: [
    { id: 1, user: 'Usuario A', query: '¿Cuál fue el crecimiento de ingresos en el Q1 2025?', response: 'El crecimiento de ingresos en el Q1 2025 fue del 8.5% interanual.', timestamp: '2025-06-11 14:00' },
    { id: 2, user: 'Usuario B', query: 'Muéstrame la lista de tickets de soporte abiertos con prioridad alta.', response: 'Hay 3 tickets de soporte abiertos con prioridad alta: HD-001 (Error CRM), HD-004 (VPN), HD-00X (Red no disponible).', timestamp: '2025-06-11 10:30' },
    { id: 3, user: 'Usuario C', query: '¿Cuántos workflows están activos actualmente?', response: 'Actualmente hay 2 workflows activos: "Proceso de Onboarding de Nuevo Empleado" y "Aprobación de Solicitud de Vacaciones".', timestamp: '2025-06-10 16:00' },
  ],
  faqExamples: [
    '¿Cuál es el margen de beneficio actual?',
    '¿Cuántos clientes nuevos tuvimos el mes pasado?',
    '¿Cuál es el uptime de nuestros servicios?',
    '¿Muéstrame las tareas pendientes de mi equipo?',
  ],
};

function DashboardsAnalytics({ onGoToHome }) {
  const [currentSection, setCurrentSection] = useState('overview'); // 'overview', 'customers', 'kpis', 'ai_enterprise', 'ai_internal'
  const [openInsightDialog, setOpenInsightDialog] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [internalAIQuery, setInternalAIQuery] = useState('');
  const [internalAIResponse, setInternalAIResponse] = useState('');

  const handleOpenInsightDialog = (insight) => {
    setSelectedInsight(insight);
    setOpenInsightDialog(true);
  };

  const handleCloseInsightDialog = () => {
    setOpenInsightDialog(false);
    setSelectedInsight(null);
  };

  const handleInternalAIQuery = () => {
    if (internalAIQuery.trim()) {
      // Simular respuesta de la IA
      let response = "Lo siento, no pude encontrar una respuesta específica para tu consulta. Por favor, intenta reformularla o contacta a soporte si es un tema crítico.";
      if (internalAIQuery.toLowerCase().includes('ingresos')) {
        response = "Los ingresos netos del mes hasta la fecha son de $5.2 Millones.";
      } else if (internalAIQuery.toLowerCase().includes('clientes nuevos')) {
        response = `El mes pasado tuvimos ${customerAnalyticsData.newCustomersLastMonth} clientes nuevos.`;
      } else if (internalAIQuery.toLowerCase().includes('uptime')) {
        response = `El uptime de nuestros servicios en los últimos 30 días es del ${kpiData.technical[0].value}.`;
      } else if (internalAIQuery.toLowerCase().includes('tickets abiertos')) {
        response = `Actualmente hay 3 tickets de soporte abiertos de alta prioridad. Puedes ver más detalles en el módulo de Helpdesk.`;
      } else if (internalAIQuery.toLowerCase().includes('workflows activos')) {
        response = `Hay 2 workflows activos: "Proceso de Onboarding de Nuevo Empleado" y "Aprobación de Solicitud de Vacaciones".`;
      }

      setInternalAIResponse(response);
      // Agregar a las consultas recientes (simulado)
      internalAIData.lastQueries.unshift({
        id: internalAIData.lastQueries.length + 1,
        user: 'Usuario Actual',
        query: internalAIQuery,
        response: response,
        timestamp: new Date().toLocaleString('es-CO'),
      });
      setInternalAIQuery(''); // Clear input
    }
  };


  const getKpiStatusColor = (status) => {
    switch (status) {
      case 'success': return '#4caf50';
      case 'warning': return '#ff9800';
      case 'error': return '#f44336';
      default: return '#757575';
    }
  };

  const getKpiTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon fontSize="small" sx={{ color: '#4caf50' }} />;
      case 'down': return <TrendingDownIcon fontSize="small" sx={{ color: '#f44336' }} />; // Assuming TrendingDownIcon
      case 'stable': return <HorizontalRuleIcon fontSize="small" sx={{ color: '#757575' }} />; // Assuming HorizontalRuleIcon
      default: return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <DashboardIcon sx={{ fontSize: 36, mr: 1, color: '#004a8f' }} /> {/* Azul para Paneles */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#004a8f' }}>
            Paneles y Visualización
          </Typography>
          <ToggleButtonGroup
            value={currentSection}
            exclusive
            onChange={(event, newSection) => setCurrentSection(newSection)}
            aria-label="section selector"
            size="small"
            sx={{ bgcolor: '#eee', borderRadius: 1 }}
          >
            <ToggleButton value="overview" aria-label="overview">
              <DashboardIcon sx={{ mr: 0.5 }} /> Resumen
            </ToggleButton>
            <ToggleButton value="customers" aria-label="customer analytics">
              <PeopleAltIcon sx={{ mr: 0.5 }} /> Clientes
            </ToggleButton>
            <ToggleButton value="kpis" aria-label="strategic kpis">
              <TrendingUpIcon sx={{ mr: 0.5 }} /> KPIs
            </ToggleButton>
            <ToggleButton value="ai_enterprise" aria-label="enterprise ai insights">
              <InsightsIcon sx={{ mr: 0.5 }} /> IA Empresarial
            </ToggleButton>
            <ToggleButton value="ai_internal" aria-label="internal ai queries">
              <SmartToyIcon sx={{ mr: 0.5 }} /> IA Interna
            </ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            {currentSection === 'overview' && "Panel de Control Centralizado"}
            {currentSection === 'customers' && "Análisis Profundo de Clientes"}
            {currentSection === 'kpis' && "Indicadores Clave de Rendimiento (KPIs)"}
            {currentSection === 'ai_enterprise' && "Inteligencia Artificial para Insights Empresariales"}
            {currentSection === 'ai_internal' && "Asistente de IA para Consultas Internas"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {currentSection === 'overview' && "Información en tiempo real para decisiones estratégicas en todas las áreas."}
            {currentSection === 'customers' && "Comprende el comportamiento, segmentos y valor de tus clientes."}
            {currentSection === 'kpis' && "Monitorea el desempeño financiero, técnico y operativo de tu negocio."}
            {currentSection === 'ai_enterprise' && "Descubre diagnósticos y oportunidades generados automáticamente por la IA."}
            {currentSection === 'ai_internal' && "Obtén respuestas automáticas a tus preguntas internas con nuestro asistente de IA."}
          </Typography>
        </Box>

        {/* Sección de Resumen General (Overview) */}
        {currentSection === 'overview' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={4} sx={{ bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <CardHeader
                  avatar={<PeopleAltIcon sx={{ color: '#004a8f', fontSize: 30 }} />}
                  title={<Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>Resumen de Clientes</Typography>}
                  action={<IconButton><RefreshIcon /></IconButton>}
                />
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#004a8f', mb: 1 }}>{customerAnalyticsData.totalCustomers.toLocaleString()} <span style={{ fontSize: '0.6em', color: '#616161' }}>Clientes Totales</span></Typography>
                  <Typography variant="body1" color="#616161">Nuevos Clientes (últ. mes): **{customerAnalyticsData.newCustomersLastMonth}**</Typography>
                  <Typography variant="body1" color="#616161">Tasa de Abandono: **{customerAnalyticsData.churnRate}**</Typography>
                  <Button variant="text" size="small" sx={{ mt: 2, textTransform: 'none' }} onClick={() => setCurrentSection('customers')}>Ver Análisis Completo</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={4} sx={{ bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <CardHeader
                  avatar={<AttachMoneyIcon sx={{ color: '#4caf50', fontSize: 30 }} />}
                  title={<Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>KPIs Financieros Clave</Typography>}
                  action={<IconButton><RefreshIcon /></IconButton>}
                />
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#4caf50', mb: 1 }}>{kpiData.financial[0].value} <span style={{ fontSize: '0.6em', color: '#616161' }}>Ingresos Netos MTD</span></Typography>
                  <Typography variant="body1" color="#616161">Margen Bruto: **{kpiData.financial[1].value}**</Typography>
                  <Typography variant="body1" color="#616161">CAC: **{kpiData.financial[2].value}** {getKpiTrendIcon(kpiData.financial[2].trend)}</Typography>
                  <Button variant="text" size="small" sx={{ mt: 2, textTransform: 'none' }} onClick={() => setCurrentSection('kpis')}>Ver Todos los KPIs</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card elevation={4} sx={{ bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <CardHeader
                  avatar={<InsightsIcon sx={{ color: '#9c27b0', fontSize: 30 }} />}
                  title={<Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>Insights de IA Recientes</Typography>}
                  action={<IconButton><RefreshIcon /></IconButton>}
                />
                <CardContent>
                  <Typography variant="body1" color="#616161" sx={{ mb: 1 }}>
                    Último Diagnóstico: **"{aiInsightsData.insights[0].title}"**
                  </Typography>
                  <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                    Última Oportunidad: **"{aiInsightsData.insights[1].title}"**
                  </Typography>
                  <Button variant="text" size="small" sx={{ textTransform: 'none' }} onClick={() => setCurrentSection('ai_enterprise')}>Explorar Insights de IA</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={4} sx={{ p: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <AnalyticsIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Resumen de Datos Clave
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" color="#333" sx={{ mb: 1 }}>Ventas</Typography>
                    <List dense>
                      <ListItem><ListItemText primary="Ventas Totales (Año)" secondary="$18.5M" /></ListItem>
                      <ListItem><ListItemText primary="Tasa de Conversión Web" secondary="3.2%" /></ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" color="#333" sx={{ mb: 1 }}>Operaciones</Typography>
                    <List dense>
                      <ListItem><ListItemText primary="Tickets de Soporte Cerrados (MTD)" secondary="450" /></ListItem>
                      <ListItem><ListItemText primary="Proyectos Activos" secondary="12" /></ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" color="#333" sx={{ mb: 1 }}>Recursos Humanos</Typography>
                    <List dense>
                      <ListItem><ListItemText primary="Empleados Activos" secondary="250" /></ListItem>
                      <ListItem><ListItemText primary="Tasa de Rotación Anual" secondary="10%" /></ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Sección: Análisis de Clientes */}
        {currentSection === 'customers' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PeopleAltIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Análisis de Clientes
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                Actualizar Datos
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', border: '1px solid #bbdefb' }}>
                  <Typography variant="h4" color="#1976d2">{customerAnalyticsData.totalCustomers.toLocaleString()}</Typography>
                  <Typography variant="subtitle1" color="#333">Total de Clientes</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9', border: '1px solid #a5d6a7' }}>
                  <Typography variant="h4" color="#2e7d32">{customerAnalyticsData.newCustomersLastMonth}</Typography>
                  <Typography variant="subtitle1" color="#333">Nuevos Clientes (Último Mes)</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#ffe0b2', border: '1px solid #ffcc80' }}>
                  <Typography variant="h4" color="#ef6c00">{customerAnalyticsData.churnRate}</Typography>
                  <Typography variant="subtitle1" color="#333">Tasa de Abandono (Anualizada)</Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                    Segmentación de Clientes
                  </Typography>
                  {/* Aquí iría un gráfico de pastel o barras simulado */}
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#eceff1', borderRadius: 1 }}>
                    <Typography color="#616161">Gráfico de Segmentos (Ej: Pastel)</Typography>
                  </Box>
                  <List dense>
                    {customerAnalyticsData.customerSegments.map((segment, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`${segment.name}: ${segment.count.toLocaleString()} clientes`} secondary={`Aporta el ${segment.revenueShare} de los ingresos.`} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                    Top 5 Clientes por Ingresos
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: '#e0e0e0' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Ingresos</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Crecimiento</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customerAnalyticsData.top5Customers.map((customer, index) => (
                          <TableRow key={index}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.revenue}</TableCell>
                            <TableCell sx={{ color: customer.growth.includes('+') ? 'green' : 'red' }}>{customer.growth}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Sección: KPIs Estratégicos */}
        {currentSection === 'kpis' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <TrendingUpIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Indicadores Clave de Rendimiento (KPIs)
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                Actualizar KPIs
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Grid container spacing={3}>
              {/* KPIs Financieros */}
              <Grid item xs={12} md={6} lg={4}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #4caf50', bgcolor: '#e8f5e9' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AttachMoneyIcon sx={{ color: '#2e7d32', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                      KPIs Financieros
                    </Typography>
                  </Box>
                  <List dense>
                    {kpiData.financial.map((kpi, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={kpi.name}
                          secondary={
                            <Typography component="span" sx={{ color: getKpiStatusColor(kpi.status), fontWeight: 600 }}>
                              {kpi.value}
                            </Typography>
                          }
                        />
                        <Chip
                          label={`Target: ${kpi.target}`}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                        {getKpiTrendIcon(kpi.trend)}
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              {/* KPIs Técnicos */}
              <Grid item xs={12} md={6} lg={4}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #2196f3', bgcolor: '#e3f2fd' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CodeIcon sx={{ color: '#004a8f', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                      KPIs Técnicos
                    </Typography>
                  </Box>
                  <List dense>
                    {kpiData.technical.map((kpi, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={kpi.name}
                          secondary={
                            <Typography component="span" sx={{ color: getKpiStatusColor(kpi.status), fontWeight: 600 }}>
                              {kpi.value}
                            </Typography>
                          }
                        />
                        <Chip
                          label={`Target: ${kpi.target}`}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                        {getKpiTrendIcon(kpi.trend)}
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>

              {/* KPIs Operativos */}
              <Grid item xs={12} md={6} lg={4}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #ff9800', bgcolor: '#fff3e0' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <PrecisionManufacturingIcon sx={{ color: '#ef6c00', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                      KPIs Operativos
                    </Typography>
                  </Box>
                  <List dense>
                    {kpiData.operational.map((kpi, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={kpi.name}
                          secondary={
                            <Typography component="span" sx={{ color: getKpiStatusColor(kpi.status), fontWeight: 600 }}>
                              {kpi.value}
                            </Typography>
                          }
                        />
                        <Chip
                          label={`Target: ${kpi.target}`}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                        {getKpiTrendIcon(kpi.trend)}
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Grid>

            {/* Aquí podrían ir gráficos de tendencias para cada KPI */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                Tendencias de KPIs (Ejemplos de Gráficos)
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: '#fafafa', border: '1px solid #e0e0e0', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="#616161">Gráfico de Líneas: Ingresos Netos vs. Tiempo</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: '#fafafa', border: '1px solid #e0e0e0', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="#616161">Gráfico de Barras: Incidentes Críticos por Mes</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        )}

        {/* Sección: Panel de Gestión de IA Empresarial */}
        {currentSection === 'ai_enterprise' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <InsightsIcon sx={{ color: '#9c27b0', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Insights y Diagnósticos con IA
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                Actualizar Insights
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Typography variant="subtitle1" color="#616161" sx={{ mb: 3 }}>
              Última actualización de Insights: {aiInsightsData.lastRefresh}
            </Typography>

            <Grid container spacing={3}>
              {aiInsightsData.insights.map((insight) => (
                <Grid item xs={12} md={6} key={insight.id}>
                  <Card elevation={2} sx={{ p: 2, borderLeft: `5px solid ${insight.type === 'Diagnóstico' ? '#f44336' : '#4caf50'}` }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      {insight.type === 'Diagnóstico' ? (
                        <WarningIcon sx={{ color: '#f44336', mr: 1 }} />
                      ) : (
                        <LightbulbIcon sx={{ color: '#4caf50', mr: 1 }} />
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                        {insight.title}
                      </Typography>
                      <Chip label={insight.type} size="small" color={insight.type === 'Diagnóstico' ? 'error' : 'success'} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Generado el: {insight.generatedDate} | Prioridad: {insight.priority}
                    </Typography>
                    <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                      {insight.description}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<InfoIcon />}
                      onClick={() => handleOpenInsightDialog(insight)}
                      sx={{ textTransform: 'none', bgcolor: '#004a8f', '&:hover': { bgcolor: '#004a8f' } }}
                    >
                      Ver Detalle y Acción Sugerida
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Sección: Panel de IA Interna (Consultas Automáticas) */}
        {currentSection === 'ai_internal' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <SmartToyIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Asistente de IA HORUS para Consultas Internas
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Typography variant="subtitle1" color="#616161" sx={{ mb: 2 }}>
              Haz preguntas sobre datos internos, KPIs, tickets, workflows, etc.
            </Typography>

            <Box display="flex" gap={2} mb={3}>
              <TextField
                fullWidth
                label="Escribe tu consulta aquí..."
                variant="outlined"
                value={internalAIQuery}
                onChange={(e) => setInternalAIQuery(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleInternalAIQuery(); }}
              />
              <Button variant="contained" startIcon={<SearchIcon />} sx={{ textTransform: 'none', bgcolor: '#004a8f', '&:hover': { bgcolor: '#004a8f' } }} onClick={handleInternalAIQuery}>
                Preguntar
              </Button>
            </Box>

            {internalAIResponse && (
              <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: '#e3f2fd', border: '1px solid #90caf9' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#004a8f' }}>Respuesta de la IA:</Typography>
                <Typography variant="body1" color="#333">{internalAIResponse}</Typography>
              </Paper>
            )}

            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
              Consultas Recientes
            </Typography>
            <List dense sx={{ maxHeight: 250, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
              {internalAIData.lastQueries.map((q) => (
                <ListItem key={q.id} sx={{ mb: 1, borderBottom: '1px solid #eee' }}>
                  <ListItemIcon><Avatar sx={{ width: 24, height: 24, bgcolor: '#bdbdbd', fontSize: '0.8rem' }}><HelpOutlineIcon fontSize="small" /></Avatar></ListItemIcon>
                  <ListItemText
                    primary={<><b>{q.user}:</b> "{q.query}"</>}
                    secondary={<>Respuesta: "{q.response}" <Typography component="span" variant="caption" color="text.secondary">({q.timestamp})</Typography></>}
                    primaryTypographyProps={{ color: '#333' }}
                    secondaryTypographyProps={{ color: '#616161' }}
                  />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mt: 3, mb: 1 }}>
              Ejemplos de Preguntas:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {internalAIData.faqExamples.map((example, index) => (
                <Chip key={index} label={example} onClick={() => setInternalAIQuery(example)} clickable variant="outlined" color="primary" icon={<SearchIcon fontSize="small" />} />
              ))}
            </Box>
          </Paper>
        )}
      </Container>

      {/* Dialog para Detalles de Insight de IA */}
      {selectedInsight && (
        <Dialog open={openInsightDialog} onClose={handleCloseInsightDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333', borderBottom: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center">
              {selectedInsight.type === 'Diagnóstico' ? <WarningIcon sx={{ color: '#f44336', mr: 1 }} /> : <LightbulbIcon sx={{ color: '#4caf50', mr: 1 }} />}
              {selectedInsight.title}
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              ID: {selectedInsight.id} | Generado el: {selectedInsight.generatedDate} | Prioridad: {selectedInsight.priority}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" color="#333" sx={{ mb: 2 }}>
              **Descripción:** {selectedInsight.description}
            </Typography>
            <Typography variant="body1" color="#333" sx={{ mb: 2 }}>
              **Acción Sugerida:** {selectedInsight.suggestedAction}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Datos Relacionados: {selectedInsight.relatedData.join(', ')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInsightDialog} color="secondary">Cerrar</Button>
            <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
              Marcar como Leído
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default DashboardsAnalytics;