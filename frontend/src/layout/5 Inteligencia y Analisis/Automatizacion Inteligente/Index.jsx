import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  Snackbar,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Checkbox,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Table,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import BrainIcon from '@mui/icons-material/Psychology'; // Icono principal de IA Empresarial
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // IA / Automatización
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'; // Preguntar al Modelo
import DataObjectIcon from '@mui/icons-material/DataObject'; // Conectar a Datos
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Ejecutar
import StopIcon from '@mui/icons-material/Stop'; // Detener
import RefreshIcon from '@mui/icons-material/Refresh'; // Actualizar
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Agregar
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import EditIcon from '@mui/icons-material/Edit'; // Editar
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración
import StorageIcon from '@mui/icons-material/Storage'; // Base de Datos
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Acordeón
import AccountTreeIcon from '@mui/icons-material/AccountTree'; // Flujos de Trabajo
import RuleIcon from '@mui/icons-material/Rule'; // Reglas
import InsightsIcon from '@mui/icons-material/Insights'; // Insights
import ScienceIcon from '@mui/icons-material/Science'; // Experimentación
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Sugerencias

// --- Datos Simulados de Modelo de IA Empresarial ---

const aiModelStatus = {
  modelName: 'HORUS',
  version: '2.1.0',
  status: 'Operativo', // 'Operativo', 'Entrenando', 'Mantenimiento', 'Error'
  lastActivity: '2025-06-11 22:30:00 -05',
  uptime: '98.5%',
  resourceUsage: { cpu: '45%', memory: '60%', gpu: '20%' },
  modelHealthScore: 8.9, // Out of 10
};

const connectedDatabases = [
  { id: 'DB-001', name: 'ERP_Produccion', type: 'SQL Server', status: 'Conectado', lastSync: '2025-06-11 22:15:00 -05', tables: ['Ventas', 'Inventario', 'Clientes'] },
  { id: 'DB-002', name: 'CRM_Historico', type: 'MongoDB', status: 'Conectado', lastSync: '2025-06-11 22:00:00 -05', collections: ['Interacciones', 'Leads', 'Campañas'] },
  { id: 'DB-003', name: 'DataLake_Marketing', type: 'AWS S3', status: 'Conectado', lastSync: '2025-06-11 21:00:00 -05', buckets: ['WebAnalytics', 'SocialMedia'] },
  { id: 'DB-004', name: 'Log_Servicios', type: 'PostgreSQL', status: 'Desconectado', lastSync: 'N/A', tables: ['Errores', 'Auditorias'] },
];

const automatedWorkflows = [
  { id: 'WF-001', name: 'Clasificación Automática de Tickets de Soporte', status: 'Activo', trigger: 'Nuevo Ticket', action: 'Asignar Prioridad/Departamento', modelUsed: 'NLP_Classifier_v1', lastRun: '2025-06-11 22:25:00 -05', successRate: '95%' },
  { id: 'WF-002', name: 'Alerta de Riesgo de Abandono de Cliente', status: 'Activo', trigger: 'Baja Actividad del Cliente', action: 'Notificar a Ventas/Marketing', modelUsed: 'Churn_Predictor_v2', lastRun: '2025-06-11 20:00:00 -05', successRate: '90%' },
  { id: 'WF-003', name: 'Generación de Resúmenes Ejecutivos', status: 'Inactivo', trigger: 'Fin de Mes', action: 'Generar Reporte', modelUsed: 'Text_Summarizer_v1', lastRun: 'N/A', successRate: 'N/A' },
];

const sampleQuestions = [
  "¿Cuáles son las 5 ventas más grandes del último trimestre de la base de datos 'ERP_Produccion'?",
  "¿Qué clientes en la base de datos 'CRM_Historico' tienen un alto riesgo de abandono según el modelo 'Churn_Predictor_v2' y cuál fue su última interacción?",
  "Genera un resumen de los datos de tráfico web del último mes de 'DataLake_Marketing'.",
  "Analiza los errores de servicio de los últimos 24 horas en 'Log_Servicios' e identifica patrones."
];

