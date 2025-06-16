import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  List, ListItem, ListItemText, ListItemIcon,
  CircularProgress, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Card, CardContent, CardHeader,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import PredictIcon from '@mui/icons-material/Insights'; // Icono principal de Predicción IA
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Predicción de Ventas
import HistoryIcon from '@mui/icons-material/History'; // Modelos basados en historial
import DecisionIcon from '@mui/icons-material/Gavel'; // Centro de Decisiones
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'; // Sugerencias y Alertas
import BehaviorIcon from '@mui/icons-material/Psychology'; // Predicción de Comportamientos
import RefreshIcon from '@mui/icons-material/Refresh'; // Actualizar
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // IA
import WarningIcon from '@mui/icons-material/Warning'; // Alerta
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Sugerencia Positiva
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Información/Ayuda

// --- Datos Simulados de Predicción IA ---

const salesPredictionData = {
  currentMonth: 'Julio 2025',
  predictedSales: 1250000, // USD
  confidenceInterval: '± 50,000 USD',
  lastMonthActualSales: 1180000,
  growthPercentage: '+5.9%',
  keyFactors: [
    { name: 'Temporada Alta', impact: 'Alto Positivo' },
    { name: 'Campaña de Marketing Digital', impact: 'Medio Positivo' },
    { name: 'Competencia Reciente', impact: 'Bajo Negativo' },
  ],
  monthlyForecast: [
    { month: 'Junio 2025', actual: 1180000, predicted: 1170000 },
    { month: 'Julio 2025', actual: null, predicted: 1250000 },
    { month: 'Agosto 2025', actual: null, predicted: 1280000 },
    { month: 'Septiembre 2025', actual: null, predicted: 1220000 },
    { month: 'Octubre 2025', actual: null, predicted: 1350000 },
  ],
};

const predictiveModelsData = {
  models: [
    { id: 'MOD-001', name: 'Predicción de Demanda de Producto X', status: 'Activo', lastUpdate: '2025-06-01', accuracy: '92%', type: 'Series de Tiempo', description: 'Modelo XGBoost para predecir la demanda semanal del Producto X.' },
    { id: 'MOD-002', name: 'Segmentación de Clientes por Churn', status: 'Activo', lastUpdate: '2025-05-20', accuracy: '88%', type: 'Clasificación', description: 'Modelo Random Forest para identificar clientes con alto riesgo de abandono.' },
    { id: 'MOD-003', name: 'Optimización de Rutas de Entrega', status: 'Inactivo', lastUpdate: '2025-04-10', accuracy: 'N/A', type: 'Optimización', description: 'Modelo de grafo para optimizar las rutas de entrega diarias.' },
  ],
  modelPerformance: {
    'Predicción de Demanda de Producto X': [
      { metric: 'MAE', value: '50 unidades', target: '< 60' },
      { metric: 'RMSE', value: '75 unidades', target: '< 80' },
    ],
    'Segmentación de Clientes por Churn': [
      { metric: 'Precisión', value: '88%', target: '> 85%' },
      { metric: 'Recall', value: '85%', target: '> 80%' },
    ],
  },
};

