import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  List, ListItem, ListItemText, ListItemIcon,
  FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, FormControlLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
  LinearProgress, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment'; // Icono principal de Análisis y Reportes
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Rentabilidad
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Rentabilidad por cliente/servicio/proyecto
import DescriptionIcon from '@mui/icons-material/Description'; // Generación de reportes
import FilterListIcon from '@mui/icons-material/FilterList'; // Filtros avanzados
import DownloadIcon from '@mui/icons-material/Download'; // Exportación
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'; // Reportes personalizados
import InsightsIcon from '@mui/icons-material/Insights'; // IA
import RefreshIcon from '@mui/icons-material/Refresh'; // Actualizar
import SearchIcon from '@mui/icons-material/Search'; // Buscar/Aplicar filtros
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // IA generativa
import StarIcon from '@mui/icons-material/Star';
import { Card } from 'antd';
import WarningIcon from '@mui/icons-material/Warning';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Destacado / Favorito

// --- Datos Simulados de Análisis y Reportes ---

const profitabilityData = {
  byCustomer: [
    { id: 'CUST-001', name: 'Global Innovations', revenue: 1500000, costs: 800000, profit: 700000, margin: '46.7%', projects: 5 },
    { id: 'CUST-002', name: 'Tech Solutions', revenue: 900000, costs: 500000, profit: 400000, margin: '44.4%', projects: 3 },
    { id: 'CUST-003', name: 'Future Systems', revenue: 600000, costs: 450000, profit: 150000, margin: '25.0%', projects: 2 },
    { id: 'CUST-004', name: 'Dynamic Corp', revenue: 300000, costs: 280000, profit: 20000, margin: '6.7%', projects: 1 },
  ],
  byService: [
    { id: 'SERV-001', name: 'Desarrollo de Software', revenue: 1800000, costs: 1000000, profit: 800000, margin: '44.4%', customers: 10 },
    { id: 'SERV-002', name: 'Consultoría TI', revenue: 1200000, costs: 800000, profit: 400000, margin: '33.3%', customers: 8 },
    { id: 'SERV-003', name: 'Soporte Técnico', revenue: 700000, costs: 600000, profit: 100000, margin: '14.3%', customers: 15 },
  ],
  byProject: [
    { id: 'PROJ-001', name: 'ERP Implementation', customer: 'Global Innovations', startDate: '2024-01-15', endDate: '2025-03-30', budget: 750000, actualCost: 700000, profit: 50000, margin: '6.7%', status: 'Completado' },
    { id: 'PROJ-002', name: 'Mobile App Dev', customer: 'Tech Solutions', startDate: '2024-07-01', endDate: '2025-12-31', budget: 400000, actualCost: 280000, profit: 120000, margin: '30.0%', status: 'En Progreso' },
    { id: 'PROJ-003', name: 'Cloud Migration', customer: 'Future Systems', startDate: '2025-02-10', endDate: '2025-08-15', budget: 300000, actualCost: 150000, profit: 150000, margin: '50.0%', status: 'En Progreso' },
  ],
  aiInsights: [
    { id: 'IA-P-001', type: 'Rentabilidad', title: 'Identificación de Clientes de Baja Rentabilidad', description: 'La IA ha detectado que el cliente "Dynamic Corp" muestra un margen de beneficio significativamente bajo (6.7%). Se sugiere analizar las causas raíz (costos ocultos, descuentos excesivos) y evaluar la estrategia comercial.', recommendedAction: 'Revisar términos contractuales con Dynamic Corp y optimizar la asignación de recursos. Considerar renegociación o ajuste de servicios.', relevance: 'Alta' },
    { id: 'IA-P-002', type: 'Servicio', title: 'Oportunidad de Optimización en Soporte Técnico', description: 'El servicio de "Soporte Técnico" tiene el margen más bajo (14.3%) entre los servicios. La IA sugiere que hay ineficiencias en la gestión de tickets o recursos. Considerar automatización o capacitación.', recommendedAction: 'Implementar herramientas de automatización de soporte (chatbots para FAQs) y realizar auditoría de procesos de soporte para identificar cuellos de botella.', relevance: 'Media' },
    { id: 'IA-P-003', type: 'Proyecto', title: 'Alta Rentabilidad en Proyecto "Cloud Migration"', description: 'El proyecto "Cloud Migration" está superando las expectativas con un margen del 50%. La IA recomienda documentar las prácticas exitosas y replicarlas en futuros proyectos similares.', recommendedAction: 'Crear un manual de mejores prácticas basado en la ejecución del proyecto "Cloud Migration" y capacitar a los equipos de proyectos.', relevance: 'Baja' },
  ]
};

