import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, ListItemIcon,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions,
  LinearProgress,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import HandshakeIcon from '@mui/icons-material/Handshake'; // Icono principal de Gestión Comercial
import DescriptionIcon from '@mui/icons-material/Description'; // Contratos
import AssignmentIcon from '@mui/icons-material/Assignment'; // Propuestas
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Ofertas
import HowToRegIcon from '@mui/icons-material/HowToReg'; // Firma electrónica
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Accordion
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Añadir
import EditIcon from '@mui/icons-material/Edit'; // Editar
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver detalles
import PrintIcon from '@mui/icons-material/Print'; // Imprimir/Generar PDF
import SendIcon from '@mui/icons-material/Send'; // Enviar
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Aceptado/Firmado
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Pendiente
import GppGoodIcon from '@mui/icons-material/GppGood';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Seguridad/Legal

// --- Datos Simulados de Gestión Comercial ---
const simulatedCommercialData = {
  contracts: [
    { id: 'CON-001', client: 'TechSolutions S.A.S.', type: 'SLA Premium', status: 'Activo', startDate: '2025-01-01', endDate: '2026-12-31', value: 12000, signedDate: '2024-12-28', signedBy: 'Ana García (Cliente)', electronicSignature: true, terms: 'Términos y condiciones estándar para SLA Premium.' },
    { id: 'CON-002', client: 'GlobalLogistics Ltda.', type: 'Servicios IoT', status: 'En Renovación', startDate: '2024-06-01', endDate: '2025-05-31', value: 7500, signedDate: '2024-05-20', signedBy: 'Carlos Pérez (Cliente)', electronicSignature: true, terms: 'Renovación automática sujeta a revisión de tarifas.' },
    { id: 'CON-003', client: 'InnovateCorp.', type: 'Consultoría Estratégica', status: 'Finalizado', startDate: '2024-03-01', endDate: '2024-08-31', value: 5000, signedDate: '2024-02-25', signedBy: 'María López (Cliente)', electronicSignature: false, terms: 'Proyecto entregado, no renovado.' },
    { id: 'CON-004', client: 'Constructora Alfa', type: 'Licencia Software', status: 'Activo', startDate: '2025-03-15', endDate: '2026-03-14', value: 3000, signedDate: '2025-03-10', signedBy: 'Gerente General (Cliente)', electronicSignature: true, terms: 'Licencia anual de uso.' },
  ],
  proposals: [
    { id: 'PRP-001', client: 'TechSolutions S.A.S.', title: 'Propuesta de Solución IA', value: 50000, stage: 'Negociando', sentDate: '2025-06-05', lastUpdate: '2025-06-10', salesRep: 'Juan Pérez', notes: 'Cliente solicitó ajustes en el alcance y precio.', attachments: ['Propuesta_IA_v2.pdf'] },
    { id: 'PRP-002', client: 'Distribuidora Beta', title: 'Oferta de Servicios Cloud', value: 15000, stage: 'Enviada', sentDate: '2025-06-10', lastUpdate: '2025-06-10', salesRep: 'María Gómez', notes: 'Esperando feedback inicial del cliente.', attachments: ['Oferta_Cloud_v1.pdf'] },
    { id: 'PRP-003', client: 'Agencia Creativa XYZ', title: 'Diseño Web Corporativo', value: 8000, stage: 'Aceptada', sentDate: '2025-05-20', lastUpdate: '2025-05-25', salesRep: 'Juan Pérez', notes: 'Aceptada, esperando firma de contrato.', attachments: ['Propuesta_Web_final.pdf'] },
    { id: 'PRP-004', client: 'Servicios Médicos SAS', title: 'Migración a Office 365', value: 20000, stage: 'Rechazada', sentDate: '2025-04-01', lastUpdate: '2025-04-15', salesRep: 'Pedro Rojas', notes: 'Cliente optó por otra solución de menor costo.', attachments: ['Propuesta_O365.pdf'] },
  ],
  standardContracts: [
    { id: 'STD-CON-001', name: 'Contrato de Nivel de Servicio (SLA) Básico', description: 'Plantilla base para acuerdos de nivel de servicio.', version: '1.2', lastModified: '2024-11-01', filePath: '/templates/sla_basico.docx' },
    { id: 'STD-CON-002', name: 'Acuerdo de Confidencialidad (NDA)', description: 'Plantilla estándar para acuerdos de no divulgación.', version: '1.0', lastModified: '2023-08-15', filePath: '/templates/nda.pdf' },
    { id: 'STD-CON-003', name: 'Contrato de Consultoría TI', description: 'Plantilla para proyectos de consultoría tecnológica.', version: '2.1', lastModified: '2025-01-20', filePath: '/templates/consultoria_ti.docx' },
  ],
  commercialOffers: [
    { id: 'OFR-001', name: 'Pack Inicio Digital', description: 'Oferta especial para Pymes: hosting + dominio + email.', price: 150, validity: '30 días', terms: 'Términos de oferta promocional.', templatePath: '/templates/oferta_pymes.pdf' },
    { id: 'OFR-002', name: 'Solución Cloud Empresarial', description: 'Paquete completo de servicios cloud para grandes empresas.', price: 'Personalizado', validity: '60 días', terms: 'Basado en cotización final.', templatePath: '/templates/oferta_cloud_emp.pdf' },
  ]
};

