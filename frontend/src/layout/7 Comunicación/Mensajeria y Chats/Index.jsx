import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Snackbar, CardHeader, CardContent, TableHead, TableRow, TableCell, TableContainer, Table, TableBody,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat'; // Icono principal de Chat
import PublicIcon from '@mui/icons-material/Public'; // Chat General
import BusinessIcon from '@mui/icons-material/Business'; // Chat Interno/Empresa
import AssignmentIcon from '@mui/icons-material/Assignment'; // Chat de Proyectos
import SendIcon from '@mui/icons-material/Send'; // Enviar Mensaje
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Opciones de chat
import GroupIcon from '@mui/icons-material/Group'; // Participantes
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Adjuntar archivo
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Emojis
import VideocamIcon from '@mui/icons-material/Videocam'; // Videollamada (futura integración)
import PhoneIcon from '@mui/icons-material/Phone'; // Llamada (futura integración)
import SettingsIcon from '@mui/icons-material/Settings'; // Configuración
import AddReactionIcon from '@mui/icons-material/AddReaction'; // Reacciones
import MessageIcon from '@mui/icons-material/Message'; // Unread messages
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'; // Audio message
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Card } from 'antd';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Online indicator

// --- Datos Simulados de Mensajería ---

const currentUser = {
  id: 'U001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20García',
  status: 'online',
};

const chatUsers = [
  {
    id: 'U001',
    name: 'Ana García',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20García',
    status: 'online',
  },
  {
    id: 'U002',
    name: 'Carlos Ruíz',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Carlos%20Ruíz',
    status: 'online',
  },
  {
    id: 'U003',
    name: 'Sofía López',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sofía%20López',
    status: 'away',
  },
  {
    id: 'U004',
    name: 'Diego Torres',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Diego%20Torres',
    status: 'offline',
  },
  {
    id: 'U005',
    name: 'Laura Mendoza',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Laura%20Mendoza',
    status: 'online',
  },
];

const generalChatMessages = [
  {
    id: 'M001',
    senderId: 'U002',
    senderName: 'Carlos Ruíz',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Carlos%20Ruíz',
    timestamp: '12:01 PM',
    text: '¡Hola a todos! ¿Alguien tiene alguna pregunta sobre el nuevo proceso de reporte?',
  },
  {
    id: 'M002',
    senderId: 'U001',
    senderName: 'Ana García',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20García',
    timestamp: '12:05 PM',
    text: 'Sí, Carlos, ¿dónde puedo encontrar la plantilla actualizada?',
  },
  {
    id: 'M003',
    senderId: 'U003',
    senderName: 'Sofía López',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sofía%20López',
    timestamp: '12:08 PM',
    text: 'La plantilla está en la carpeta compartida de Documentos Generales. ¡Buenos días a todos!',
  },
  {
    id: 'M004',
    senderId: 'U002',
    senderName: 'Carlos Ruíz',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Carlos%20Ruíz',
    timestamp: '12:15 PM',
    text: 'Gracias, Sofía. ¡Justo lo que necesitaba!',
  },
];

const internalChatMessages = [
  {
    id: 'IM001',
    senderId: 'U001',
    senderName: 'Ana García',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20García',
    timestamp: 'Ayer 10:30 AM',
    text: 'Equipo, reunión sobre el presupuesto mañana a las 9 AM. ¡No olviden la presentación!',
  },
  {
    id: 'IM002',
    senderId: 'U004',
    senderName: 'Diego Torres',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Diego%20Torres',
    timestamp: 'Ayer 10:45 AM',
    text: 'Confirmado, Ana. Estaré listo.',
  },
  {
    id: 'IM003',
    senderId: 'U005',
    senderName: 'Laura Mendoza',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Laura%20Mendoza',
    timestamp: 'Ayer 11:00 AM',
    text: 'Yo también. ¿Necesitas ayuda con algo específico?',
  },
];

const projects = [
  {
    id: 'P001',
    name: 'Proyecto Alfa (Marketing)',
    members: ['U001', 'U002', 'U003'],
    unreadCount: 2,
    lastMessage: 'Pendiente la revisión final.',
  },
  {
    id: 'P002',
    name: 'Desarrollo App Móvil',
    members: ['U001', 'U004', 'U005'],
    unreadCount: 0,
    lastMessage: 'Sprint review agendado.',
  },
  {
    id: 'P003',
    name: 'Implementación CRM',
    members: ['U002', 'U003', 'U005'],
    unreadCount: 0,
    lastMessage: 'Actualización en el cronograma.',
  },
];

