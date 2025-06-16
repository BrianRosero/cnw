import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, AppBar, Toolbar, List, ListItem, ListItemText,
  Accordion, AccordionSummary, AccordionDetails, LinearProgress
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home'; // Para volver al inicio
import WifiTetheringIcon from '@mui/icons-material/WifiTethering'; // Icono principal del módulo
import CableIcon from '@mui/icons-material/Cable'; // Enlaces físicos
import CloudCircleIcon from '@mui/icons-material/CloudCircle'; // Enlaces virtuales
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // VPNs y túneles
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'; // Tráfico
import ArchitectureIcon from '@mui/icons-material/Architecture'; // Arquitectura tecnológica
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Para Accordion
import PersonIcon from '@mui/icons-material/Person'; // Cliente individual
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icono de expansión para clientes
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Para tráfico
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemIcon from '@mui/material/ListItemIcon';

// --- Datos Simulados de Clientes y Conexiones ---
const simulatedClients = [
  {
    id: 'CLI001',
    name: 'TechSolutions S.A.S.',
    contact: 'Ana García',
    email: 'ana.garcia@techsolutions.com',
    status: 'Activo',
    connections: [
      {
        id: 'CON001',
        type: 'Enlace Físico',
        service: 'Fibra Óptica 1Gbps',
        status: 'Activo',
        location: 'Rack A1, Puerto 12',
        vpn: null,
        traffic: { in: 750, out: 680, unit: 'Mbps' },
        currentTraffic: { in: 450, out: 380, unit: 'Mbps' }, // Tráfico actual
      },
      {
        id: 'CON002',
        type: 'VPN IPsec',
        service: 'VPN Sitio-a-Sitio',
        status: 'Activo',
        location: 'FW-Edge-01',
        vpn: { localIP: '10.0.0.1', remoteIP: '203.0.113.5', encryption: 'AES-256' },
        traffic: { in: 120, out: 90, unit: 'Mbps' },
        currentTraffic: { in: 70, out: 55, unit: 'Mbps' },
      },
      {
        id: 'CON003',
        type: 'Túnel GRE',
        service: 'Acceso a Nube Privada',
        status: 'Activo',
        location: 'Router Core-03',
        vpn: { localIP: '10.0.0.5', remoteIP: '198.51.100.10', encryption: 'None' },
        traffic: { in: 30, out: 25, unit: 'Mbps' },
        currentTraffic: { in: 18, out: 15, unit: 'Mbps' },
      },
    ],
    architecture: {
      diagram: 'URL_TO_DIAGRAM_CLI001.png',
      description: 'Conexión primaria a través de fibra dedicada con redundancia BGP. VPN IPsec para acceso seguro a recursos internos. Túnel GRE para interconexión con servicios específicos de nube privada.',
      notes: 'Requiere revisión de uso de ancho de banda para Q3.',
    },
  },
  {
    id: 'CLI002',
    name: 'GlobalLogistics Ltda.',
    contact: 'Carlos Pérez',
    email: 'carlos.perez@globallogistics.com',
    status: 'Activo',
    connections: [
      {
        id: 'CON004',
        type: 'Enlace Virtual',
        service: 'VLAN dedicada (MPLS)',
        status: 'Activo',
        location: 'Switch Core-05, VLAN 500',
        vpn: null,
        traffic: { in: 500, out: 450, unit: 'Mbps' },
        currentTraffic: { in: 300, out: 280, unit: 'Mbps' },
      },
      {
        id: 'CON005',
        type: 'VPN SSL',
        service: 'Acceso Remoto para Empleados',
        status: 'Activo',
        location: 'VPN Gateway-02',
        vpn: { localIP: '192.168.1.1', remoteIP: 'Dynamic', encryption: 'TLSv1.2' },
        traffic: { in: 80, out: 60, unit: 'Mbps' },
        currentTraffic: { in: 40, out: 30, unit: 'Mbps' },
      },
    ],
    architecture: {
      diagram: 'URL_TO_DIAGRAM_CLI002.png',
      description: 'Conexión principal a través de VLAN dedicada sobre infraestructura MPLS. VPN SSL para acceso remoto de empleados y partners.',
      notes: 'Monitorear picos de tráfico durante horarios de cierre.',
    },
  },
  {
    id: 'CLI003',
    name: 'InnovateCorp.',
    contact: 'María López',
    email: 'maria.lopez@innovatecorp.net',
    status: 'Problema',
    connections: [
      {
        id: 'CON006',
        type: 'Enlace Físico',
        service: 'Ethernet Dedicado 500Mbps',
        status: 'Degradado',
        location: 'Rack B2, Puerto 20',
        vpn: null,
        traffic: { in: 200, out: 180, unit: 'Mbps' },
        currentTraffic: { in: 100, out: 90, unit: 'Mbps' },
      },
    ],
    architecture: {
      diagram: 'URL_TO_DIAGRAM_CLI003.png',
      description: 'Enlace dedicado principal. No hay VPNs activas con el Data Center.',
      notes: 'Problema de latencia reportado. Revisar fibra y equipo en Rack B2.',
    },
  },
];