function CommercialManagement({ onGoToHome }) {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [openNewContractDialog, setOpenNewContractDialog] = useState(false);
  const [newContractData, setNewContractData] = useState({ client: '', type: '', value: '', startDate: '', endDate: '' });

  // Función para obtener el chip de estado de propuesta
  const getProposalStatusChip = (stage) => {
    switch (stage) {
      case 'Enviada': return <Chip label="Enviada" color="primary" size="small" icon={<SendIcon fontSize="small" />} />;
      case 'Negociando': return <Chip label="Negociando" color="warning" size="small" icon={<AccessTimeIcon fontSize="small" />} />;
      case 'Aceptada': return <Chip label="Aceptada" color="success" size="small" icon={<CheckCircleOutlineIcon fontSize="small" />} />;
      case 'Rechazada': return <Chip label="Rechazada" color="error" size="small" icon={<ErrorOutlineIcon fontSize="small" />} />;
      default: return <Chip label={stage} size="small" />;
    }
  };

  // Función para obtener el chip de estado de contrato
  const getContractStatusChip = (status) => {
    switch (status) {
      case 'Activo': return <Chip label="Activo" color="success" size="small" />;
      case 'En Renovación': return <Chip label="En Renovación" color="warning" size="small" />;
      case 'Finalizado': return <Chip label="Finalizado" color="default" size="small" />;
      default: return <Chip label={status} size="small" />;
    }
  };

  // Contadores para el Dashboard
  const totalContracts = simulatedCommercialData.contracts.length;
  const activeContracts = simulatedCommercialData.contracts.filter(c => c.status === 'Activo').length;
  const proposalsSent = simulatedCommercialData.proposals.length;
  const proposalsAccepted = simulatedCommercialData.proposals.filter(p => p.stage === 'Aceptada').length;
  const totalProposalsValue = simulatedCommercialData.proposals.reduce((acc, p) => acc + p.value, 0);

  const handleOpenNewContractDialog = () => {
    setOpenNewContractDialog(true);
  };

  const handleCloseNewContractDialog = () => {
    setOpenNewContractDialog(false);
    setNewContractData({ client: '', type: '', value: '', startDate: '', endDate: '' });
  };

  const handleSaveNewContract = () => {
    // Simular guardado del contrato (en una app real, esto iría a una API)
    if (newContractData.client && newContractData.type && newContractData.value) {
      const newId = `CON-${(simulatedCommercialData.contracts.length + 1).toString().padStart(3, '0')}`;
      const newContract = {
        id: newId,
        status: 'Pendiente Firma', // Nuevo contrato siempre empieza pendiente
        signedDate: 'N/A',
        signedBy: 'N/A',
        electronicSignature: false,
        terms: 'Términos por definir',
        ...newContractData,
      };
      simulatedCommercialData.contracts.unshift(newContract); // Añadir al inicio para que se vea
      alert(`Contrato ${newId} para ${newContractData.client} creado con éxito.`);
      handleCloseNewContractDialog();
    } else {
      alert('Por favor, completa los campos obligatorios.');
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
          {selectedProposal && (
            <Tooltip title="Volver a la Lista de Propuestas">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedProposal(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon sx={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          )}
          <HandshakeIcon sx={{ fontSize: 36, mr: 1, color: '#004d40' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#424242' }}>
            Gestión Comercial
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#004d40' }}>
            {selectedProposal ? `Detalle de Propuesta: ${selectedProposal.title}` : "Ciclo de Vida de Ventas y Contratos"}
          </Typography>
          <Typography variant="h6" color="#616161">
            {selectedProposal ? "Información detallada y seguimiento de la propuesta." : "Gestiona contratos, propuestas, ofertas y el proceso de firma electrónica."}
          </Typography>
        </Box>

        {/* Dashboard de Resumen Comercial (si no hay propuesta seleccionada) */}
        {!selectedProposal && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <HandshakeIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Resumen del Área Comercial
              </Typography>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#bdbdbd' }}>
                  <DescriptionIcon sx={{ fontSize: 40, color: '#004d40' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{totalContracts}</Typography>
                  <Typography variant="subtitle1" color="#616161">Contratos Totales</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#2e7d32' }}>
                  <DescriptionIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{activeContracts}</Typography>
                  <Typography variant="subtitle1" color="#616161">Contratos Activos</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#ff8f00' }}>
                  <AssignmentIcon sx={{ fontSize: 40, color: '#ff8f00' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{proposalsSent}</Typography>
                  <Typography variant="subtitle1" color="#616161">Propuestas Enviadas</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: '#1976d2' }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                  <Typography variant="h4" sx={{ mt: 1, color: '#333' }}>{proposalsAccepted}</Typography>
                  <Typography variant="subtitle1" color="#616161">Propuestas Aceptadas</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="#333" sx={{ mt: 2 }}>Valor Total de Propuestas Activas:</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                  ${totalProposalsValue.toLocaleString('es-CO')} COP
                </Typography>
                <LinearProgress variant="determinate" value={(totalProposalsValue / 200000) * 100} sx={{ height: 10, borderRadius: 5, mt: 1, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#2e7d32' } }} /> {/* Escala arbitraria */}
                <Typography variant="caption" color="#616161">Basado en propuestas con valor y no rechazadas</Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Sección de Contratos Estandarizados y Activos (si no hay propuesta seleccionada) */}
        {!selectedProposal && (
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Contratos Activos */}
            <Grid item xs={12} md={7}>
              <Paper elevation={4} sx={{ p: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <DescriptionIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Contratos Activos
                  </Typography>
                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenNewContractDialog}>
                    Nuevo Contrato
                  </Button>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 400 }}>
                  <Table aria-label="contratos table" stickyHeader>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Cliente</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Estado</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Valor Anual</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, color: '#424242' }}>Firma Electrónica</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {simulatedCommercialData.contracts.map((contract) => (
                        <TableRow key={contract.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                          <TableCell sx={{ color: '#333' }}>{contract.id}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{contract.client}</TableCell>
                          <TableCell sx={{ color: '#333' }}>{contract.type}</TableCell>
                          <TableCell>{getContractStatusChip(contract.status)}</TableCell>
                          <TableCell align="right" sx={{ color: '#333' }}>${contract.value.toLocaleString('es-CO')}</TableCell>
                          <TableCell align="center">
                            {contract.electronicSignature ? <CheckCircleOutlineIcon color="success" /> : <AccessTimeIcon color="action" />}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Ver Detalles">
                              <IconButton color="primary" size="small"><VisibilityIcon /></IconButton>
                            </Tooltip>
                            <Tooltip title="Editar Contrato">
                              <IconButton color="info" size="small"><EditIcon /></IconButton>
                            </Tooltip>
                            <Tooltip title="Generar PDF">
                              <IconButton color="action" size="small"><PrintIcon /></IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Contratos Estandarizados y Ofertas Comerciales */}
            <Grid item xs={12} md={5}>
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="standard-contracts-content" id="standard-contracts-header">
                    <GppGoodIcon sx={{ color: '#004d40', mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Contratos Estandarizados
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                    <List dense sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      {simulatedCommercialData.standardContracts.map((contract) => (
                        <ListItem key={contract.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                          <ListItemIcon><DescriptionIcon color="action" /></ListItemIcon>
                          <ListItemText primary={contract.name} secondary={`Versión: ${contract.version} - Última Mod: ${contract.lastModified}`} primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                          <Button size="small" variant="outlined" startIcon={<PrintIcon />} sx={{ textTransform: 'none' }}>Descargar</Button>
                        </ListItem>
                      ))}
                    </List>
                    <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#004d40' }}>
                      Subir Nueva Plantilla
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Paper>

              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Accordion elevation={0} sx={{ bgcolor: 'transparent' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#424242' }} />} aria-controls="commercial-offers-content" id="commercial-offers-header">
                    <AttachMoneyIcon sx={{ color: '#004d40', mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Ofertas Comerciales
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                    <List dense sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      {simulatedCommercialData.commercialOffers.map((offer) => (
                        <ListItem key={offer.id} sx={{ '&:hover': { bgcolor: '#f0f0f0' } }}>
                          <ListItemIcon><AttachMoneyIcon color="action" /></ListItemIcon>
                          <ListItemText primary={offer.name} secondary={`Precio: ${offer.price} - Validez: ${offer.validity}`} primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} />
                          <Button size="small" variant="outlined" startIcon={<PrintIcon />} sx={{ textTransform: 'none' }}>Generar</Button>
                        </ListItem>
                      ))}
                    </List>
                    <Button variant="text" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2, textTransform: 'none', color: '#004d40' }}>
                      Nueva Oferta / Promoción
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Sección de Propuestas y Seguimiento (si no hay propuesta seleccionada) */}
        {!selectedProposal && (
          <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <AssignmentIcon sx={{ color: '#004d40', fontSize: 30, mr: 1 }} />
              <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                Seguimiento de Propuestas
              </Typography>
              <Button variant="contained" startIcon={<AddCircleOutlineIcon />} color="primary" sx={{ textTransform: 'none' }}>
                Nueva Propuesta
              </Button>
            </Box>
            <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 500 }}>
              <Table aria-label="propuestas table" stickyHeader>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Cliente</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Título</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Valor</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Etapa</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Fecha Envío</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#424242' }}>Comercial</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: '#424242' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {simulatedCommercialData.proposals.map((proposal) => (
                    <TableRow key={proposal.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f0f0f0' } }}>
                      <TableCell sx={{ color: '#333' }}>{proposal.id}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{proposal.client}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{proposal.title}</TableCell>
                      <TableCell align="right" sx={{ color: '#333' }}>${proposal.value.toLocaleString('es-CO')}</TableCell>
                      <TableCell>{getProposalStatusChip(proposal.stage)}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{proposal.sentDate}</TableCell>
                      <TableCell sx={{ color: '#333' }}>{proposal.salesRep}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Ver Detalles de Propuesta">
                          <IconButton onClick={() => setSelectedProposal(proposal)} color="primary" size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar Propuesta">
                          <IconButton color="info" size="small">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Propuesta">
                          <IconButton color="error" size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Detalle de Propuesta (Si hay una propuesta seleccionada) */}
        {selectedProposal && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ p: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <AssignmentIcon sx={{ color: '#004d40', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Información de la Propuesta
                  </Typography>
                  <Tooltip title="Editar Propuesta">
                    <IconButton color="info" size="small"><EditIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="ID de Propuesta" secondary={selectedProposal.id} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Cliente" secondary={selectedProposal.client} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Título" secondary={selectedProposal.title} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Valor" secondary={`$${selectedProposal.value.toLocaleString('es-CO')} COP`} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Etapa" secondary={getProposalStatusChip(selectedProposal.stage)} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} /></ListItem>
                  <ListItem><ListItemText primary="Fecha de Envío" secondary={selectedProposal.sentDate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Última Actualización" secondary={selectedProposal.lastUpdate} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="Comercial Asignado" secondary={selectedProposal.salesRep} primaryTypographyProps={{ fontWeight: 600, color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                </List>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Notas Adicionales</Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={selectedProposal.notes}
                    InputProps={{ readOnly: true }}
                    sx={{ bgcolor: '#f8f8f8', '.MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' } }}
                  />
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 1 }}>Adjuntos</Typography>
                  <List dense>
                    {selectedProposal.attachments && selectedProposal.attachments.length > 0 ? (
                      selectedProposal.attachments.map((file, index) => (
                        <ListItem key={index} sx={{ p: 0.5 }}>
                          <ListItemIcon><AttachFileIcon color="action" /></ListItemIcon>
                          <ListItemText primary={file} primaryTypographyProps={{ color: '#333' }} />
                          <Button size="small" variant="text" sx={{ textTransform: 'none' }}>Descargar</Button>
                        </ListItem>
                      ))
                    ) : (
                      <Typography variant="body2" color="#616161">No hay archivos adjuntos.</Typography>
                    )}
                  </List>
                  <Button variant="text" startIcon={<AttachFileIcon />} sx={{ mt: 1, textTransform: 'none', color: '#004d40' }}>
                    Subir Nuevo Archivo
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Sección de Firma Electrónica Integrada (Simulada) */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <HowToRegIcon sx={{ color: '#004d40', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Firma Electrónica Integrada
                  </Typography>
                  <Tooltip title="Configuración de Firma">
                    <IconButton color="action" size="small"><SettingsIcon /></IconButton> {/* Asume SettingsIcon */}
                  </Tooltip>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <Typography variant="body1" color="#333" sx={{ mb: 2 }}>
                  Estado de Firma para esta propuesta:
                  <Chip
                    label={selectedProposal.stage === 'Aceptada' ? 'Listo para Firmar' : selectedProposal.stage === 'Cerrada - Firmada' ? 'Firmado Electrónicamente' : 'No Aplicable'}
                    color={selectedProposal.stage === 'Aceptada' ? 'warning' : selectedProposal.stage === 'Cerrada - Firmada' ? 'success' : 'default'}
                    sx={{ ml: 1 }}
                  />
                </Typography>
                {selectedProposal.stage === 'Aceptada' && (
                  <Box>
                    <Typography variant="body2" color="#616161" sx={{ mb: 2 }}>
                      La propuesta ha sido aceptada. Puedes iniciar el proceso de firma electrónica aquí.
                    </Typography>
                    <Button variant="contained" startIcon={<HowToRegIcon />} color="primary" sx={{ mr: 2, textTransform: 'none' }}>
                      Enviar para Firma
                    </Button>
                    <Button variant="outlined" startIcon={<PrintIcon />} sx={{ textTransform: 'none' }}>
                      Generar Documento Final
                    </Button>
                  </Box>
                )}
                {selectedProposal.stage === 'Cerrada - Firmada' && (
                  <Box>
                    <Typography variant="body2" color="#616161" sx={{ mb: 2 }}>
                      Este documento ya ha sido firmado electrónicamente el {new Date().toLocaleDateString('es-CO')}.
                    </Typography>
                    <Button variant="contained" startIcon={<GppGoodIcon />} color="success" sx={{ mr: 2, textTransform: 'none' }}>
                      Ver Certificado de Firma
                    </Button>
                  </Box>
                )}
                <Typography variant="caption" color="#616161" sx={{ mt: 3, display: 'block' }}>
                  *La integración con un proveedor de firma electrónica (ej. DocuSign, Adobe Sign) sería necesaria para esta funcionalidad real.
                </Typography>
              </Paper>

              {/* Historial de Etapas de la Propuesta */}
              <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <AccessTimeIcon sx={{ color: '#004d40', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Historial de Etapas
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: '#e0e0e0' }} />
                <List dense>
                  <ListItem><ListItemText primary="2025-06-10 - Negociando" secondary="Ajustes en el alcance y precio, esperando feedback." primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="2025-06-05 - Enviada" secondary="Propuesta inicial enviada al cliente." primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                  <ListItem><ListItemText primary="2025-06-01 - En Preparación" secondary="Documento interno en desarrollo por el equipo comercial." primaryTypographyProps={{ color: '#333' }} secondaryTypographyProps={{ color: '#616161' }} /></ListItem>
                </List>
                <Button variant="text" startIcon={<EditIcon />} sx={{ mt: 2, textTransform: 'none', color: '#004d40' }}>
                  Actualizar Etapa
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Dialog para Nuevo Contrato */}
      <Dialog open={openNewContractDialog} onClose={handleCloseNewContractDialog}>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>Crear Nuevo Contrato</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            margin="normal"
            label="Cliente"
            fullWidth
            value={newContractData.client}
            onChange={(e) => setNewContractData({ ...newContractData, client: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Tipo de Contrato"
            fullWidth
            value={newContractData.type}
            onChange={(e) => setNewContractData({ ...newContractData, type: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Valor Anual (COP)"
            type="number"
            fullWidth
            value={newContractData.value}
            onChange={(e) => setNewContractData({ ...newContractData, value: parseFloat(e.target.value) || '' })}
          />
          <TextField
            margin="normal"
            label="Fecha de Inicio"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newContractData.startDate}
            onChange={(e) => setNewContractData({ ...newContractData, startDate: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Fecha de Fin"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newContractData.endDate}
            onChange={(e) => setNewContractData({ ...newContractData, endDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseNewContractDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleSaveNewContract} variant="contained" color="primary">Guardar Contrato</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CommercialManagement;