const projectChatMessages = {
  'P001': [
    {
      id: 'PM001',
      senderId: 'U003',
      senderName: 'Sofía López',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sofía%20López',
      timestamp: '11:00 AM',
      text: 'Equipo, ¿quién puede revisar el borrador del plan de marketing antes del final del día?',
    },
    {
      id: 'PM002',
      senderId: 'U002',
      senderName: 'Carlos Ruíz',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Carlos%20Ruíz',
      timestamp: '11:15 AM',
      text: 'Yo puedo revisarlo después del almuerzo.',
    },
    {
      id: 'PM003',
      senderId: 'U001',
      senderName: 'Ana García',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20García',
      timestamp: '11:20 AM',
      text: 'Perfecto, Carlos. Gracias.',
    },
  ],
  'P002': [
    {
      id: 'PM201',
      senderId: 'U004',
      senderName: 'Diego Torres',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Diego%20Torres',
      timestamp: 'Ayer 14:00',
      text: '¿Alguien ha probado la última versión de la API en el entorno de desarrollo?',
    },
    {
      id: 'PM202',
      senderId: 'U001',
      senderName: 'Ana García',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20García',
      timestamp: 'Ayer 14:30',
      text: 'Sí, yo lo hice. Funciona bien en mis pruebas.',
    },
  ],
};