const decisionCenterData = {
  alerts: [
    { id: 'DA-001', type: 'Alerta', title: 'Riesgo de Agotamiento de Stock (Producto Z)', description: 'La predicción de demanda indica que el stock actual del Producto Z será insuficiente en los próximos 10 días, con un 80% de probabilidad.', severity: 'Crítica', actionSuggested: 'Iniciar orden de compra urgente para el Producto Z (mínimo 500 unidades).', relatedModule: 'Inventario' },
    { id: 'DA-002', type: 'Sugerencia', title: 'Oportunidad de Campaña de Re-engagement', description: 'La IA ha identificado un segmento de 500 clientes inactivos con alta probabilidad de reactivación si se les ofrece un descuento del 15% en su próxima compra.', severity: 'Media', actionSuggested: 'Lanzar campaña de email marketing segmentada con oferta de descuento del 15% a los clientes identificados.', relatedModule: 'Marketing' },
    { id: 'DA-003', type: 'Alerta', title: 'Posible Retraso en Proyecto "Integración CRM"', description: 'El modelo predictivo de proyectos indica un 60% de probabilidad de que el proyecto "Integración CRM" se retrase 2 semanas debido a la sobrecarga del equipo.', severity: 'Alta', actionSuggested: 'Reasignar recursos al proyecto "Integración CRM" o ajustar el cronograma del proyecto con el cliente.', relatedModule: 'Proyectos' },
  ],
  decisionHistory: [
    { id: 'DH-001', alertTitle: 'Riesgo de Agotamiento de Stock (Producto Y)', actionTaken: 'Orden de compra emitida', date: '2025-05-28', status: 'Resuelto' },
    { id: 'DH-002', alertTitle: 'Sugerencia de Upsell a Cliente A', actionTaken: 'Campaña de upsell enviada', date: '2025-05-20', status: 'En Monitoreo' },
  ],
};

const behaviorPredictionData = {
  customerChurnRisk: [
    { customer: 'Alice Johnson', id: 'C-AJ-01', risk: 'Alto', score: 0.85, lastActivity: '2025-05-10', suggestedAction: 'Contactar proactivamente con oferta personalizada.' },
    { customer: 'Bob Smith', id: 'C-BS-02', risk: 'Medio', score: 0.55, lastActivity: '2025-06-01', suggestedAction: 'Monitorear actividad y considerar un incentivo si decrece.' },
    { customer: 'Charlie Brown', id: 'C-CB-03', risk: 'Bajo', score: 0.20, lastActivity: '2025-06-08', suggestedAction: 'Mantener servicio y comunicación regular.' },
  ],
  productRecommendation: [
    { user: 'Juan Pérez', recommendedProducts: ['Servicio de Consultoría Premium', 'Licencia de Software X', 'Curso de Capacitación Avanzado'], reason: 'Basado en historial de compras de productos similares y comportamiento de navegación.' },
    { user: 'Maria García', recommendedProducts: ['Dispositivo IoT para Hogar', 'Suscripción de Seguridad Cloud'], reason: 'Perfil de usuario y productos de interés en el mismo segmento.' },
  ],
};