const aiRecommendations = [
  { id: 'REC-001', title: 'Optimizar Proceso de Aprobación de Créditos', description: 'El modelo de IA sugiere que el proceso de aprobación de créditos puede reducir su tiempo en un 30% automatizando la verificación de datos.', type: 'Proceso', status: 'Pendiente', severity: 'Alta' },
  { id: 'REC-002', title: 'Nueva Segmentación de Marketing Basada en Comportamiento', description: 'La IA ha identificado un nuevo segmento de clientes con alto potencial de compra no explotado. Recomienda una campaña dirigida.', type: 'Estrategia', status: 'Nuevo', severity: 'Media' },
  { id: 'REC-003', title: 'Mejorar Calidad de Datos en ERP_Produccion', description: 'Detectados inconsistencias en los registros de inventario que afectan la precisión de las predicciones de demanda.', type: 'Dato', status: 'En Análisis', severity: 'Baja' },
];


function EnterpriseAIModel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('model_status'); // 'model_status', 'data_sources', 'automations', 'interact', 'recommendations', 'settings'
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null); // {type: 'success'|'error'|'data', content: any}
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info'); // 'success', 'error', 'warning', 'info'

  // State for adding/editing database connection
  const [openDbDialog, setOpenDbDialog] = useState(false);
  const [currentDb, setCurrentDb] = useState(null); // null for add, object for edit

  // State for adding/editing workflow
  const [openWorkflowDialog, setOpenWorkflowDialog] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState(null); // null for add, object for edit

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleQuestionSubmit = async () => {
    if (!question.trim()) {
      showSnackbar('Por favor, ingresa una pregunta.', 'warning');
      return;
    }
    setIsProcessing(true);
    setAiResponse(null); // Clear previous response

    // Simulate AI processing and data fetching
    try {
      // Simulate API call to AI model
      const response = await new Promise(resolve => setTimeout(() => {
        if (question.toLowerCase().includes("ventas más grandes")) {
          resolve({
            type: 'data',
            content: {
              columns: ['ID Venta', 'Fecha', 'Cliente', 'Monto ($)', 'Producto'],
              rows: [
                ['V-8912', '2025-05-20', 'Global Enterprises', 250000, 'Solución Cloud X'],
                ['V-8913', '2025-04-15', 'Tech Innovators', 180000, 'Licencias Software Y'],
                ['V-8914', '2025-05-01', 'Future Corp', 120000, 'Consultoría de IA'],
                ['V-8915', '2025-03-22', 'Dynamic Solutions', 95000, 'Hardware de Red'],
                ['V-8916', '2025-04-05', 'Alpha Group', 80000, 'Servicios de Migración']
              ]
            }
          });
        } else if (question.toLowerCase().includes("riesgo de abandono")) {
          resolve({
            type: 'data',
            content: {
              columns: ['ID Cliente', 'Nombre', 'Riesgo Churn', 'Score (%)', 'Última Interacción'],
              rows: [
                ['CUST-007', 'Innovatech', 'Alto', '88%', '2025-05-01'],
                ['CUST-012', 'Digital Bridge', 'Alto', '75%', '2025-05-15'],
                ['CUST-021', 'Creative Nexus', 'Medio', '55%', '2025-06-01'],
              ]
            }
          });
        } else if (question.toLowerCase().includes("resumen de tráfico web")) {
          resolve({
            type: 'text',
            content: "El análisis de tráfico web del último mes indica un aumento del 15% en las visitas orgánicas, con un pico significativo en la segunda semana de mayo. La tasa de rebote se mantiene estable en 45%. Las páginas de producto X y Y fueron las más visitadas."
          });
        } else if (question.toLowerCase().includes("errores de servicio")) {
          resolve({
            type: 'text',
            content: "Los logs de servicio de las últimas 24 horas muestran un aumento del 10% en errores de autenticación (código 401) entre las 02:00 AM y 04:00 AM, afectando principalmente a usuarios de la región Asia-Pacífico. Se recomienda investigar posibles ataques o configuraciones de red."
          });
        }
        else {
          resolve({
            type: 'text',
            content: "Disculpa, no puedo responder a esa pregunta con los datos simulados disponibles. Intenta con una de las preguntas de ejemplo."
          });
        }
      }, 2000)); // Simulate AI processing time

      setAiResponse(response);
      showSnackbar('Consulta procesada con éxito.', 'success');
    } catch (error) {
      console.error("Error al procesar la pregunta de IA:", error);
      setAiResponse({ type: 'error', content: 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.' });
      showSnackbar('Error al procesar la consulta.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddEditDb = (db = null) => {
    setCurrentDb(db);
    setOpenDbDialog(true);
  };

  const handleSaveDb = (formData) => {
    // Simulate save/update logic
    if (currentDb) {
      // Update existing
      const index = connectedDatabases.findIndex(d => d.id === currentDb.id);
      if (index !== -1) {
        connectedDatabases[index] = { ...connectedDatabases[index], ...formData };
      }
      showSnackbar('Conexión de base de datos actualizada.', 'success');
    } else {
      // Add new
      connectedDatabases.push({ id: `DB-${(connectedDatabases.length + 1).toString().padStart(3, '0')}`, status: 'Conectado', lastSync: 'Ahora', ...formData });
      showSnackbar('Nueva conexión de base de datos agregada.', 'success');
    }
    setOpenDbDialog(false);
  };

  const handleDeleteDb = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta conexión?')) {
      const index = connectedDatabases.findIndex(d => d.id === id);
      if (index !== -1) {
        connectedDatabases.splice(index, 1); // Remove from array
        showSnackbar('Conexión de base de datos eliminada.', 'info');
      }
    }
  };

  const handleAddEditWorkflow = (workflow = null) => {
    setCurrentWorkflow(workflow);
    setOpenWorkflowDialog(true);
  };

  const handleSaveWorkflow = (formData) => {
    // Simulate save/update logic
    if (currentWorkflow) {
      const index = automatedWorkflows.findIndex(w => w.id === currentWorkflow.id);
      if (index !== -1) {
        automatedWorkflows[index] = { ...automatedWorkflows[index], ...formData };
      }
      showSnackbar('Flujo de trabajo actualizado.', 'success');
    } else {
      automatedWorkflows.push({ id: `WF-${(automatedWorkflows.length + 1).toString().padStart(3, '0')}`, status: 'Inactivo', lastRun: 'N/A', successRate: 'N/A', ...formData });
      showSnackbar('Nuevo flujo de trabajo agregado.', 'success');
    }
    setOpenWorkflowDialog(false);
  };

  const handleDeleteWorkflow = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este flujo de trabajo?')) {
      const index = automatedWorkflows.findIndex(w => w.id === id);
      if (index !== -1) {
        automatedWorkflows.splice(index, 1);
        showSnackbar('Flujo de trabajo eliminado.', 'info');
      }
    }
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          )}
          <BrainIcon sx={{ fontSize: 36, mr: 1, color: '#ffffff' }} /> {/* Morado para IA Empresarial */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Modelo de IA Empresarial
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SettingsIcon />}
            sx={{ textTransform: 'none', mr: 2, color:'#ffffff' }}
            onClick={() => setCurrentTab('settings')}
          >
            Configuración
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none', color:'#ffffff' }}
          >
            Recargar
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            Gestiona el Corazón de tu Inteligencia Artificial
          </Typography>
          <Typography variant="h6" color="#616161">
            Supervisa, interactúa y automatiza procesos con tu modelo de IA empresarial.
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
                backgroundColor: '#004a8f', // Morado para la barra de la pestaña activa
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#004a8f', // Color del texto de la pestaña activa
                },
              },
            }}
          >
            <Tab label="Estado del Modelo" value="model_status" icon={<BrainIcon />} iconPosition="start" />
            <Tab label="Fuentes de Datos" value="data_sources" icon={<DataObjectIcon />} iconPosition="start" />
            <Tab label="Automatizaciones" value="automations" icon={<AccountTreeIcon />} iconPosition="start" />
            <Tab label="Interactuar con IA" value="interact" icon={<QuestionAnswerIcon />} iconPosition="start" />
            <Tab label="Recomendaciones IA" value="recommendations" icon={<LightbulbIcon />} iconPosition="start" />
            <Tab label="Configuración" value="settings" icon={<SettingsIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Estado del Modelo */}
          {currentTab === 'model_status' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <BrainIcon sx={{ color: '#004a8f', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Estado General del Modelo HORUS AI
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                  Verificar Estado
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: aiModelStatus.status === 'Operativo' ? '#e8f5e9' : '#ffebee', borderLeft: `5px solid ${aiModelStatus.status === 'Operativo' ? '#4caf50' : '#d32f2f'}` }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {aiModelStatus.status}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Estado Actual del Modelo</Typography>
                    <Chip label={`Versión: ${aiModelStatus.version}`} size="small" sx={{ mt: 1 }} />
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', borderLeft: '5px solid #2196f3' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                      {aiModelStatus.uptime}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">Tiempo de Actividad</Typography>
                    <Typography variant="body2" color="text.secondary">Última Actividad: {aiModelStatus.lastActivity}</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2, bgcolor: '#f3e5f5', borderLeft: '5px solid #9c27b0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                      Uso de Recursos
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="body2" sx={{ width: 60 }}>CPU:</Typography>
                      <LinearProgress variant="determinate" value={parseFloat(aiModelStatus.resourceUsage.cpu)} sx={{ flexGrow: 1, mr: 1 }} color={parseFloat(aiModelStatus.resourceUsage.cpu) > 70 ? 'error' : 'primary'} />
                      <Typography variant="body2">{aiModelStatus.resourceUsage.cpu}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="body2" sx={{ width: 60 }}>Memoria:</Typography>
                      <LinearProgress variant="determinate" value={parseFloat(aiModelStatus.resourceUsage.memory)} sx={{ flexGrow: 1, mr: 1 }} color={parseFloat(aiModelStatus.resourceUsage.memory) > 70 ? 'warning' : 'primary'} />
                      <Typography variant="body2">{aiModelStatus.resourceUsage.memory}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" sx={{ width: 60 }}>GPU:</Typography>
                      <LinearProgress variant="determinate" value={parseFloat(aiModelStatus.resourceUsage.gpu)} sx={{ flexGrow: 1, mr: 1 }} color={parseFloat(aiModelStatus.resourceUsage.gpu) > 70 ? 'error' : 'success'} />
                      <Typography variant="body2">{aiModelStatus.resourceUsage.gpu}</Typography>
                    </Box>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ p: 2, bgcolor: '#fffde7', borderLeft: '5px solid #ffeb3b' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>
                      Puntuación de Salud del Modelo
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <CircularProgress
                        variant="determinate"
                        value={aiModelStatus.modelHealthScore * 10}
                        size={60}
                        thickness={5}
                        sx={{ color: aiModelStatus.modelHealthScore > 8 ? '#4caf50' : (aiModelStatus.modelHealthScore > 7 ? '#ff9800' : '#f44336'), mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
                          {aiModelStatus.modelHealthScore.toFixed(1)} / 10
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Métrica combinada de precisión, latencia y estabilidad.
                        </Typography>
                        {aiModelStatus.modelHealthScore < 7 && (
                          <Alert severity="warning" sx={{ mt: 1 }}>
                            <AlertTitle>Atención: Salud del modelo por debajo del umbral.</AlertTitle>
                            Se recomienda revisar los logs y el rendimiento.
                          </Alert>
                        )}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Tab: Fuentes de Datos */}
          {currentTab === 'data_sources' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <DataObjectIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión de Fuentes de Datos Conectadas
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddEditDb(null)} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Añadir Conexión
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                {connectedDatabases.map((db) => (
                  <Grid item xs={12} md={6} key={db.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: `5px solid ${db.status === 'Conectado' ? '#4caf50' : '#f44336'}` }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <StorageIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {db.name}
                        </Typography>
                        <Chip label={db.status} size="small" color={db.status === 'Conectado' ? 'success' : 'error'} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Tipo: {db.type} | Última Sincronización: {db.lastSync}
                      </Typography>
                      <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                        Objetos de datos: {db.tables ? db.tables.join(', ') : (db.collections ? db.collections.join(', ') : db.buckets.join(', '))}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }} onClick={() => handleAddEditDb(db)}>Editar</Button>
                        <Button variant="contained" size="small" sx={{ textTransform: 'none', bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }} onClick={() => handleDeleteDb(db.id)}>Eliminar</Button>
                        <Button variant="text" size="small" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>Sincronizar</Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Tab: Automatizaciones Inteligentes */}
          {currentTab === 'automations' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountTreeIcon sx={{ color: '#9c27b0', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Flujos de Trabajo Automatizados por IA
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddEditWorkflow(null)} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Crear Flujo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                {automatedWorkflows.map((workflow) => (
                  <Grid item xs={12} md={6} key={workflow.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: `5px solid ${workflow.status === 'Activo' ? '#4caf50' : '#bdbdbd'}` }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <RuleIcon sx={{ color: '#673ab7', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {workflow.name}
                        </Typography>
                        <Chip label={workflow.status} size="small" color={workflow.status === 'Activo' ? 'success' : 'default'} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Modelo Usado: {workflow.modelUsed} | Última Ejecución: {workflow.lastRun}
                      </Typography>
                      <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                        **Disparador:** {workflow.trigger} - **Acción:** {workflow.action}
                      </Typography>
                      {workflow.status === 'Activo' && (
                        <Box display="flex" alignItems="center" mb={1}>
                          <Typography variant="body2" sx={{ minWidth: 100 }}>Tasa de Éxito:</Typography>
                          <LinearProgress variant="determinate" value={parseFloat(workflow.successRate)} sx={{ flexGrow: 1, mr: 1 }} color={parseFloat(workflow.successRate) > 90 ? 'success' : 'warning'} />
                          <Typography variant="body2">{workflow.successRate}</Typography>
                        </Box>
                      )}
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }} onClick={() => handleAddEditWorkflow(workflow)}>Editar</Button>
                        <Button variant="contained" size="small" sx={{ textTransform: 'none', bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }} onClick={() => handleDeleteWorkflow(workflow.id)}>Eliminar</Button>
                        {workflow.status === 'Activo' ? (
                          <Button variant="text" size="small" startIcon={<StopIcon />} sx={{ textTransform: 'none', color: '#ff9800' }}>Detener</Button>
                        ) : (
                          <Button variant="text" size="small" startIcon={<PlayArrowIcon />} sx={{ textTransform: 'none', color: '#4caf50' }}>Activar</Button>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Tab: Interactuar con IA */}
          {currentTab === 'interact' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <QuestionAnswerIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Interactuar con el Modelo de IA
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Typography variant="subtitle1" sx={{ mb: 2, color: '#616161' }}>
                Haz preguntas sobre tus datos empresariales. El modelo puede acceder a las fuentes de datos conectadas.
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Escribe tu pregunta o solicitud aquí..."
                variant="outlined"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ mb: 2 }}
                placeholder="Ej: ¿Cuál es el promedio de ventas por región en el último mes de la base de datos 'ERP_Produccion'?"
              />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Preguntas de Ejemplo:</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {sampleQuestions.map((q, index) => (
                    <Chip
                      key={index}
                      label={q}
                      onClick={() => setQuestion(q)}
                      variant="outlined"
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>

              <Button
                variant="contained"
                startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                onClick={handleQuestionSubmit}
                disabled={isProcessing}
                sx={{ textTransform: 'none', bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' } }}
              >
                {isProcessing ? 'Procesando...' : 'Preguntar a la IA'}
              </Button>

              {aiResponse && (
                <Box sx={{ mt: 4, p: 3, border: `1px solid ${aiResponse.type === 'error' ? '#ef9a9a' : '#c8e6c9'}`, borderRadius: 2, bgcolor: aiResponse.type === 'error' ? '#ffebee' : '#e8f5e9' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: aiResponse.type === 'error' ? '#d32f2f' : '#2e7d32', mb: 2 }}>
                    {aiResponse.type === 'success' || aiResponse.type === 'text' ? <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> : <ErrorOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />}
                    Respuesta de la IA:
                  </Typography>
                  {aiResponse.type === 'text' && (
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: '#424242' }}>
                      {aiResponse.content}
                    </Typography>
                  )}
                  {aiResponse.type === 'data' && (
                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 300 }}>
                      <Table size="small" stickyHeader>
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                          <TableRow>
                            {aiResponse.content.columns.map((col, index) => (
                              <TableCell key={index} sx={{ fontWeight: 600 }}>{col}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {aiResponse.content.rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  {aiResponse.type === 'error' && (
                    <Alert severity="error">
                      <AlertTitle>Error de Procesamiento</AlertTitle>
                      {aiResponse.content}
                    </Alert>
                  )}
                </Box>
              )}
            </Paper>
          )}

          {/* Tab: Recomendaciones de IA */}
          {currentTab === 'recommendations' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <LightbulbIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Sugerencias y Oportunidades por IA
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                {aiRecommendations.map((rec) => (
                  <Grid item xs={12} md={6} key={rec.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: `5px solid ${rec.severity === 'Alta' ? '#d32f2f' : (rec.severity === 'Media' ? '#ff9800' : '#4caf50')}` }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <InsightsIcon sx={{ color: '#ff9800', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {rec.title}
                        </Typography>
                        <Chip label={rec.status} size="small" color={rec.status === 'Pendiente' ? 'warning' : (rec.status === 'Nuevo' ? 'primary' : 'success')} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Tipo: {rec.type} | Severidad: {rec.severity}
                      </Typography>
                      <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                        {rec.description}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button variant="contained" size="small" sx={{ textTransform: 'none', bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' } }}>
                          Ver Detalles
                        </Button>
                        <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>Marcar como Leído</Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Tab: Configuración del Modelo */}
          {currentTab === 'settings' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SettingsIcon sx={{ color: '#424242', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Configuración Avanzada del Modelo de IA
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Parámetros del Modelo Core</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="Umbral de Confianza (%)" variant="outlined" defaultValue="80" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="Frecuencia de Re-entrenamiento" variant="outlined" defaultValue="Semanal" />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel control={<Checkbox defaultChecked />} label="Activar Auto-optimización de Hiperparámetros" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" startIcon={<ScienceIcon />} sx={{ textTransform: 'none', bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' } }}>
                        Iniciar Re-entrenamiento Manual
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Gestión de Logs y Auditoría</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Nivel de Logging</InputLabel>
                    <Select label="Nivel de Logging" defaultValue="Info">
                      <MenuItem value="Debug">Debug</MenuItem>
                      <MenuItem value="Info">Info</MenuItem>
                      <MenuItem value="Warning">Warning</MenuItem>
                      <MenuItem value="Error">Error</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Habilitar Auditoría de Interacciones de Usuario" />
                  <Button variant="outlined" sx={{ mt: 2, textTransform: 'none' }}>Descargar Logs Recientes</Button>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Seguridad y Acceso</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Gestiona los roles y permisos de acceso al modelo de IA y sus funcionalidades.
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                    Administrar Roles y Permisos
                  </Button>
                </AccordionDetails>
              </Accordion>

              <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Button variant="contained" color="success" sx={{ textTransform: 'none' }}>
                  Guardar Cambios de Configuración
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Añadir/Editar Conexión de Base de Datos */}
      <Dialog open={openDbDialog} onClose={() => setOpenDbDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          {currentDb ? 'Editar Conexión de Base de Datos' : 'Añadir Nueva Conexión de Base de Datos'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Conexión"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentDb?.name || ''}
            onChange={(e) => setCurrentDb(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Tipo de Base de Datos</InputLabel>
            <Select
              label="Tipo de Base de Datos"
              defaultValue={currentDb?.type || ''}
              onChange={(e) => setCurrentDb(prev => ({ ...prev, type: e.target.value }))}
            >
              <MenuItem value="SQL Server">SQL Server</MenuItem>
              <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
              <MenuItem value="MySQL">MySQL</MenuItem>
              <MenuItem value="MongoDB">MongoDB</MenuItem>
              <MenuItem value="AWS S3">AWS S3 (Data Lake)</MenuItem>
              <MenuItem value="Google BigQuery">Google BigQuery</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Cadena de Conexión / Endpoint"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentDb?.connectionString || ''}
            onChange={(e) => setCurrentDb(prev => ({ ...prev, connectionString: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Usuario"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentDb?.user || ''}
            onChange={(e) => setCurrentDb(prev => ({ ...prev, user: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            defaultValue={currentDb?.password || ''}
            onChange={(e) => setCurrentDb(prev => ({ ...prev, password: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Objetos de Datos (tablas/colecciones, separados por coma)"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentDb?.tables?.join(', ') || currentDb?.collections?.join(', ') || currentDb?.buckets?.join(', ') || ''}
            onChange={(e) => setCurrentDb(prev => ({ ...prev, tables: e.target.value.split(',').map(s => s.trim()) }))} // Simplified to 'tables' for generic use
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDbDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={() => handleSaveDb(currentDb)} variant="contained" color="primary">
            {currentDb ? 'Guardar Cambios' : 'Añadir Conexión'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Añadir/Editar Flujo de Trabajo */}
      <Dialog open={openWorkflowDialog} onClose={() => setOpenWorkflowDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          {currentWorkflow ? 'Editar Flujo de Trabajo' : 'Crear Nuevo Flujo de Trabajo'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Flujo de Trabajo"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentWorkflow?.name || ''}
            onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Disparador (Ej: Nuevo Ticket, Baja Actividad)"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentWorkflow?.trigger || ''}
            onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, trigger: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Acción Automatizada (Ej: Asignar Prioridad, Notificar a Ventas)"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentWorkflow?.action || ''}
            onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, action: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Modelo de IA a Utilizar</InputLabel>
            <Select
              label="Modelo de IA a Utilizar"
              defaultValue={currentWorkflow?.modelUsed || ''}
              onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, modelUsed: e.target.value }))}
            >
              <MenuItem value="NLP_Classifier_v1">NLP_Classifier_v1 (Clasificación Texto)</MenuItem>
              <MenuItem value="Churn_Predictor_v2">Churn_Predictor_v2 (Predicción Abandono)</MenuItem>
              <MenuItem value="Text_Summarizer_v1">Text_Summarizer_v1 (Resumen Texto)</MenuItem>
              <MenuItem value="Anomaly_Detector_v1">Anomaly_Detector_v1 (Detección de Anomalías)</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel control={<Checkbox defaultChecked={currentWorkflow?.status === 'Activo'} onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, status: e.target.checked ? 'Activo' : 'Inactivo' }))} />} label="Activo" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWorkflowDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={() => handleSaveWorkflow(currentWorkflow)} variant="contained" color="primary">
            {currentWorkflow ? 'Guardar Cambios' : 'Crear Flujo'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default EnterpriseAIModel;