// --- Componente principal ---
function MessagingChatPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('general'); // 'general', 'internal', 'teams', 'projects'
  const [messageInput, setMessageInput] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0]); // Seleccionar el primer proyecto por defecto
  const messagesEndRef = useRef(null);

  const [anchorElTeamsMenu, setAnchorElTeamsMenu] = useState(null);
  const openTeamsMenu = Boolean(anchorElTeamsMenu);

  const [openTeamsIntegrationDialog, setOpenTeamsIntegrationDialog] = useState(false);
  const [teamsWebhookUrl, setTeamsWebhookUrl] = useState('');
  const [teamsIntegrationStatus, setTeamsIntegrationStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [generalChatMessages, internalChatMessages, projectChatMessages[selectedProject?.id]]);

  const handleSendMessage = (chatType) => {
    if (messageInput.trim() === '') return;

    const newMessage = {
      id: `M${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      avatar: currentUser.avatar,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageInput.trim(),
    };

    // Lógica para añadir el mensaje al chat correspondiente
    if (chatType === 'general') {
      generalChatMessages.push(newMessage); // Esto es solo para simulación, en una app real se haría un setState
    } else if (chatType === 'internal') {
      internalChatMessages.push(newMessage);
    } else if (chatType === 'project' && selectedProject) {
      projectChatMessages[selectedProject.id].push(newMessage);
    }

    setMessageInput('');
    scrollToBottom();
    showSnackbar('Mensaje enviado.', 'success');
  };

  const handleTeamsMenuClick = (event) => {
    setAnchorElTeamsMenu(event.currentTarget);
  };

  const handleTeamsMenuClose = () => {
    setAnchorElTeamsMenu(null);
  };

  const handleOpenTeamsIntegrationDialog = () => {
    setOpenTeamsIntegrationDialog(true);
    handleTeamsMenuClose();
  };

  const handleIntegrateTeams = () => {
    if (teamsWebhookUrl.trim() === '') {
      showSnackbar('La URL del Webhook no puede estar vacía.', 'error');
      return;
    }
    setTeamsIntegrationStatus('connecting');
    showSnackbar('Intentando conectar con Microsoft Teams...', 'info');

    // Simulación de conexión a Teams
    setTimeout(() => {
      const success = Math.random() > 0.3; // Simular fallo 30% de las veces
      if (success) {
        setTeamsIntegrationStatus('connected');
        showSnackbar('¡Integración con Microsoft Teams exitosa!', 'success');
        setOpenTeamsIntegrationDialog(false);
      } else {
        setTeamsIntegrationStatus('disconnected');
        showSnackbar('Error al conectar con Microsoft Teams. Verifica la URL.', 'error');
      }
    }, 2000);
  };

  // Helper para obtener el avatar del usuario
  const getUserAvatar = (userId) => {
    const user = chatUsers.find(u => u.id === userId);
    return user ? user.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=Unknown';
  };

  // Helper para el indicador de estado del usuario
  const getUserStatusIndicator = (status) => {
    let color = '#bdbdbd'; // default
    if (status === 'online') color = '#4caf50';
    if (status === 'away') color = '#ff9800';
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: color,
            color: color,
            boxShadow: '0 0 0 2px #fff',
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              animation: 'ripple 1.2s infinite ease-in-out',
              border: '1px solid currentColor',
              content: '""',
            },
          },
          '@keyframes ripple': {
            '0%': {
              transform: 'scale(.8)',
              opacity: 1,
            },
            '100%': {
              transform: 'scale(2.4)',
              opacity: 0,
            },
          },
        }}
      >
        <Avatar src={currentUser.avatar} />
      </Badge>
    );
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#004a8f', borderBottom: '1px solid #424242' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome}
                          sx={{ mr: 2, color: '#bdbdbd' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <ChatIcon sx={{ fontSize: 36, mr: 1, color: '#2196f3' }} /> {/* Azul para chats */}
          <Typography variant="h5" component="div"
                      sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Centro de Mensajería y Colaboración
          </Typography>
          <Tooltip title="Tu Estado">
            {getUserStatusIndicator(currentUser.status)}
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#2196f3' }}>
            Conéctate, Colabora, Comunica
          </Typography>
          <Typography variant="h6" color="#616161">
            Tu espacio centralizado para todas las conversaciones.
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
                backgroundColor: '#2196f3', // Azul para chats
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#2196f3', // Azul para chats
                },
              },
            }}
          >
            <Tab label="Chat General" value="general" icon={<PublicIcon />} iconPosition="start" />
            <Tab label="Chat de Empresa" value="internal" icon={<BusinessIcon />} iconPosition="start" />
            <Tab label="Chats de Proyectos" value="projects" icon={<AssignmentIcon />} iconPosition="start" />
            <Tab label="Integración Teams" value="teams"
                 icon={<img src="https://img.icons8.com/color/48/000000/microsoft-teams-2019.png" alt="Teams Icon"
                            style={{ width: 24, height: 24, marginRight: 8 }} />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Grid container spacing={3}>
          {/* Columna de Lista de Chats/Contactos (Visible en General, Interno, Proyectos) */}
          {['general', 'internal', 'projects'].includes(currentTab) && (
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{
                p: 2,
                bgcolor: '#ffffff',
                borderRadius: 2,
                height: '70vh',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
                  {currentTab === 'general' && 'Participantes del Chat General'}
                  {currentTab === 'internal' && 'Contactos de Empresa'}
                  {currentTab === 'projects' && 'Proyectos Activos'}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                  {currentTab === 'general' && (
                    <List dense>
                      {chatUsers.map(user => (
                        <ListItem key={user.id}>
                          <ListItemAvatar>
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              color={user.status === 'online' ? 'success' : (user.status === 'away' ? 'warning' : 'default')}
                            >
                              <Avatar src={user.avatar} />
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography
                              sx={{ fontWeight: 500 }}>{user.name} {user.id === currentUser.id && '(Tú)'}</Typography>}
                            secondary={user.status === 'online' ? 'En línea' : (user.status === 'away' ? 'Ausente' : 'Desconectado')}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {currentTab === 'internal' && (
                    <List dense>
                      {chatUsers.filter(user => user.id !== currentUser.id).map(user => (
                        <ListItem button key={user.id}
                                  onClick={() => showSnackbar(`Abriendo chat privado con ${user.name}... (funcionalidad en desarrollo)`, 'info')}>
                          <ListItemAvatar>
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              color={user.status === 'online' ? 'success' : (user.status === 'away' ? 'warning' : 'default')}
                            >
                              <Avatar src={user.avatar} />
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography sx={{ fontWeight: 500 }}>{user.name}</Typography>}
                            secondary={user.status === 'online' ? 'En línea' : (user.status === 'away' ? 'Ausente' : 'Desconectado')}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {currentTab === 'projects' && (
                    <List dense>
                      {projects.map(project => (
                        <ListItem button key={project.id} onClick={() => setSelectedProject(project)}
                                  sx={{
                                    bgcolor: selectedProject?.id === project.id ? '#e3f2fd' : 'transparent',
                                    borderRadius: 1,
                                    mb: 0.5,
                                  }}
                        >
                          <ListItemAvatar>
                            <Avatar><AssignmentIcon /></Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontWeight: 500 }}>{project.name}</Typography>
                                {project.unreadCount > 0 && (
                                  <Badge badgeContent={project.unreadCount} color="error" max={99}>
                                    <MessageIcon sx={{ color: '#f44336', fontSize: 18 }} />
                                  </Badge>
                                )}
                              </Box>
                            }
                            secondary={`Miembros: ${project.members.length} | Últ. mensaje: ${project.lastMessage}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Columna de Ventana de Chat */}
          {['general', 'internal', 'projects'].includes(currentTab) && (
            <Grid item xs={12} md={9}>
              <Paper elevation={3} sx={{
                p: 2,
                bgcolor: '#ffffff',
                borderRadius: 2,
                height: '70vh',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                    {currentTab === 'general' && 'Chat General de la Plataforma'}
                    {currentTab === 'internal' && 'Chat Interno de la Empresa'}
                    {currentTab === 'projects' && (selectedProject ? `Chat del Proyecto: ${selectedProject.name}` : 'Selecciona un proyecto')}
                  </Typography>
                  <Box>
                    <Tooltip title="Ver Participantes">
                      <IconButton><GroupIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Iniciar Videollamada (futuro)">
                      <IconButton><VideocamIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Opciones de Chat">
                      <IconButton><MoreVertIcon /></IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {/* Área de Mensajes */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1, bgcolor: '#e0f2f7', borderRadius: 1 }}>
                  {currentTab === 'general' && generalChatMessages.map((message) => (
                    <Box key={message.id} sx={{
                      display: 'flex',
                      justifyContent: message.senderId === currentUser.id ? 'flex-end' : 'flex-start',
                      mb: 1.5,
                    }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: message.senderId === currentUser.id ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                      }}>
                        <Avatar src={message.avatar} sx={{ width: 32, height: 32, mx: 1 }} />
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 1.2,
                            borderRadius: '15px',
                            maxWidth: '70%',
                            bgcolor: message.senderId === currentUser.id ? '#bbdefb' : '#ffffff',
                            border: 'none',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            {message.senderId === currentUser.id ? 'Tú' : message.senderName} - {message.timestamp}
                          </Typography>
                          <Typography variant="body2">{message.text}</Typography>
                        </Paper>
                      </Box>
                    </Box>
                  ))}
                  {currentTab === 'internal' && internalChatMessages.map((message) => (
                    <Box key={message.id} sx={{
                      display: 'flex',
                      justifyContent: message.senderId === currentUser.id ? 'flex-end' : 'flex-start',
                      mb: 1.5,
                    }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: message.senderId === currentUser.id ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                      }}>
                        <Avatar src={message.avatar} sx={{ width: 32, height: 32, mx: 1 }} />
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 1.2,
                            borderRadius: '15px',
                            maxWidth: '70%',
                            bgcolor: message.senderId === currentUser.id ? '#bbdefb' : '#ffffff',
                            border: 'none',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            {message.senderId === currentUser.id ? 'Tú' : message.senderName} - {message.timestamp}
                          </Typography>
                          <Typography variant="body2">{message.text}</Typography>
                        </Paper>
                      </Box>
                    </Box>
                  ))}
                  {currentTab === 'projects' && selectedProject && projectChatMessages[selectedProject.id] && projectChatMessages[selectedProject.id].map((message) => (
                    <Box key={message.id} sx={{
                      display: 'flex',
                      justifyContent: message.senderId === currentUser.id ? 'flex-end' : 'flex-start',
                      mb: 1.5,
                    }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: message.senderId === currentUser.id ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                      }}>
                        <Avatar src={message.avatar} sx={{ width: 32, height: 32, mx: 1 }} />
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 1.2,
                            borderRadius: '15px',
                            maxWidth: '70%',
                            bgcolor: message.senderId === currentUser.id ? '#bbdefb' : '#ffffff',
                            border: 'none',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            {message.senderId === currentUser.id ? 'Tú' : message.senderName} - {message.timestamp}
                          </Typography>
                          <Typography variant="body2">{message.text}</Typography>
                        </Paper>
                      </Box>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Input de Mensaje */}
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title="Adjuntar Archivo"><IconButton><AttachFileIcon /></IconButton></Tooltip>
                  <Tooltip title="Emojis"><IconButton><EmojiEmotionsIcon /></IconButton></Tooltip>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe un mensaje..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage(currentTab === 'projects' ? 'project' : currentTab);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Grabar Mensaje de Voz"><IconButton><KeyboardVoiceIcon /></IconButton></Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '25px',
                        pr: 0.5,
                      },
                      '& .MuiInputBase-input': {
                        py: 1.5,
                      },
                    }}
                  />
                  <IconButton
                    color="primary"
                    sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' }, p: 1.5 }}
                    onClick={() => handleSendMessage(currentTab === 'projects' ? 'project' : currentTab)}
                    disabled={messageInput.trim() === ''}
                  >
                    <SendIcon sx={{ color: '#ffffff' }} />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          )}

          {/* Tab: Integración con Microsoft Teams */}
          {currentTab === 'teams' && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <img src="https://img.icons8.com/color/48/000000/microsoft-teams-2019.png" alt="Teams Icon"
                       style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                    Integración con Microsoft Teams
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<SettingsIcon />}
                    onClick={handleOpenTeamsIntegrationDialog}
                    sx={{ textTransform: 'none' }}
                  >
                    Configurar Integración
                  </Button>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>Estado de la Integración:</Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <FiberManualRecordIcon
                        color={teamsIntegrationStatus === 'connected' ? 'success' : (teamsIntegrationStatus === 'connecting' ? 'warning' : 'error')}
                        sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        {teamsIntegrationStatus === 'connected' && 'Conectado a Microsoft Teams.'}
                        {teamsIntegrationStatus === 'connecting' && 'Conectando... por favor espera.'}
                        {teamsIntegrationStatus === 'disconnected' && 'Desconectado de Microsoft Teams.'}
                      </Typography>
                    </Box>
                    {teamsIntegrationStatus === 'connected' && (
                      <Alert severity="success">
                        Las notificaciones y mensajes pueden ser sincronizados entre esta plataforma y Teams.
                      </Alert>
                    )}
                    {teamsIntegrationStatus === 'disconnected' && (
                      <Alert severity="warning">
                        La integración con Teams no está activa. Configura una URL de Webhook para empezar.
                      </Alert>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card elevation={0}
                          sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2, border: '1px dashed #90caf9' }}>
                      <CardHeader title={<Typography variant="h6">Beneficios de la Integración</Typography>}
                                  sx={{ pb: 0 }} />
                      <CardContent>
                        <List dense>
                          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText
                            primary="Notificaciones de la plataforma en canales de Teams." /></ListItem>
                          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText
                            primary="Sincronización de chats y menciones." /></ListItem>
                          <ListItem><ListItemIcon><CheckCircleOutlineIcon color="primary" /></ListItemIcon><ListItemText
                            primary="Colaboración sin salir de tu entorno preferido." /></ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>Canales de Sincronización:</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Configura qué chats de esta plataforma se sincronizan con qué canales de Microsoft Teams.
                </Typography>
                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 250 }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Chat en Plataforma</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Canal de Teams (ejemplo)</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Chat General</TableCell>
                        <TableCell>#anuncios-generales</TableCell>
                        <TableCell><Chip label="Activo" size="small" color="success" /></TableCell>
                        <TableCell sx={{ textAlign: 'center' }}><Button size="small">Gestionar</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Chat de Empresa</TableCell>
                        <TableCell>#comunicacion-interna</TableCell>
                        <TableCell><Chip label="Activo" size="small" color="success" /></TableCell>
                        <TableCell sx={{ textAlign: 'center' }}><Button size="small">Gestionar</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Proyecto Alfa</TableCell>
                        <TableCell>#proyecto-alfa-dev</TableCell>
                        <TableCell><Chip label="Inactivo" size="small" color="warning" /></TableCell>
                        <TableCell sx={{ textAlign: 'center' }}><Button size="small">Activar</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Dialog para Configuración de Integración con Teams */}
      <Dialog open={openTeamsIntegrationDialog} onClose={() => setOpenTeamsIntegrationDialog(false)} maxWidth="sm"
              fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          Configurar Integración con Microsoft Teams
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Para integrar Microsoft Teams, necesitas una URL de Webhook entrante.
            Puedes obtenerla en la configuración de tu canal de Teams.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="URL de Webhook de Microsoft Teams"
            type="url"
            fullWidth
            variant="outlined"
            value={teamsWebhookUrl}
            onChange={(e) => setTeamsWebhookUrl(e.target.value)}
            placeholder="Ej: https://outlook.office.com/webhook/..."
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            Asegúrate de que la URL del Webhook es correcta para evitar problemas de conexión.
          </Alert>
          {teamsIntegrationStatus === 'connecting' && (
            <LinearProgress sx={{ mt: 2 }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTeamsIntegrationDialog(false)} color="secondary"
                  disabled={teamsIntegrationStatus === 'connecting'}>Cancelar</Button>
          <Button onClick={handleIntegrateTeams} variant="contained" color="primary"
                  disabled={teamsIntegrationStatus === 'connecting'}>
            {teamsIntegrationStatus === 'connecting' ? 'Conectando...' : 'Conectar'}
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

export default MessagingChatPanel;