const predefinedReports = [
  { id: 'REP-001', name: 'Reporte de Ventas Mensuales', module: 'Ventas', description: 'Resumen detallado de las ventas por producto y región.', fields: ['Fecha', 'Producto', 'Cantidad', 'Precio', 'Región'], defaultFilters: { timeFrame: 'Último Mes' }, format: 'CSV', favorite: true },
  { id: 'REP-002', name: 'Análisis de Flujo de Caja', module: 'Finanzas', description: 'Proyección y análisis del flujo de caja operativo.', fields: ['Fecha', 'Entradas', 'Salidas', 'Balance'], defaultFilters: { timeFrame: 'Próximos 3 Meses' }, format: 'PDF', favorite: false },
  { id: 'REP-003', name: 'Reporte de Rendimiento de Empleados', module: 'RRHH', description: 'Métricas clave de rendimiento por empleado y departamento.', fields: ['Empleado', 'Departamento', 'Horas Trabajadas', 'Productividad'], defaultFilters: { timeFrame: 'Último Trimestre' }, format: 'Excel', favorite: true },
  { id: 'REP-004', name: 'Estado de Proyectos Activos', module: 'Proyectos', description: 'Visibilidad del progreso y presupuesto de proyectos en curso.', fields: ['Proyecto', 'Cliente', 'Presupuesto', 'Gasto Actual', 'Progreso (%)', 'Fecha Fin Prevista'], defaultFilters: { status: 'En Progreso' }, format: 'PDF', favorite: false },
];

const availableModules = ['Ventas', 'Finanzas', 'RRHH', 'Proyectos', 'Clientes', 'Operaciones'];
const availableExportFormats = ['PDF', 'Excel', 'CSV', 'JSON'];


