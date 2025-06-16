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
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum'; // Icono principal de Foros
import PublicIcon from '@mui/icons-material/Public'; // Comunicaciones Generales
import CampaignIcon from '@mui/icons-material/Campaign'; // Comunicados/Anuncios
import CommentIcon from '@mui/icons-material/Comment'; // Comentarios en foros
import VisibilityIcon from '@mui/icons-material/Visibility'; // Vistas
import FavoriteIcon from '@mui/icons-material/Favorite'; // Reacciones / Likes
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Fecha / Hora
import PersonIcon from '@mui/icons-material/Person'; // Autor
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Crear nuevo
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Expandir acordeón
import PushPinIcon from '@mui/icons-material/PushPin'; // Pin de anuncio importante
import SendIcon from '@mui/icons-material/Send'; // Enviar mensaje
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Adjuntar archivo
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Emojis
import ReplyIcon from '@mui/icons-material/Reply'; // Responder
import SortIcon from '@mui/icons-material/Sort'; // Ordenar
import CategoryIcon from '@mui/icons-material/Category'; // Categoría de foro
import TagIcon from '@mui/icons-material/Tag'; // Etiquetas
import GavelIcon from '@mui/icons-material/Gavel';
import EditIcon from '@mui/icons-material/Edit'; // Reglas del foro
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete';

// --- Datos Simulados para Foros y Comunicaciones ---

const currentUser = {
  id: 'U001',
  name: 'Bryan Rosero',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Bryan%20Rosero',
  role: 'Administrador',
};

const generalCommunications = [
  {
    id: 'GC001',
    title: 'Actualización importante: Nueva política de privacidad de datos',
    author: 'Departamento Legal',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Legal',
    date: '10 de junio de 2025',
    content: 'Hemos actualizado nuestra política de privacidad para cumplir con las últimas regulaciones de protección de datos. Por favor, revisa el documento adjunto para más detalles.',
    attachments: ['politica_privacidad_v2.pdf'],
    isPinned: true,
  },
  {
    id: 'GC002',
    title: 'Evento de integración anual: ¡Reserva la fecha!',
    author: 'Recursos Humanos',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RRHH',
    date: '05 de junio de 2025',
    content: 'Este año tendremos nuestro evento de integración el 25 de julio. Más detalles sobre la ubicación y actividades se compartirán pronto. ¡Esperamos contar con tu participación!',
    attachments: [],
    isPinned: true,
  },
  {
    id: 'GC003',
    title: 'Mejoras en el rendimiento de la plataforma (Mayo)',
    author: 'Equipo de Desarrollo',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Desarrollo',
    date: '30 de mayo de 2025',
    content: 'Durante el mes de mayo, implementamos varias mejoras en el backend y frontend para optimizar la velocidad y estabilidad de la plataforma. Agradecemos su paciencia.',
    attachments: [],
    isPinned: false,
  },
  {
    id: 'GC004',
    title: 'Recordatorio: Encuesta de clima laboral disponible hasta el 15 de junio',
    author: 'Recursos Humanos',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RRHH',
    date: '01 de junio de 2025',
    content: 'No olvides completar la encuesta de clima laboral. Tu opinión es crucial para seguir mejorando nuestro ambiente de trabajo. Puedes acceder a ella desde el enlace en tu correo.',
    attachments: [],
    isPinned: false,
  },
];

const forums = [
  { id: 'F001', name: 'Soporte Técnico', description: 'Preguntas y respuestas sobre problemas técnicos.', topicsCount: 150, postsCount: 600, lastActivity: 'hace 5 minutos' },
  { id: 'F002', name: 'Sugerencias y Mejoras', description: 'Ideas para mejorar la plataforma y procesos.', topicsCount: 80, postsCount: 320, lastActivity: 'hace 1 hora' },
  { id: 'F003', name: 'Discusión General', description: 'Temas variados y conversación informal.', topicsCount: 200, postsCount: 1200, lastActivity: 'hace 30 minutos' },
  { id: 'F004', name: 'Anuncios del Equipo', description: 'Novedades y noticias internas del equipo.', topicsCount: 30, postsCount: 150, lastActivity: 'ayer' },
];