function ClientConnectionManagement({ onGoToHome }) { // Recibe la prop para volver al inicio
  const [selectedClient, setSelectedClient] = useState(null); // Para mostrar detalles de un cliente
  const [trafficData, setTrafficData] = useState([]); // Para simular tráfico en tiempo real

  // Simulación de tráfico en tiempo real para todas las conexiones
  useEffect(() => {
    let interval;
    if (selectedClient) {
      interval = setInterval(() => {
        const updatedTraffic = selectedClient.connections.map(conn => {
          const newIn = Math.min(conn.traffic.in * 0.8, Math.max(conn.traffic.in * 0.2, conn.currentTraffic.in + (Math.random() > 0.5 ? 10 : -10)));
          const newOut = Math.min(conn.traffic.out * 0.8, Math.max(conn.traffic.out * 0.2, conn.currentTraffic.out + (Math.random() > 0.5 ? 8 : -8)));
          return {
            ...conn,
            currentTraffic: { in: newIn, out: newOut, unit: conn.traffic.unit }
          };
        });
        setSelectedClient(prevClient => ({
          ...prevClient,
          connections: updatedTraffic
        }));
      }, 3000); // Actualiza cada 3 segundos
    }

    return () => clearInterval(interval);
  }, [selectedClient]);


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#919191', minHeight: '100vh', color: 'text.primary', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a', borderBottom: '1px solid rgba(129, 212, 250, 0.1)' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2 }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          {selectedClient && (
            <Tooltip title="Volver a Clientes">
              <IconButton edge="start" color="inherit" aria-label="back" onClick={() => setSelectedClient(null)} sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          <WifiTetheringIcon sx={{ fontSize: 36, mr: 1, color: 'primary.light' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.08em' }}>
            Gestión de Conexiones de Clientes
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.light' }}>
            {selectedClient ? `Conexiones para ${selectedClient.name}` : "Visión General de Clientes y Recursos"}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {selectedClient ? "Detalles de enlaces, VPNs, tráfico y arquitectura tecnológica." : "Monitorea y gestiona las conexiones de tus clientes en tiempo real."}
          </Typography>
        </Box>

        {/* Vista General de Clientes */}
        {!selectedClient && (
          <Grid container spacing={4} justifyContent="center">
            {simulatedClients.map(client => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={client.id}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                      bgcolor: 'background.default',
                    },
                    border: client.status === 'Problema' ? '1px solid #ef5350' : '1px solid rgba(129, 212, 250, 0.3)',
                  }}
                  onClick={() => setSelectedClient(client)}
                >
                  <PersonIcon sx={{ fontSize: 60, color: 'primary.light', mb: 1 }} />
                  <Typography variant="h6" align="center" sx={{ color: 'text.primary' }}>
                    {client.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {client.contact}
                  </Typography>
                  <Chip
                    label={client.status}
                    color={client.status === 'Activo' ? 'success' : 'error'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                  <Button
                    variant="text"
                    endIcon={<ExpandMoreIcon />}
                    sx={{ mt: 2, color: 'primary.main' }}
                  >
                    Ver Detalles
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Detalles de Conexión del Cliente Seleccionado */}
        {selectedClient && (
          <Paper elevation={8} sx={{ p: 5, bgcolor: '#1e1e1e', border: '1px solid rgba(129, 212, 250, 0.2)' }}>
            <Grid container spacing={4}>
              {/* Sección de Enlaces Físicos y Virtuales, VPNs y Túneles */}
              <Grid item xs={12} lg={7}>
                <Paper elevation={4} sx={{ p: 3, mb: 3, bgcolor: '#282828', border: '1px solid rgba(129, 212, 250, 0.1)' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <CableIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>Conexiones Activas</Typography>
                  </Box>
                  <Divider sx={{ mb: 2, bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
                  <List>
                    {selectedClient.connections.map(conn => (
                      <ListItem key={conn.id} sx={{ borderLeft: `4px solid ${conn.status === 'Activo' ? 'success.main' : (conn.status === 'Degradado' ? 'warning.main' : 'error.main')}`, mb: 1, p: 1 }}>
                        <ListItemIcon>
                          {conn.type.includes('Físico') ? <CableIcon color="info" /> :
                            conn.type.includes('Virtual') ? <CloudCircleIcon color="primary" /> :
                              conn.type.includes('VPN') ? <VpnKeyIcon color="secondary" /> :
                                conn.type.includes('Túnel') ? <VpnKeyIcon color="secondary" /> : null}
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="subtitle1" sx={{ color: 'text.primary' }}>{conn.service} ({conn.type})</Typography>}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">ID: {conn.id}</Typography>
                              <Typography variant="body2" color="text.secondary">Ubicación: {conn.location}</Typography>
                              {conn.vpn && (
                                <Typography variant="body2" color="text.secondary">
                                  VPN: {conn.vpn.localIP} &lt;&gt; {conn.vpn.remoteIP} ({conn.vpn.encryption})
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                        <Chip
                          label={conn.status}
                          color={conn.status === 'Activo' ? 'success' : (conn.status === 'Degradado' ? 'warning' : 'error')}
                          size="small"
                          sx={{ ml: 2 }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                {/* Sección de Tráfico */}
                <Paper elevation={4} sx={{ p: 3, bgcolor: '#282828', border: '1px solid rgba(129, 212, 250, 0.1)' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <NetworkCheckIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>Monitoreo de Tráfico</Typography>
                    <Tooltip title="Datos en tiempo real (simulados)">
                      <TrendingUpIcon color="action" />
                    </Tooltip>
                  </Box>
                  <Divider sx={{ mb: 2, bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
                  <TableContainer sx={{ maxHeight: 250, overflowY: 'auto' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>ID Conexión</TableCell>
                          <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Servicio</TableCell>
                          <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600 }}>Tráfico IN (Actual)</TableCell>
                          <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600 }}>Tráfico OUT (Actual)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedClient.connections.map(conn => (
                          <TableRow key={conn.id}>
                            <TableCell sx={{ color: 'text.primary' }}>{conn.id}</TableCell>
                            <TableCell sx={{ color: 'text.primary' }}>{conn.service}</TableCell>
                            <TableCell align="right" sx={{ color: 'text.primary' }}>
                              <Box display="flex" alignItems="center" justifyContent="flex-end">
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                  {conn.currentTraffic.in.toFixed(0)} {conn.currentTraffic.unit}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={(conn.currentTraffic.in / conn.traffic.in) * 100}
                                  sx={{ width: 80, height: 6, borderRadius: 3 }}
                                  color={(conn.currentTraffic.in / conn.traffic.in) * 100 > 70 ? 'warning' : 'success'}
                                />
                              </Box>
                            </TableCell>
                            <TableCell align="right" sx={{ color: 'text.primary' }}>
                              <Box display="flex" alignItems="center" justifyContent="flex-end">
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                  {conn.currentTraffic.out.toFixed(0)} {conn.currentTraffic.unit}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={(conn.currentTraffic.out / conn.traffic.out) * 100}
                                  sx={{ width: 80, height: 6, borderRadius: 3 }}
                                  color={(conn.currentTraffic.out / conn.traffic.out) * 100 > 70 ? 'warning' : 'success'}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button variant="outlined" startIcon={<NetworkCheckIcon />} sx={{ mt: 2, alignSelf: 'flex-end', borderColor: 'primary.main', color: 'primary.main' }}>
                    Análisis de Tráfico Avanzado
                  </Button>
                </Paper>
              </Grid>

              {/* Sección de Arquitectura Tecnológica del Cliente */}
              <Grid item xs={12} lg={5}>
                <Paper elevation={4} sx={{ p: 3, bgcolor: '#282828', height: '100%', border: '1px solid rgba(129, 212, 250, 0.1)' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <ArchitectureIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>Arquitectura Tecnológica</Typography>
                  </Box>
                  <Divider sx={{ mb: 2, bgcolor: 'rgba(129, 212, 250, 0.1)' }} />
                  <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none', border: '1px solid rgba(129, 212, 250, 0.1)' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>Descripción General</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {selectedClient.architecture.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion sx={{ bgcolor: 'transparent', boxShadow: 'none', mt: 1, border: '1px solid rgba(129, 212, 250, 0.1)' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.light' }} />} aria-controls="panel2a-content" id="panel2a-header">
                      <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>Notas Internas</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {selectedClient.architecture.notes || 'No hay notas adicionales.'}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.light' }}>
                      Diagrama de Arquitectura
                    </Typography>
                    {selectedClient.architecture.diagram ? (
                      <Paper sx={{ p: 2, bgcolor: '#b5b3b3', border: '1px dashed rgba(129, 212, 250, 0.3)' }}>
                        {/* Aquí iría una imagen real del diagrama o un SVG */}
                        <img
                          src="https://via.placeholder.com/400x200?text=Diagrama+de+Arquitectura"
                          alt="Diagrama de Arquitectura del Cliente"
                          style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          (Simulación de diagrama de red del cliente)
                        </Typography>
                        <Button variant="text" size="small" sx={{ mt: 1, color: 'primary.main' }}>
                          Descargar Diagrama
                        </Button>
                      </Paper>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No hay diagrama de arquitectura disponible.
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default ClientConnectionManagement;