function AnalyticsReports({ onGoToHome }) {
  const [currentSection, setCurrentSection] = useState('profitability'); // 'profitability', 'report_generation', 'custom_reports'
  const [reportFilters, setReportFilters] = useState({
    module: '',
    timeFrame: '',
    status: '',
    customRange: { start: '', end: '' }
  });
  const [openGenerateReportDialog, setOpenGenerateReportDialog] = useState(false);
  const [selectedReportToGenerate, setSelectedReportToGenerate] = useState(null);
  const [customReportData, setCustomReportData] = useState({
    name: '',
    description: '',
    module: '',
    fields: [],
    filters: {},
    exportFormat: 'PDF'
  });
  const [selectedFieldsForCustomReport, setSelectedFieldsForCustomReport] = useState([]);
  const [currentCustomReportModuleFields, setCurrentCustomReportModuleFields] = useState([]); // Dynamic fields based on selected module

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setReportFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateReportClick = (report) => {
    setSelectedReportToGenerate(report);
    setOpenGenerateReportDialog(true);
  };

  const handleCloseGenerateReportDialog = () => {
    setOpenGenerateReportDialog(false);
    setSelectedReportToGenerate(null);
  };

  const simulateReportGeneration = () => {
    // Simulate API call for report generation
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, message: `Reporte "${selectedReportToGenerate.name}" generado y exportado como ${selectedReportToGenerate.format}.` });
      }, 1500); // Simulate network delay
    });
  };

  const handleConfirmReportGeneration = async () => {
    alert(`Generando reporte: ${selectedReportToGenerate.name} con filtros actuales...`);
    const result = await simulateReportGeneration();
    if (result.success) {
      alert(result.message);
      handleCloseGenerateReportDialog();
    } else {
      alert("Error al generar el reporte.");
    }
  };

  const handleCustomReportChange = (e) => {
    const { name, value } = e.target;
    setCustomReportData(prev => ({ ...prev, [name]: value }));

    if (name === 'module') {
      // Simulate fetching fields based on selected module
      let fields = [];
      switch(value) {
        case 'Ventas': fields = ['ID Venta', 'Fecha Venta', 'Producto', 'Cantidad', 'Precio Unitario', 'Total Venta', 'Cliente', 'Región']; break;
        case 'Finanzas': fields = ['ID Transacción', 'Fecha', 'Tipo', 'Monto', 'Cuenta', 'Descripción']; break;
        case 'Clientes': fields = ['ID Cliente', 'Nombre Cliente', 'Correo', 'Teléfono', 'Tipo Cliente', 'Fecha Registro']; break;
        case 'Proyectos': fields = ['ID Proyecto', 'Nombre Proyecto', 'Cliente', 'Presupuesto', 'Gasto Actual', 'Progreso', 'Fecha Inicio', 'Fecha Fin']; break;
        case 'RRHH': fields = ['ID Empleado', 'Nombre Empleado', 'Puesto', 'Departamento', 'Salario', 'Fecha Contratación']; break;
        case 'Operaciones': fields = ['ID Operación', 'Tipo Operación', 'Fecha', 'Responsable', 'Estado']; break;
        default: fields = [];
      }
      setCurrentCustomReportModuleFields(fields);
      setSelectedFieldsForCustomReport([]); // Reset selected fields
    }
  };

  const handleFieldSelectionForCustomReport = (field) => {
    setSelectedFieldsForCustomReport(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleSaveCustomReport = () => {
    if (!customReportData.name || !customReportData.module || selectedFieldsForCustomReport.length === 0) {
      alert('Por favor, completa el nombre, el módulo y selecciona al menos un campo para el reporte personalizado.');
      return;
    }
    const newCustomReport = {
      id: `CUST-REP-${(predefinedReports.length + 1).toString().padStart(3, '0')}`,
      name: customReportData.name,
      description: customReportData.description || 'Reporte personalizado generado por el usuario.',
      module: customReportData.module,
      fields: selectedFieldsForCustomReport,
      defaultFilters: customReportData.filters,
      format: customReportData.exportFormat,
      favorite: false, // Default to not favorite
      isCustom: true // Mark as custom
    };
    predefinedReports.unshift(newCustomReport); // Add to the beginning
    alert(`Reporte personalizado "${newCustomReport.name}" creado con éxito.`);
    // Reset custom report form
    setCustomReportData({ name: '', description: '', module: '', fields: [], filters: {}, exportFormat: 'PDF' });
    setSelectedFieldsForCustomReport([]);
    setCurrentCustomReportModuleFields([]);
    setCurrentSection('report_generation'); // Go back to report generation list
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <AssessmentIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} /> {/* Azul para Análisis y Reportes */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Análisis y Reportes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlaylistAddCheckIcon />}
            sx={{ textTransform: 'none', mr: 2 }}
            onClick={() => setCurrentSection('custom_reports')}
          >
            Crear Reporte Personalizado
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none' }}
          >
            Actualizar Datos
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            {currentSection === 'profitability' && "Rentabilidad: Descubre tus Verdaderas Ganancias"}
            {currentSection === 'report_generation' && "Generación de Reportes Intuitiva"}
            {currentSection === 'custom_reports' && "Crea tus Propios Reportes a Medida"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {currentSection === 'profitability' && "Analiza la rentabilidad por cliente, servicio y proyecto, e identifica áreas de mejora con IA."}
            {currentSection === 'report_generation' && "Accede a reportes predefinidos, aplica filtros avanzados y exporta la información clave."}
            {currentSection === 'custom_reports' && "Define los datos y criterios que necesitas para reportes únicos adaptados a tus requerimientos."}
          </Typography>
        </Box>

        {/* Sección de Navegación Principal */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={currentSection === 'profitability' ? 'contained' : 'outlined'}
            onClick={() => setCurrentSection('profitability')}
            startIcon={<MonetizationOnIcon />}
            sx={{ mr: 2, textTransform: 'none', color: '#004a8f' }}
          >
            Análisis de Rentabilidad
          </Button>
          <Button
            variant={currentSection === 'report_generation' ? 'contained' : 'outlined'}
            onClick={() => setCurrentSection('report_generation')}
            startIcon={<DescriptionIcon />}
            sx={{ mr: 2, textTransform: 'none', color: '#004a8f' }}
          >
            Generación de Reportes
          </Button>
        </Box>

        {/* Sección: Análisis de Rentabilidad */}
        {currentSection === 'profitability' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <AttachMoneyIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Análisis Detallado de Rentabilidad
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                Actualizar Datos
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            {/* Insights de Rentabilidad con IA */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                <InsightsIcon sx={{ color: '#9c27b0', mr: 1 }} /> Insights de Rentabilidad Generados con IA
              </Typography>
              <Grid container spacing={3}>
                {profitabilityData.aiInsights.map((insight) => (
                  <Grid item xs={12} md={4} key={insight.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: `5px solid ${insight.type === 'Rentabilidad' && insight.relevance === 'Alta' ? '#f44336' : '#4caf50'}` }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        {insight.relevance === 'Alta' ? <WarningIcon sx={{ color: '#f44336', mr: 1 }} /> : <LightbulbIcon sx={{ color: '#4caf50', mr: 1 }} />}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {insight.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {insight.description}
                      </Typography>
                      <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                        **Acción Recomendada:** {insight.recommendedAction}
                      </Typography>
                      <Chip label={`Relevancia: ${insight.relevance}`} size="small" sx={{ mt: 1 }} color={insight.relevance === 'Alta' ? 'error' : (insight.relevance === 'Media' ? 'warning' : 'success')} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Pestañas de Rentabilidad */}
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
              Análisis por Dimensión
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Button onClick={() => setReportFilters(prev => ({ ...prev, filterType: 'customer' }))} variant={reportFilters.filterType === 'customer' ? 'contained' : 'text'} sx={{ mr: 2 }}>
                Por Cliente
              </Button>
              <Button onClick={() => setReportFilters(prev => ({ ...prev, filterType: 'service' }))} variant={reportFilters.filterType === 'service' ? 'contained' : 'text'} sx={{ mr: 2 }}>
                Por Servicio
              </Button>
              <Button onClick={() => setReportFilters(prev => ({ ...prev, filterType: 'project' }))} variant={reportFilters.filterType === 'project' ? 'contained' : 'text'}>
                Por Proyecto
              </Button>
            </Box>

            {/* Tabla de Rentabilidad por Cliente */}
            {reportFilters.filterType === 'customer' && (
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
                <Table aria-label="profitability by customer" stickyHeader>
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID Cliente</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Nombre Cliente</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Ingresos</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Costos</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Ganancia</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Margen (%)</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Proyectos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {profitabilityData.byCustomer.map((data) => (
                      <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>${data.revenue.toLocaleString()}</TableCell>
                        <TableCell>${data.costs.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: data.profit > 0 ? 'green' : 'red' }}>${data.profit.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: parseFloat(data.margin) > 20 ? 'green' : (parseFloat(data.margin) > 10 ? 'orange' : 'red') }}>{data.margin}</TableCell>
                        <TableCell>{data.projects}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Tabla de Rentabilidad por Servicio */}
            {reportFilters.filterType === 'service' && (
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
                <Table aria-label="profitability by service" stickyHeader>
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID Servicio</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Nombre Servicio</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Ingresos</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Costos</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Ganancia</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Margen (%)</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Clientes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {profitabilityData.byService.map((data) => (
                      <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>${data.revenue.toLocaleString()}</TableCell>
                        <TableCell>${data.costs.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: data.profit > 0 ? 'green' : 'red' }}>${data.profit.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: parseFloat(data.margin) > 20 ? 'green' : (parseFloat(data.margin) > 10 ? 'orange' : 'red') }}>{data.margin}</TableCell>
                        <TableCell>{data.customers}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Tabla de Rentabilidad por Proyecto */}
            {reportFilters.filterType === 'project' && (
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
                <Table aria-label="profitability by project" stickyHeader>
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID Proyecto</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Nombre Proyecto</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Cliente</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Presupuesto</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Costo Actual</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Ganancia</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Margen (%)</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {profitabilityData.byProject.map((data) => (
                      <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.customer}</TableCell>
                        <TableCell>${data.budget.toLocaleString()}</TableCell>
                        <TableCell>${data.actualCost.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: data.profit > 0 ? 'green' : 'red' }}>${data.profit.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: parseFloat(data.margin) > 20 ? 'green' : (parseFloat(data.margin) > 10 ? 'orange' : 'red') }}>{data.margin}</TableCell>
                        <TableCell><Chip label={data.status} size="small" color={data.status === 'Completado' ? 'success' : 'primary'} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        )}

        {/* Sección: Generación de Reportes (Predefinidos) */}
        {currentSection === 'report_generation' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <DescriptionIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Reportes Predefinidos y Personalizados
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            {/* Filtros Globales para Reportes */}
            <Accordion sx={{ mb: 3, bgcolor: '#e3f2fd', border: '1px solid #bbdefb' }} elevation={0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e3f2fd' }}>
                <FilterListIcon sx={{ mr: 1, color: '#1976d2' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>Filtros Avanzados para Reportes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Módulo</InputLabel>
                      <Select name="module" value={reportFilters.module} onChange={handleFilterChange} label="Módulo">
                        <MenuItem value="">Todos</MenuItem>
                        {availableModules.map(mod => <MenuItem key={mod} value={mod}>{mod}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Periodo de Tiempo</InputLabel>
                      <Select name="timeFrame" value={reportFilters.timeFrame} onChange={handleFilterChange} label="Periodo de Tiempo">
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Último Día">Último Día</MenuItem>
                        <MenuItem value="Última Semana">Última Semana</MenuItem>
                        <MenuItem value="Último Mes">Último Mes</MenuItem>
                        <MenuItem value="Último Trimestre">Último Trimestre</MenuItem>
                        <MenuItem value="Último Año">Último Año</MenuItem>
                        <MenuItem value="Personalizado">Personalizado</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Estado</InputLabel>
                      <Select name="status" value={reportFilters.status} onChange={handleFilterChange} label="Estado">
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Activo">Activo</MenuItem>
                        <MenuItem value="Completado">Completado</MenuItem>
                        <MenuItem value="Pendiente">Pendiente</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {reportFilters.timeFrame === 'Personalizado' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="start"
                          label="Fecha Inicio"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={reportFilters.customRange.start}
                          onChange={(e) => setReportFilters(prev => ({ ...prev, customRange: { ...prev.customRange, start: e.target.value } }))}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="end"
                          label="Fecha Fin"
                          type="date"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={reportFilters.customRange.end}
                          onChange={(e) => setReportFilters(prev => ({ ...prev, customRange: { ...prev.customRange, end: e.target.value } }))}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <Button variant="contained" startIcon={<SearchIcon />} sx={{ textTransform: 'none' }}>
                      Aplicar Filtros
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Lista de Reportes */}
            <Grid container spacing={3}>
              {predefinedReports
                .filter(report =>
                  (!reportFilters.module || report.module === reportFilters.module) &&
                  (!reportFilters.timeFrame || report.defaultFilters?.timeFrame === reportFilters.timeFrame || reportFilters.timeFrame === 'Personalizado') && // Simplified for demo
                  (!reportFilters.status || report.defaultFilters?.status === reportFilters.status) // Simplified for demo
                )
                .map((report) => (
                  <Grid item xs={12} md={6} key={report.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: '5px solid #2196f3' }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <DescriptionIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {report.name}
                        </Typography>
                        {report.favorite && (
                          <Tooltip title="Reporte Favorito">
                            <StarIcon sx={{ color: '#ffc107', mr: 1 }} />
                          </Tooltip>
                        )}
                        {report.isCustom && (
                          <Chip label="Personalizado" size="small" color="secondary" sx={{ mr: 1 }} />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Módulo: {report.module} | Exporta como: {report.format}
                      </Typography>
                      <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                        {report.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Campos Incluidos: {report.fields.slice(0, 3).join(', ')}{report.fields.length > 3 ? '...' : ''}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Filtros por Defecto: {report.defaultFilters ? JSON.stringify(report.defaultFilters) : 'Ninguno'}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleGenerateReportClick(report)}
                          sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                        >
                          Generar Reporte
                        </Button>
                        <Tooltip title="Editar Reporte">
                          <IconButton color="info" size="small"><EditIcon /></IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Reporte">
                          <IconButton color="error" size="small"><DeleteIcon /></IconButton>
                        </Tooltip>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        )}

        {/* Sección: Crear Reporte Personalizado */}
        {currentSection === 'custom_reports' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PlaylistAddCheckIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Diseñar Nuevo Reporte Personalizado
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre del Reporte"
                  variant="outlined"
                  name="name"
                  value={customReportData.name}
                  onChange={handleCustomReportChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Descripción (Opcional)"
                  multiline
                  rows={3}
                  variant="outlined"
                  name="description"
                  value={customReportData.description}
                  onChange={handleCustomReportChange}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Módulo de Datos Fuente</InputLabel>
                  <Select
                    name="module"
                    value={customReportData.module}
                    onChange={handleCustomReportChange}
                    label="Módulo de Datos Fuente"
                  >
                    <MenuItem value="">Selecciona un módulo</MenuItem>
                    {availableModules.map(mod => <MenuItem key={mod} value={mod}>{mod}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Formato de Exportación</InputLabel>
                  <Select
                    name="exportFormat"
                    value={customReportData.exportFormat}
                    onChange={handleCustomReportChange}
                    label="Formato de Exportación"
                  >
                    {availableExportFormats.map(format => <MenuItem key={format} value={format}>{format}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                  Seleccionar Campos del Reporte
                </Typography>
                {customReportData.module ? (
                  currentCustomReportModuleFields.length > 0 ? (
                    <Paper variant="outlined" sx={{ p: 2, maxHeight: 300, overflowY: 'auto', bgcolor: '#fafafa' }}>
                      {currentCustomReportModuleFields.map(field => (
                        <FormControlLabel
                          key={field}
                          control={
                            <Checkbox
                              checked={selectedFieldsForCustomReport.includes(field)}
                              onChange={() => handleFieldSelectionForCustomReport(field)}
                            />
                          }
                          label={field}
                        />
                      ))}
                    </Paper>
                  ) : (
                    <Typography color="text.secondary">No hay campos disponibles para este módulo.</Typography>
                  )
                ) : (
                  <Typography color="text.secondary">Selecciona un módulo para ver los campos disponibles.</Typography>
                )}

                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
                  <FilterListIcon sx={{ mr: 0.5, fontSize: 20, color: '#2196f3' }} /> Filtros por Defecto (Opcional)
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Define filtros que se aplicarán por defecto al generar este reporte.
                </Typography>
                <TextField
                  fullWidth
                  label="Ejemplo: Periodo de Tiempo (ej. 'Último Mes')"
                  variant="outlined"
                  name="defaultTimeFilter"
                  value={customReportData.filters.timeFrame || ''}
                  onChange={(e) => setCustomReportData(prev => ({ ...prev, filters: { ...prev.filters, timeFrame: e.target.value } }))}
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  label="Ejemplo: Estado (ej. 'Activo')"
                  variant="outlined"
                  name="defaultStatusFilter"
                  value={customReportData.filters.status || ''}
                  onChange={(e) => setCustomReportData(prev => ({ ...prev, filters: { ...prev.filters, status: e.target.value } }))}
                  sx={{ mb: 1 }}
                />
                <Button variant="contained" startIcon={<AutoAwesomeIcon />} sx={{ mt: 2, textTransform: 'none' }}>
                  Asistente de IA para Filtros
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PlaylistAddCheckIcon />}
                  sx={{ textTransform: 'none', mt: 3 }}
                  onClick={handleSaveCustomReport}
                >
                  Guardar Reporte Personalizado
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>

      {/* Dialog para Generar Reporte */}
      <Dialog open={openGenerateReportDialog} onClose={handleCloseGenerateReportDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Generar Reporte: {selectedReportToGenerate?.name}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Estás a punto de generar el reporte "{selectedReportToGenerate?.name}".
            Será exportado en formato **{selectedReportToGenerate?.format}**.
            Los filtros por defecto aplicados son: **{selectedReportToGenerate?.defaultFilters ? JSON.stringify(selectedReportToGenerate.defaultFilters) : 'Ninguno'}**.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Puedes ajustar los filtros globales antes de generar si deseas.
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="primary" />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
              Esto puede tomar unos momentos...
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGenerateReportDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleConfirmReportGeneration} variant="contained" color="primary">
            Confirmar y Generar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AnalyticsReports;