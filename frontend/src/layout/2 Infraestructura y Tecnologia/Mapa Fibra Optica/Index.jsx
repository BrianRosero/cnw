import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  List, ListItem, ListItemText, ListItemIcon,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home'; // Para volver al inicio
import PublicIcon from '@mui/icons-material/Public'; // Icono principal del módulo
import PlaceIcon from '@mui/icons-material/Place'; // Nodos
import LinkIcon from '@mui/icons-material/Link'; // Enlaces
import PolylineIcon from '@mui/icons-material/Polyline'; // Troncales
import InfoIcon from '@mui/icons-material/Info'; // Información
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Para Accordion
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Descargar
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'; // Tipo de enlace
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Estado de la fibra

import MapaImage from './Mapa.png';

// --- Datos Simulados de la Red de Fibra Óptica en Cali ---
const simulatedFiberData = {
  nodes: [
    { id: 'NODO-CA-001', name: 'Centro de Datos Principal (CDP)', type: 'Data Center', location: 'Cali, Comuna 2', lat: 3.4516, lon: -76.5320, status: 'Operativo', description: 'Punto central de interconexión con carriers.' },
    { id: 'NODO-CA-002', name: 'Estación G', type: 'POP', location: 'Cali, Granada', lat: 3.4600, lon: -76.5200, status: 'Operativo', description: 'Punto de Presencia (POP) para clientes corporativos.' },
    { id: 'NODO-CA-003', name: 'Nodo Sur Cali', type: 'POP', location: 'Cali, Ciudad Jardín', lat: 3.3750, lon: -76.5350, status: 'Operativo', description: 'Cubre la zona sur y universidades.' },
    { id: 'NODO-CA-004', name: 'Hub Industrial Yumbo', type: 'Industrial Hub', location: 'Yumbo, Zona Industrial', lat: 3.5300, lon: -76.5000, status: 'Alerta', description: 'Conexión a parques industriales, requiere revisión de energía.' },
  ],
  trunks: [
    { id: 'TRONCAL-001', name: 'CDP - Granada', length: '5.2 km', fiberCount: 144, capacity: '100 Gbps', status: 'Operativo', description: 'Troncal principal de alta capacidad.' },
    { id: 'TRONCAL-002', name: 'Granada - Sur Cali', length: '12.8 km', fiberCount: 96, capacity: '40 Gbps', status: 'Operativo', description: 'Conecta el norte con el sur de la ciudad.' },
    { id: 'TRONCAL-003', name: 'CDP - Yumbo', length: '9.0 km', fiberCount: 48, capacity: '10 Gbps', status: 'Alerta', description: 'Enlace dedicado a zona industrial, latencia elevada.' },
  ],
  links: [
    { id: 'ENLACE-A-001', name: 'Empresa A - Granada', type: 'Cliente Dedicado', connectedTo: 'NODO-CA-002', length: '0.8 km', service: '1 Gbps', status: 'Operativo', description: 'Conexión de fibra al cliente TechSolutions.' },
    { id: 'ENLACE-A-002', name: 'Torre B - Sur Cali', type: 'FTTH', connectedTo: 'NODO-CA-003', length: '0.3 km', service: 'GPON', status: 'Operativo', description: 'Enlace de última milla a edificio de apartamentos.' },
    { id: 'ENLACE-A-003', name: 'Planta C - Yumbo', type: 'Cliente Dedicado', connectedTo: 'NODO-CA-004', length: '1.5 km', service: '10 Gbps', status: 'Problema', description: 'Enlace crítico a planta de producción, intermitente.' },
    { id: 'ENLACE-A-004', name: 'Universidad - Sur Cali', type: 'Institucional', connectedTo: 'NODO-CA-003', length: '0.5 km', service: '5 Gbps', status: 'Operativo', description: 'Conexión a campus universitario.' },
  ],
};

function FiberOpticMap({ onGoToHome }) { // Recibe la prop para volver al inicio
  const [selectedElement, setSelectedElement] = useState(null); // Para mostrar detalles de un nodo, troncal o enlace

  const getStatusChip = (status) => {
    switch (status) {
      case 'Operativo': return <Chip label="Operativo" color="success" size="small" />;
      case 'Alerta': return <Chip label="Alerta" color="warning" size="small" />;
      case 'Problema': return <Chip label="Problema" color="error" size="small" />;
      default: return <Chip label="Desconocido" size="small" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#eef2f6', minHeight: '100vh', color: 'text.primary', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid rgba(129, 212, 250, 0.1)' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          {selectedElement && (
            <Tooltip title="Volver a la Vista General">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedElement(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon /> {/* Asume que ArrowBackIcon está importado o disponible */}
              </IconButton>
            </Tooltip>
          )}
          <PublicIcon sx={{ fontSize: 36, mr: 1, color: 'primary.light' }} />
          <Typography variant="h3" component="div" sx={{ color: '#fff', flexGrow: 1, fontWeight: 700, letterSpacing: '0.08em' }}>
            Mapa de Fibra Óptica
          </Typography>
          <Tooltip title="Buscar en el mapa">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Descargar datos">
            <IconButton color="inherit">
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#004a8f' }}>
            {selectedElement ? `Detalle de ${selectedElement.name}` : "Red de Fibra Óptica en Cali"}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {selectedElement ? "Información detallada sobre el elemento seleccionado." : "Vista georreferenciada de nodos, troncales y enlaces de tu infraestructura."}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Columna Principal del Mapa y Resumen */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={8} sx={{ p: 0, bgcolor: '#6eb5e1', minHeight: '70vh', border: '1px solid rgba(129, 212, 250, 0.2)' }}>
              <Box sx={{ p: 3, display: 'flex', alignItems: 'center', bgcolor: '#004a8f' }}>
                <PublicIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h3" sx={{ color: '#fff', flexGrow: 1 }}>Vista Georreferenciada</Typography>
                <Chip label="Cali, Colombia" color="primary" variant="outlined" size="small" />
              </Box>
              <Divider sx={{ bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
              <Box
                sx={{
                  height: '60vh', // Altura del área del mapa
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#ffffff', // Fondo para simular el mapa
                  color: 'text.secondary',
                  fontSize: '1.2rem',
                  p: 3,
                  flexDirection: 'column',
                }}
              >
                {/* --- AQUÍ IRÍA LA INTEGRACIÓN DEL MAPA INTERACTIVO REAL --- */}
                {/*<Typography variant="h5" sx={{ mb: 2, color: 'primary.light' }}>*/}
                {/*  **Mapa Interactivo (Requiere Integración Externa)***/}
                {/*</Typography>*/}
                {/*<Typography variant="body1" align="center">*/}
                {/*  Este espacio mostraría un mapa con nodos, troncales y enlaces georreferenciados.*/}
                {/*</Typography>*/}
                {/*<Typography variant="caption" align="center" sx={{ mt: 1 }}>*/}
                {/*  Librerías como Leaflet, Mapbox GL JS, o la API de Google Maps con capas personalizadas serían necesarias aquí.*/}
                {/*</Typography>*/}
                <img
                  src={MapaImage} // Usa la variable importada aquí
                  alt="Mapa de Cali con Fibra Óptica"
                  style={{ maxWidth: '99%', height: 'auto', borderRadius: '8px', mt: 3 }}
                />
              </Box>
              <Box sx={{ p: 3, bgcolor: '#ffffff', borderTop: '1px solid rgba(129, 212, 250, 0.1)' }}>
                <Typography variant="h4" gutterBottom>Resumen de Estado</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Chip label={`Nodos: ${simulatedFiberData.nodes.length}`} color="primary" />
                  </Grid>
                  <Grid item xs={4}>
                    <Chip label={`Troncales: ${simulatedFiberData.trunks.length}`} color="primary" />
                  </Grid>
                  <Grid item xs={4}>
                    <Chip label={`Enlaces: ${simulatedFiberData.links.length}`} color="primary" />
                  </Grid>
                  <Grid item xs={12}>
                    <Chip label={`Alertas Activas: ${simulatedFiberData.nodes.filter(n => n.status !== 'Operativo').length + simulatedFiberData.trunks.filter(t => t.status !== 'Operativo').length + simulatedFiberData.links.filter(l => l.status !== 'Operativo').length}`} color="error" />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Columna de Detalles y Listas */}
          <Grid item xs={12} lg={4}>
            {selectedElement ? (
              <Paper elevation={8} sx={{ p: 3, bgcolor: '#b6cfe6', minHeight: '70vh', border: '1px solid rgba(129, 212, 250, 0.2)' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <InfoIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1 }}>Detalles del Elemento</Typography>
                </Box>
                <Divider sx={{ mb: 2, bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
                <Typography variant="h6" sx={{ color: 'primary.light', mb: 1 }}>{selectedElement.name}</Typography>
                {getStatusChip(selectedElement.status)}
                <List dense sx={{ mt: 2 }}>
                  {selectedElement.type && <ListItem><ListItemIcon><PlaceIcon color="info" /></ListItemIcon><ListItemText primary="Tipo" secondary={selectedElement.type} /></ListItem>}
                  {selectedElement.location && <ListItem><ListItemIcon><PlaceIcon color="action" /></ListItemIcon><ListItemText primary="Ubicación" secondary={selectedElement.location} /></ListItem>}
                  {selectedElement.length && <ListItem><ListItemIcon><PolylineIcon color="action" /></ListItemIcon><ListItemText primary="Longitud" secondary={selectedElement.length} /></ListItem>}
                  {selectedElement.fiberCount && <ListItem><ListItemIcon><FiberManualRecordIcon color="action" /></ListItemIcon><ListItemText primary="Hilos de Fibra" secondary={selectedElement.fiberCount} /></ListItem>}
                  {selectedElement.capacity && <ListItem><ListItemIcon><SettingsEthernetIcon color="action" /></ListItemIcon><ListItemText primary="Capacidad" secondary={selectedElement.capacity} /></ListItem>}
                  {selectedElement.connectedTo && <ListItem><ListItemIcon><LinkIcon color="action" /></ListItemIcon><ListItemText primary="Conectado a" secondary={selectedElement.connectedTo} /></ListItem>}
                  {selectedElement.service && <ListItem><ListItemIcon><LinkIcon color="action" /></ListItemIcon><ListItemText primary="Servicio Asociado" secondary={selectedElement.service} /></ListItem>}
                  {selectedElement.description && <ListItem><ListItemIcon><InfoIcon color="action" /></ListItemIcon><ListItemText primary="Descripción" secondary={selectedElement.description} /></ListItem>}
                  {selectedElement.lat && selectedElement.lon && (
                    <ListItem>
                      <ListItemIcon><PublicIcon color="action" /></ListItemIcon>
                      <ListItemText primary="Coordenadas" secondary={`Lat: ${selectedElement.lat}, Lon: ${selectedElement.lon}`} />
                    </ListItem>
                  )}
                </List>
                <Button variant="outlined" startIcon={<SearchIcon />} sx={{ mt: 3, borderColor: 'primary.main', color: 'primary.main' }}>
                  Ver en Mapa (Simulado)
                </Button>
              </Paper>
            ) : (
              <Box>
                {/* Sección de Nodos */}
                <Paper elevation={8} sx={{ p: 3, mb: 3, bgcolor: '#004a8f', border: '1px solid rgba(129, 212, 250, 0.2)' }}>
                  <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />} aria-controls="nodes-content" id="nodes-header">
                      <Box display="flex" alignItems="center">
                        <PlaceIcon sx={{ color: 'primary.main', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1 }}>Nodos ({simulatedFiberData.nodes.length})</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider sx={{ mb: 2, bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
                      <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {simulatedFiberData.nodes.map(node => (
                          <ListItem key={node.id} onClick={() => setSelectedElement(node)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(129, 212, 250, 0.05)' } }}>
                            <ListItemIcon><PlaceIcon color="info" /></ListItemIcon>
                            <ListItemText primary={node.name} secondary={`${node.type} - ${node.location}`} />
                            {getStatusChip(node.status)}
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Paper>

                {/* Sección de Troncales */}
                <Paper elevation={8} sx={{ p: 3, mb: 3, bgcolor: '#004a8f', border: '1px solid rgba(129, 212, 250, 0.2)' }}>
                  <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />} aria-controls="trunks-content" id="trunks-header">
                      <Box display="flex" alignItems="center">
                        <PolylineIcon sx={{ color: 'primary.main', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1 }}>Troncales ({simulatedFiberData.trunks.length})</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider sx={{ mb: 2, bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
                      <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {simulatedFiberData.trunks.map(trunk => (
                          <ListItem key={trunk.id} onClick={() => setSelectedElement(trunk)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(129, 212, 250, 0.05)' } }}>
                            <ListItemIcon><PolylineIcon color="primary" /></ListItemIcon>
                            <ListItemText primary={trunk.name} secondary={`${trunk.length} - ${trunk.fiberCount} hilos`} />
                            {getStatusChip(trunk.status)}
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Paper>

                {/* Sección de Enlaces */}
                <Paper elevation={8} sx={{ p: 3, bgcolor: '#004a8f', border: '1px solid rgba(129, 212, 250, 0.2)' }}>
                  <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />} aria-controls="links-content" id="links-header">
                      <Box display="flex" alignItems="center">
                        <LinkIcon sx={{ color: 'primary.main', mr: 1 }} />
                        <Typography variant="h5" sx={{ flexGrow: 1 }}>Enlaces ({simulatedFiberData.links.length})</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider sx={{ mb: 2, bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
                      <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {simulatedFiberData.links.map(link => (
                          <ListItem key={link.id} onClick={() => setSelectedElement(link)} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(129, 212, 250, 0.05)' } }}>
                            <ListItemIcon><LinkIcon color="secondary" /></ListItemIcon>
                            <ListItemText primary={link.name} secondary={`${link.type} - ${link.service}`} />
                            {getStatusChip(link.status)}
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FiberOpticMap;