const forumTopics = {
  'F001': [ // Soporte Técnico
    {
      id: 'T001', title: 'Error al iniciar sesión después de la actualización', author: 'Usuario A', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Usuario%20A', date: '11 de junio de 2025', views: 250, comments: 15, likes: 5,
      content: 'Desde la última actualización, no puedo iniciar sesión en la plataforma. ¿A alguien más le pasa?',
      replies: [
        { id: 'R001', author: 'María Fernández', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=María%20Fernández', date: '11 de junio de 2025', content: 'Hemos detectado un problema con las credenciales antiguas. Intenta restablecer tu contraseña.', isAuthor: true },
        { id: 'R002', author: 'Carlos Soto', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Carlos%20Soto', date: '11 de junio de 2025', content: 'A mí también me pasó, y restablecer la contraseña funcionó.', isAuthor: false },
      ]
    },
    {
      id: 'T002', title: 'La función de búsqueda no devuelve resultados', author: 'Usuario B', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Usuario%20B', date: '10 de junio de 2025', views: 180, comments: 8, likes: 2,
      content: 'Estoy intentando buscar documentos pero no aparece nada. ¿Es un error conocido?',
      replies: [
        { id: 'R003', author: 'Ana Gómez', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ana%20Gómez', date: '10 de junio de 2025', content: 'Estamos investigando un problema con el índice de búsqueda. Disculpa las molestias.', isAuthor: false },
      ]
    },
  ],
  'F002': [ // Sugerencias y Mejoras
    {
      id: 'T003', title: 'Sugerencia: Modo oscuro para la interfaz', author: 'Usuario C', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Usuario%20C', date: '08 de junio de 2025', views: 300, comments: 25, likes: 50,
      content: 'Sería genial tener un modo oscuro para la interfaz, es más cómodo para la vista.',
      replies: [
        { id: 'R004', author: 'María Fernández', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=María%20Fernández', date: '09 de junio de 2025', content: '¡Excelente sugerencia! Lo hemos añadido a nuestra lista de funcionalidades a considerar.', isAuthor: true },
      ]
    }
  ]
};

const announcements = [
  {
    id: 'AN001',
    title: 'Comunicado Oficial: Nuevo Director de Operaciones',
    date: '12 de junio de 2025',
    author: 'Dirección General',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Dirección',
    content: 'Nos complace anunciar que Juan Pérez ha sido nombrado como nuestro nuevo Director de Operaciones. Su experiencia será clave para nuestro crecimiento.',
    isUrgent: true,
  },
  {
    id: 'AN002',
    title: 'Cierre por festivo: 20 de junio',
    date: '07 de junio de 2025',
    author: 'Administración',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin',
    content: 'Informamos que nuestras oficinas permanecerán cerradas el jueves 20 de junio debido al festivo local. Retomaremos actividades el viernes 21.',
    isUrgent: false,
  },
  {
    id: 'AN003',
    title: 'Resultados del Q2: ¡Logros importantes!',
    date: '01 de junio de 2025',
    author: 'Gerencia',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Gerencia',
    content: 'Hemos tenido un trimestre excepcional gracias al esfuerzo de todos. Los resultados detallados se presentarán en la próxima reunión general.',
    isUrgent: false,
  },
];

// Componente principal
function ForumsCommunicationsPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('general_comms'); // 'general_comms', 'forums', 'announcements'

  const [selectedForum, setSelectedForum] = useState(null); // Para navegar dentro de un foro
  const [selectedTopic, setSelectedTopic] = useState(null); // Para ver un tema específico

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


  // Funciones para navegación entre foros y temas
  const handleSelectForum = (forum) => {
    setSelectedForum(forum);
    setSelectedTopic(null); // Resetear el tema seleccionado al cambiar de foro
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    // Simular incremento de vistas
    if (topic) {
      topic.views += 1;
    }
  };

  const handleBackToForums = () => {
    setSelectedForum(null);
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const handlePostReply = (topicId) => {
    // Simular añadir una respuesta
    showSnackbar('Respuesta publicada con éxito.', 'success');
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', color: '#333', pb: 4 }}>
      {/* AppBar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: '#212121', borderBottom: '1px solid #424242' }}>
        <Toolbar>
          {onGoToHome && (
            <Tooltip title="Volver al Inicio">
              <IconButton edge="start" color="inherit" aria-label="home" onClick={onGoToHome} sx={{ mr: 2, color: '#bdbdbd' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          )}
          <ForumIcon sx={{ fontSize: 36, mr: 1, color: '#3f51b5' }} /> {/* Azul para Foros */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            Foros y Comunicaciones
          </Typography>
          <Chip
            avatar={<Avatar src={currentUser.avatar} />}
            label={currentUser.name}
            sx={{ bgcolor: '#424242', color: '#ffffff', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#3f51b5' }}>
            Conecta, Comparte, Comunica
          </Typography>
          <Typography variant="h6" color="#616161">
            Tu centro de información y discusión comunitaria.
          </Typography>
        </Box>

        {/* Pestañas de Navegación Principal */}
        <Paper elevation={2} sx={{ mb: 4, bgcolor: '#ffffff', borderRadius: 2 }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => {
              setCurrentTab(newValue);
              setSelectedForum(null); // Resetear navegación interna al cambiar de pestaña principal
              setSelectedTopic(null);
            }}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#3f51b5', // Azul oscuro para foros
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#3f51b5', // Azul oscuro para foros
                },
              },
            }}
          >
            <Tab label="Comunicaciones Generales" value="general_comms" icon={<PublicIcon />} iconPosition="start" />
            <Tab label="Foros de Discusión" value="forums" icon={<ForumIcon />} iconPosition="start" />
            <Tab label="Comunicados y Anuncios" value="announcements" icon={<CampaignIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Comunicaciones Generales */}
          {currentTab === 'general_comms' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <PublicIcon sx={{ color: '#2196f3', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Comunicaciones Generales de la Plataforma
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                  Publicar Nueva Comunicación
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                {generalCommunications.map(comm => (
                  <Grid item xs={12} key={comm.id}>
                    <Card variant="outlined" sx={{ mb: 2, bgcolor: comm.isPinned ? '#e8f5e9' : '#fafafa', border: comm.isPinned ? '1px solid #4caf50' : '1px solid #eee' }}>
                      <CardHeader
                        avatar={
                          <Avatar src={comm.avatar}>{comm.author[0]}</Avatar>
                        }
                        title={
                          <Box display="flex" alignItems="center">
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#3f51b5' }}>{comm.title}</Typography>
                            {comm.isPinned && (
                              <Chip label="Fijado" size="small" color="success" icon={<PushPinIcon />} sx={{ ml: 1 }} />
                            )}
                          </Box>
                        }
                        subheader={<Typography variant="body2" color="text.secondary">{comm.author} - {comm.date}</Typography>}
                      />
                      <CardContent>
                        <Typography variant="body1" sx={{ mb: 2 }}>{comm.content}</Typography>
                        {comm.attachments && comm.attachments.length > 0 && (
                          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                            <AttachFileIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">Adjuntos:</Typography>
                            {comm.attachments.map((file, index) => (
                              <Chip key={index} label={file} size="small" variant="outlined" sx={{ ml: 1 }} onClick={() => showSnackbar(`Descargando ${file}...`, 'info')} />
                            ))}
                          </Box>
                        )}
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid #eee' }}>
                        <Button size="small" startIcon={<CommentIcon />} onClick={() => showSnackbar('Comentarios habilitados para administradores.', 'info')}>Comentar</Button>
                        <Button size="small" startIcon={<EditIcon />} onClick={() => showSnackbar('Editando comunicación...', 'info')} disabled={currentUser.role !== 'Administrador'}>Editar</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Alert severity="info" sx={{ mt: 3 }}>
                Mantente al día con las últimas noticias y directrices de la plataforma.
              </Alert>
            </Paper>
          )}

          {/* Tab: Foros de Discusión */}
          {currentTab === 'forums' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              {!selectedForum && (
                <>
                  <Box display="flex" alignItems="center" mb={2}>
                    <ForumIcon sx={{ color: '#3f51b5', fontSize: 30, mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Explora Nuestros Foros de Discusión
                    </Typography>
                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', bgcolor: '#3f51b5', '&:hover': { bgcolor: '#303f9f' } }}>
                      Crear Nuevo Foro
                    </Button>
                  </Box>
                  <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Table>
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, width: '40%' }}><CategoryIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Foro</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: '30%' }}>Descripción</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700, width: '10%' }}><CommentIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Temas</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700, width: '10%' }}><AccessTimeIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Última Act.</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700, width: '10%' }}>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {forums.map((forum) => (
                          <TableRow key={forum.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ForumIcon sx={{ mr: 1, color: '#2196f3' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{forum.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{forum.description}</TableCell>
                            <TableCell align="center">{forum.topicsCount}</TableCell>
                            <TableCell align="center">{forum.lastActivity}</TableCell>
                            <TableCell align="center">
                              <Button size="small" variant="outlined" onClick={() => handleSelectForum(forum)}>Ver Foro</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Alert severity="success" sx={{ mt: 3 }}>
                    Participa en discusiones relevantes y comparte tu conocimiento con la comunidad.
                  </Alert>
                </>
              )}

              {selectedForum && !selectedTopic && (
                <>
                  <Box display="flex" alignItems="center" mb={2}>
                    <IconButton onClick={handleBackToForums} sx={{ mr: 1 }}>
                      <ReplyIcon />
                    </IconButton>
                    <ForumIcon sx={{ color: '#3f51b5', fontSize: 30, mr: 1 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      Temas en: {selectedForum.name}
                    </Typography>
                    <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                      Crear Nuevo Tema
                    </Button>
                  </Box>
                  <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                      size="small"
                      placeholder="Buscar temas..."
                      InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                      sx={{ width: isMobile ? '100%' : '300px', mb: isMobile ? 2 : 0 }}
                    />
                    <ToggleButtonGroup size="small" exclusive>
                      <ToggleButton value="latest"><SortIcon /> Más Recientes</ToggleButton>
                      <ToggleButton value="popular"><FavoriteIcon /> Populares</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Table>
                      <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, width: '40%' }}><CommentIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Tema</TableCell>
                          <TableCell sx={{ fontWeight: 700, width: '20%' }}><PersonIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Autor</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700, width: '10%' }}><VisibilityIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Vistas</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700, width: '10%' }}><ForumIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Respuestas</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700, width: '10%' }}><AccessTimeIcon fontSize="small" sx={{verticalAlign: 'middle', mr: 0.5}}/> Fecha</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 700, width: '10%' }}>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {forumTopics[selectedForum.id] && forumTopics[selectedForum.id].length > 0 ? (
                          forumTopics[selectedForum.id].map((topic) => (
                            <TableRow key={topic.id} hover>
                              <TableCell component="th" scope="row">
                                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#333' }}>{topic.title}</Typography>
                              </TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <Avatar src={topic.avatar} sx={{ width: 24, height: 24, mr: 1 }} />
                                  {topic.author}
                                </Box>
                              </TableCell>
                              <TableCell align="center">{topic.views}</TableCell>
                              <TableCell align="center">{topic.comments}</TableCell>
                              <TableCell align="center">{topic.date}</TableCell>
                              <TableCell align="center">
                                <Button size="small" variant="outlined" onClick={() => handleSelectTopic(topic)}>Ver Tema</Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>No hay temas en este foro todavía.</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Pagination count={5} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />
                </>
              )}

              {selectedTopic && (
                <Paper elevation={0} sx={{ p: isMobile ? 2 : 3, bgcolor: '#fbfbfb', border: '1px solid #e0e0e0', borderRadius: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <IconButton onClick={handleBackToTopics} sx={{ mr: 1 }}>
                      <ReplyIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                      {selectedTopic.title}
                    </Typography>
                    <ButtonGroup variant="outlined" size="small">
                      <Button startIcon={<FavoriteIcon />} onClick={() => showSnackbar('Has reaccionado a este tema.', 'info')}>
                        {selectedTopic.likes}
                      </Button>
                      <Button startIcon={<ShareIcon />} onClick={() => showSnackbar('Compartiendo tema...', 'info')}>Compartir</Button>
                    </ButtonGroup>
                  </Box>
                  <Divider sx={{ mb: 2 }} />

                  {/* Post original */}
                  <Card variant="outlined" sx={{ mb: 3, bgcolor: '#ffffff' }}>
                    <CardHeader
                      avatar={<Avatar src={selectedTopic.avatar}>{selectedTopic.author[0]}</Avatar>}
                      title={<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedTopic.author}</Typography>}
                      subheader={<Typography variant="caption" color="text.secondary">{selectedTopic.date}</Typography>}
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Typography variant="body1">{selectedTopic.content}</Typography>
                    </CardContent>
                  </Card>

                  {/* Respuestas */}
                  <Typography variant="h6" sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 1, color: '#3f51b5' }}>
                    Respuestas ({selectedTopic.replies.length})
                  </Typography>
                  <List sx={{ pb: 0 }}>
                    {selectedTopic.replies.map(reply => (
                      <ListItem key={reply.id} alignItems="flex-start" sx={{ mb: 2, bgcolor: reply.isAuthor ? '#e3f2fd' : '#ffffff', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                        <ListItemAvatar>
                          <Avatar src={reply.avatar}>{reply.author[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{reply.author} {reply.isAuthor && '(Autor)'}</Typography>}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {reply.content}
                              </Typography>
                              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                                {reply.date}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  {/* Área de nueva respuesta */}
                  <Box sx={{ mt: 3, p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" gutterBottom sx={{color: '#3f51b5'}}>Publicar una Respuesta</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Escribe tu respuesta aquí..."
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Tooltip title="Adjuntar Archivo"><IconButton><AttachFileIcon /></IconButton></Tooltip>
                        <Tooltip title="Emojis"><IconButton><EmojiEmotionsIcon /></IconButton></Tooltip>
                      </Box>
                      <Button variant="contained" endIcon={<SendIcon />} onClick={() => handlePostReply(selectedTopic.id)} sx={{ bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                        Publicar Respuesta
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              )}
            </Paper>
          )}

          {/* Tab: Comunicados y Anuncios */}
          {currentTab === 'announcements' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <CampaignIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Comunicados y Anuncios Oficiales
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ textTransform: 'none', bgcolor: '#ff9800', '&:hover': { bgcolor: '#f57c00' } }} disabled={currentUser.role !== 'Administrador'}>
                  Crear Nuevo Anuncio
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <List>
                {announcements.map(announcement => (
                  <ListItem key={announcement.id} alignItems="flex-start" sx={{ mb: 2, border: '1px solid #eee', borderRadius: 2, p: 2, bgcolor: announcement.isUrgent ? '#fff3e0' : '#fafafa' }}>
                    <ListItemAvatar>
                      <Avatar src={announcement.avatar} sx={{ bgcolor: announcement.isUrgent ? '#ff9800' : '#bdbdbd' }}>
                        {announcement.author[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#424242' }}>{announcement.title}</Typography>
                          {announcement.isUrgent && (
                            <Chip label="¡URGENTE!" size="small" color="error" sx={{ ml: 1, fontWeight: 600 }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {announcement.author} - {announcement.date}
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1 }}>{announcement.content}</Typography>
                        </>
                      }
                    />
                    <Box sx={{ ml: 2, display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 1 }}>
                      <Tooltip title="Editar Anuncio"><IconButton size="small" disabled={currentUser.role !== 'Administrador'}><EditIcon /></IconButton></Tooltip>
                      <Tooltip title="Eliminar Anuncio"><IconButton size="small" disabled={currentUser.role !== 'Administrador'}><DeleteIcon color="error" /></IconButton></Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>
              <Alert severity="warning" sx={{ mt: 3 }}>
                Los comunicados oficiales son la fuente de información más fiable. ¡Mantente informado!
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

export default ForumsCommunicationsPanel;