function AIPrediction({ onGoToHome }) {
  const [currentSection, setCurrentSection] = useState('sales_prediction'); // 'sales_prediction', 'predictive_models', 'decision_center', 'behavior_prediction'
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleOpenAlertDialog = (alert) => {
    setSelectedAlert(alert);
    setOpenAlertDialog(true);
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
    setSelectedAlert(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Crítica': return '#d32f2f'; // Red
      case 'Alta': return '#ff9800'; // Orange
      case 'Media': return '#fb8c00'; // Darker orange
      case 'Baja': return '#4caf50'; // Green
      default: return '#757575';
    }
  };

  const getPredictionCardColor = (growth) => {
    if (!growth) return '#e0e0e0';
    const percentage = parseFloat(growth);
    if (percentage > 0) return '#e8f5e9'; // Light green
    if (percentage < 0) return '#ffebee'; // Light red
    return '#e0e0e0';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Alto': return '#d32f2f';
      case 'Medio': return '#ff9800';
      case 'Bajo': return '#4caf50';
      default: return '#757575';
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
          <AutoAwesomeIcon sx={{ fontSize: 36, mr: 1, color: '#fafafa' }} /> {/* Azul para IA */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Predicción con Inteligencia Artificial
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none' }}
          >
            Actualizar Predicciones
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            {currentSection === 'sales_prediction' && "Análisis Predictivo de Ventas"}
            {currentSection === 'predictive_models' && "Gestión de Modelos Predictivos"}
            {currentSection === 'decision_center' && "Centro de Decisiones Asistidas por IA"}
            {currentSection === 'behavior_prediction' && "Predicción de Comportamientos Clave"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {currentSection === 'sales_prediction' && "Anticipa el futuro de tus ventas y planifica estratégicamente con alta precisión."}
            {currentSection === 'predictive_models' && "Supervisa el rendimiento y la salud de tus modelos de IA basados en datos históricos."}
            {currentSection === 'decision_center' && "Recibe sugerencias y alertas automatizadas para tomar decisiones proactivas y optimizadas."}
            {currentSection === 'behavior_prediction' && "Comprende y anticipa el comportamiento de clientes y usuarios para acciones dirigidas."}
          </Typography>
        </Box>

        {/* Sección de Navegación Principal */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={currentSection === 'sales_prediction' ? 'contained' : 'outlined'}
            onClick={() => setCurrentSection('sales_prediction')}
            startIcon={<TrendingUpIcon />}
            sx={{ mr: 2, textTransform: 'none', color:'#004A8F' }}
          >
            Ventas
          </Button>
          <Button
            variant={currentSection === 'predictive_models' ? 'contained' : 'outlined'}
            onClick={() => setCurrentSection('predictive_models')}
            startIcon={<HistoryIcon />}
            sx={{ mr: 2, textTransform: 'none', color:'#004A8F' }}
          >
            Modelos
          </Button>
          <Button
            variant={currentSection === 'decision_center' ? 'contained' : 'outlined'}
            onClick={() => setCurrentSection('decision_center')}
            startIcon={<DecisionIcon />}
            sx={{ mr: 2, textTransform: 'none', color:'#004A8F' }}
          >
            Decisiones
          </Button>
          <Button
            variant={currentSection === 'behavior_prediction' ? 'contained' : 'outlined'}
            onClick={() => setCurrentSection('behavior_prediction')}
            startIcon={<BehaviorIcon />}
            sx={{ textTransform: 'none', color:'#004A8F' }}
          >
            Comportamientos
          </Button>
        </Box>

        {/* Sección: Análisis Predictivo de Ventas */}
        {currentSection === 'sales_prediction' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <TrendingUpIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Predicción de Ventas para {salesPredictionData.currentMonth}
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none', color:'#004A8F' }}>
                Recalcular Predicción
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: getPredictionCardColor(salesPredictionData.growthPercentage), border: `1px solid ${parseFloat(salesPredictionData.growthPercentage) > 0 ? '#a5d6a7' : '#ef9a9a'}` }}>
                  <Typography variant="h4" color="#2e7d32">${salesPredictionData.predictedSales.toLocaleString()}</Typography>
                  <Typography variant="subtitle1" color="#333">Ventas Predichas para {salesPredictionData.currentMonth}</Typography>
                  <Typography variant="body2" color="#616161">Intervalo de Confianza: {salesPredictionData.confidenceInterval}</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd', border: '1px solid #bbdefb' }}>
                  <Typography variant="h4" color="#1976d2">${salesPredictionData.lastMonthActualSales.toLocaleString()}</Typography>
                  <Typography variant="subtitle1" color="#333">Ventas Reales del Mes Anterior</Typography>
                  <Typography variant="body2" color="#616161">({new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('es-CO', { month: 'long', year: 'numeric' })})</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Card variant="outlined" sx={{ p: 2, textAlign: 'center', bgcolor: getPredictionCardColor(salesPredictionData.growthPercentage), border: `1px solid ${parseFloat(salesPredictionData.growthPercentage) > 0 ? '#a5d6a7' : '#ef9a9a'}` }}>
                  <Typography variant="h4" sx={{ color: parseFloat(salesPredictionData.growthPercentage) > 0 ? '#2e7d32' : '#d32f2f' }}>{salesPredictionData.growthPercentage}</Typography>
                  <Typography variant="subtitle1" color="#333">Crecimiento vs. Mes Anterior</Typography>
                  <Typography variant="body2" color="#616161">Basado en tendencias históricas</Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                    Factores Clave de Influencia
                  </Typography>
                  <List dense>
                    {salesPredictionData.keyFactors.map((factor, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {factor.impact.includes('Positivo') ? <CheckCircleOutlineIcon sx={{ color: '#4caf50' }} /> : <WarningIcon sx={{ color: '#ff9800' }} />}
                        </ListItemIcon>
                        <ListItemText primary={factor.name} secondary={`Impacto: ${factor.impact}`} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                    Pronóstico de Ventas Mensual
                  </Typography>
                  {/* Aquí iría un gráfico de líneas simulado */}
                  <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#eceff1', borderRadius: 1 }}>
                    <Typography color="#616161">Gráfico de Líneas (Ventas Reales vs. Predichas)</Typography>
                  </Box>
                  <TableContainer component={Paper} elevation={0} sx={{ mt: 2, border: '1px solid #e0e0e0' }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Mes</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Real</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Predicho</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salesPredictionData.monthlyForecast.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.month}</TableCell>
                            <TableCell>{item.actual ? `$${item.actual.toLocaleString()}` : 'N/A'}</TableCell>
                            <TableCell>${item.predicted.toLocaleString()}</TableCell>
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

        {/* Sección: Modelos Predictivos Basados en Historial */}
        {currentSection === 'predictive_models' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <HistoryIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Gestión de Modelos Predictivos
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                Actualizar Modelos
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Grid container spacing={3}>
              {predictiveModelsData.models.map((model) => (
                <Grid item xs={12} md={6} key={model.id}>
                  <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: `5px solid ${model.status === 'Activo' ? '#4caf50' : '#bdbdbd'}` }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <AutoAwesomeIcon sx={{ color: '#673ab7', mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                        {model.name}
                      </Typography>
                      <Chip label={model.status} size="small" color={model.status === 'Activo' ? 'success' : 'default'} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Tipo: {model.type} | Última Actualización: {model.lastUpdate}
                    </Typography>
                    <Typography variant="body1" color="#616161" sx={{ mb: 1 }}>
                      {model.description}
                    </Typography>
                    {model.status === 'Activo' && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Rendimiento Actual:</Typography>
                        {predictiveModelsData.modelPerformance[model.name]?.map((perf, idx) => (
                          <Box key={idx} display="flex" alignItems="center" mb={0.5}>
                            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>{perf.metric}:</Typography>
                            <LinearProgress
                              variant="determinate"
                              value={
                                perf.metric === 'MAE' || perf.metric === 'RMSE'
                                  ? (1 - (parseFloat(perf.value) / parseFloat(perf.target.replace(/[^0-9.]/g, '')))) * 100
                                  : parseFloat(perf.value) // For accuracy/precision/recall
                              }
                              sx={{ flexGrow: 1, mr: 1 }}
                              color={
                                perf.metric === 'MAE' || perf.metric === 'RMSE'
                                  ? (parseFloat(perf.value) <= parseFloat(perf.target.replace(/[^0-9.]/g, '')) ? 'success' : 'error')
                                  : (parseFloat(perf.value) >= parseFloat(perf.target.replace(/[^0-9.]/g, '')) ? 'success' : 'error')
                              }
                            />
                            <Typography variant="body2" color="#333" sx={{ fontWeight: 600 }}>{perf.value}</Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>Ver Detalles</Button>
                      <Button variant="contained" size="small" sx={{ textTransform: 'none', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>Entrenar Nuevo</Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Sección: Centro de Decisiones Asistidas por IA */}
        {currentSection === 'decision_center' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <DecisionIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Centro de Decisiones Asistidas por IA
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                Recargar Alertas
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
              Sugerencias y Alertas Automatizadas
            </Typography>
            <Grid container spacing={3}>
              {decisionCenterData.alerts.map((alert) => (
                <Grid item xs={12} md={6} key={alert.id}>
                  <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: `5px solid ${getSeverityColor(alert.severity)}` }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      {alert.type === 'Alerta' ? (
                        <NotificationsActiveIcon sx={{ color: getSeverityColor(alert.severity), mr: 1 }} />
                      ) : (
                        <CheckCircleOutlineIcon sx={{ color: '#4caf50', mr: 1 }} />
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                        {alert.title}
                      </Typography>
                      <Chip label={alert.severity} size="small" sx={{ bgcolor: getSeverityColor(alert.severity), color: 'white' }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Módulo Relacionado: {alert.relatedModule} | Tipo: {alert.type}
                    </Typography>
                    <Typography variant="body1" color="#616161" sx={{ mb: 2 }}>
                      {alert.description}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<HelpOutlineIcon />}
                      onClick={() => handleOpenAlertDialog(alert)}
                      sx={{ textTransform: 'none', bgcolor: '#ff9800', '&:hover': { bgcolor: '#ef6c00' } }}
                    >
                      Ver Acción Sugerida
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mt: 4, mb: 2 }}>
              Historial de Decisiones Asistidas
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 300 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Título de Alerta/Sugerencia</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Acción Tomada</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {decisionCenterData.decisionHistory.map((historyItem) => (
                    <TableRow key={historyItem.id}>
                      <TableCell>{historyItem.alertTitle}</TableCell>
                      <TableCell>{historyItem.actionTaken}</TableCell>
                      <TableCell>{historyItem.date}</TableCell>
                      <TableCell><Chip label={historyItem.status} size="small" color={historyItem.status === 'Resuelto' ? 'success' : 'primary'} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Sección: Predicción de Comportamientos */}
        {currentSection === 'behavior_prediction' && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <BehaviorIcon sx={{ color: '#673ab7', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Predicción de Comportamientos
              </Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                Recalcular Comportamientos
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

            <Grid container spacing={3}>
              {/* Riesgo de Abandono de Clientes (Churn Risk) */}
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                    Riesgo de Abandono de Clientes (Churn Risk)
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Riesgo</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Score (%)</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Acción Sugerida</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {behaviorPredictionData.customerChurnRisk.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>{customer.customer}</TableCell>
                            <TableCell><Chip label={customer.risk} size="small" sx={{ bgcolor: getRiskColor(customer.risk), color: 'white' }} /></TableCell>
                            <TableCell>{(customer.score * 100).toFixed(1)}</TableCell>
                            <TableCell>{customer.suggestedAction}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>

              {/* Recomendación de Productos/Servicios */}
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 2 }}>
                    Recomendación de Productos/Servicios
                  </Typography>
                  <List>
                    {behaviorPredictionData.productRecommendation.map((rec, index) => (
                      <ListItem key={index} divider>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                              Usuario: {rec.user}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Productos Recomendados: {rec.recommendedProducts.join(', ')}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Razón: {rec.reason}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>

      {/* Dialog para Ver Detalles de Alerta/Sugerencia del Centro de Decisiones */}
      {selectedAlert && (
        <Dialog open={openAlertDialog} onClose={handleCloseAlertDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333', borderBottom: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center">
              {selectedAlert.type === 'Alerta' ? (
                <NotificationsActiveIcon sx={{ color: getSeverityColor(selectedAlert.severity), mr: 1 }} />
              ) : (
                <CheckCircleOutlineIcon sx={{ color: '#4caf50', mr: 1 }} />
              )}
              {selectedAlert.title}
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Tipo: {selectedAlert.type} | Severidad: {selectedAlert.severity} | Módulo: {selectedAlert.relatedModule}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" color="#333" sx={{ mb: 2 }}>
              **Descripción:** {selectedAlert.description}
            </Typography>
            <Typography variant="body1" color="#d32f2f" sx={{ fontWeight: 600, mb: 2 }}>
              **ACCIÓN SUGERIDA POR IA:** {selectedAlert.actionSuggested}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Considera esta acción para mitigar el riesgo o capitalizar la oportunidad.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlertDialog} color="secondary">Cerrar</Button>
            <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
              Marcar como Gestionado
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default AIPrediction;