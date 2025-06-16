import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Tooltip, AppBar, Toolbar,
  TextField, FormControl, InputLabel, Select, MenuItem,
  LinearProgress, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText, ListItemIcon,
  Accordion, AccordionSummary, AccordionDetails,
  Tabs, Tab,
  Alert, AlertTitle,
  Snackbar,
  Card, CardContent, CardHeader,
  Switch, FormControlLabel, Checkbox,
} from '@mui/material';

// --- Iconos ---
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // Icono principal de Usuarios
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Añadir Usuario
import EditIcon from '@mui/icons-material/Edit'; // Editar
import DeleteIcon from '@mui/icons-material/Delete'; // Eliminar
import GroupIcon from '@mui/icons-material/Group'; // Grupos
import SecurityIcon from '@mui/icons-material/Security'; // Roles y Permisos
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Perfil de Usuario
import SearchIcon from '@mui/icons-material/Search'; // Buscar
import RefreshIcon from '@mui/icons-material/Refresh'; // Actualizar
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Éxito
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Error
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Acordeón
import BlockIcon from '@mui/icons-material/Block'; // Bloquear
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ver Permisos
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Ocultar Permisos

// --- Datos Simulados ---

const allUsers = [
  { id: 'U-001', name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'Administrador', groups: ['TI', 'Dirección'], status: 'Activo', lastLogin: '2025-06-11 10:30' },
  { id: 'U-002', name: 'Maria García', email: 'maria.garcia@example.com', role: 'Ventas', groups: ['Ventas'], status: 'Activo', lastLogin: '2025-06-11 09:15' },
  { id: 'U-003', name: 'Carlos López', email: 'carlos.lopez@example.com', role: 'Marketing', groups: ['Marketing'], status: 'Inactivo', lastLogin: '2025-06-08 14:00' },
  { id: 'U-004', name: 'Ana Rodríguez', email: 'ana.rodriguez@example.com', role: 'Editor', groups: ['Contenido'], status: 'Activo', lastLogin: '2025-06-11 11:00' },
  { id: 'U-005', name: 'Pedro Sánchez', email: 'pedro.sanchez@example.com', role: 'Contabilidad', groups: ['Finanzas'], status: 'Bloqueado', lastLogin: '2025-06-05 16:45' },
];

const allRoles = [
  { id: 'R-001', name: 'Administrador', description: 'Acceso total a todas las funcionalidades del sistema.' },
  { id: 'R-002', name: 'Editor', description: 'Puede crear, editar y eliminar contenido específico.' },
  { id: 'R-003', name: 'Lector', description: 'Acceso de solo lectura a la mayoría de las secciones.' },
  { id: 'R-004', name: 'Ventas', description: 'Gestión de clientes, pedidos y reportes de ventas.' },
  { id: 'R-005', name: 'Marketing', description: 'Gestión de campañas, contenido y análisis de marketing.' },
  { id: 'R-006', name: 'Contabilidad', description: 'Gestión financiera, facturación y reportes contables.' },
];

const allPermissions = [
  { id: 'P-001', name: 'Ver Dashboard', description: 'Permite ver el panel de control general.' },
  { id: 'P-002', name: 'Editar Usuarios', description: 'Permite modificar la información de los usuarios.' },
  { id: 'P-003', name: 'Crear Usuarios', description: 'Permite añadir nuevos usuarios al sistema.' },
  { id: 'P-004', name: 'Eliminar Usuarios', description: 'Permite borrar usuarios permanentemente.' },
  { id: 'P-005', name: 'Gestionar Roles', description: 'Permite crear, editar y asignar roles.' },
  { id: 'P-006', name: 'Acceder a Ventas', description: 'Permite el acceso al módulo de ventas.' },
  { id: 'P-007', name: 'Crear Campañas Marketing', description: 'Permite diseñar y lanzar campañas de marketing.' },
  { id: 'P-008', name: 'Ver Reportes Financieros', description: 'Permite visualizar los reportes financieros.' },
  { id: 'P-009', name: 'Gestionar Inventario', description: 'Permite modificar y ver el inventario de productos.' },
  { id: 'P-010', name: 'Acceder a Logs del Sistema', description: 'Permite ver los registros de actividad del sistema.' },
];

const rolePermissionsMapping = {
  'Administrador': ['P-001', 'P-002', 'P-003', 'P-004', 'P-005', 'P-006', 'P-007', 'P-008', 'P-009', 'P-010'],
  'Editor': ['P-001', 'P-007'], // Asume que Editor solo edita marketing contenido
  'Lector': ['P-001', 'P-006', 'P-008'],
  'Ventas': ['P-001', 'P-006'],
  'Marketing': ['P-001', 'P-007'],
  'Contabilidad': ['P-001', 'P-008'],
};

const allGroups = [
  { id: 'G-001', name: 'TI', description: 'Equipo de Tecnologías de la Información.' },
  { id: 'G-002', name: 'Ventas', description: 'Departamento de ventas y atención al cliente.' },
  { id: 'G-003', name: 'Marketing', description: 'Equipo de marketing y publicidad.' },
  { id: 'G-004', name: 'Finanzas', description: 'Departamento de contabilidad y finanzas.' },
  { id: 'G-005', name: 'Dirección', description: 'Equipo de dirección y gerencia.' },
  { id: 'G-006', name: 'Contenido', description: 'Equipo de creación de contenido.' },
];


function UserAdminPanel({ onGoToHome }) {
  const [currentTab, setCurrentTab] = useState('users'); // 'users', 'roles', 'groups', 'permissions'
  const [users, setUsers] = useState(allUsers);
  const [roles, setRoles] = useState(allRoles);
  const [groups, setGroups] = useState(allGroups);
  const [permissions, setPermissions] = useState(allPermissions); // Just for display
  const [rolePermissions, setRolePermissions] = useState(rolePermissionsMapping);

  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // null for add, object for edit

  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback((message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  // --- Funciones de Gestión de Usuarios ---
  const handleAddEditUser = (user = null) => {
    setCurrentUser(user);
    setOpenUserDialog(true);
  };

  const handleSaveUser = (formData) => {
    if (currentUser) {
      // Edit existing user
      setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
      showSnackbar('Usuario actualizado con éxito.', 'success');
    } else {
      // Add new user
      const newUser = { id: `U-${(users.length + 1).toString().padStart(3, '0')}`, status: 'Activo', lastLogin: 'Nunca', ...formData };
      setUsers([...users, newUser]);
      showSnackbar('Usuario creado con éxito.', 'success');
    }
    setOpenUserDialog(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
      setUsers(users.filter(u => u.id !== id));
      showSnackbar('Usuario eliminado.', 'info');
    }
  };

  const handleBlockUser = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Bloqueado' ? 'Activo' : 'Bloqueado' } : u));
    showSnackbar('Estado de usuario actualizado.', 'info');
  };

  // --- Funciones de Gestión de Grupos ---
  const handleAddEditGroup = (group = null) => {
    setCurrentGroup(group);
    setOpenGroupDialog(true);
  };

  const handleSaveGroup = (formData) => {
    if (currentGroup) {
      setGroups(groups.map(g => g.id === currentGroup.id ? { ...g, ...formData } : g));
      showSnackbar('Grupo actualizado con éxito.', 'success');
    } else {
      const newGroup = { id: `G-${(groups.length + 1).toString().padStart(3, '0')}`, ...formData };
      setGroups([...groups, newGroup]);
      showSnackbar('Grupo creado con éxito.', 'success');
    }
    setOpenGroupDialog(false);
  };

  const handleDeleteGroup = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este grupo? Los usuarios asignados a él no serán afectados directamente.')) {
      setGroups(groups.filter(g => g.id !== id));
      showSnackbar('Grupo eliminado.', 'info');
    }
  };

  // --- Funciones de Gestión de Roles y Permisos ---
  const handleAddEditRole = (role = null) => {
    setCurrentRole(role);
    if (role) {
      setSelectedRolePermissions(rolePermissions[role.name] || []);
    } else {
      setSelectedRolePermissions([]);
    }
    setOpenRoleDialog(true);
  };

  const handleSaveRole = (formData) => {
    const newRolePermissions = { ...rolePermissions, [formData.name]: selectedRolePermissions };
    setRolePermissions(newRolePermissions);

    if (currentRole) {
      setRoles(roles.map(r => r.id === currentRole.id ? { ...r, ...formData } : r));
      showSnackbar('Rol actualizado con éxito.', 'success');
    } else {
      const newRole = { id: `R-${(roles.length + 1).toString().padStart(3, '0')}`, ...formData };
      setRoles([...roles, newRole]);
      showSnackbar('Rol creado con éxito.', 'success');
    }
    setOpenRoleDialog(false);
  };

  const handleDeleteRole = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este rol? Los usuarios con este rol perderán sus permisos asociados.')) {
      const roleToDelete = roles.find(r => r.id === id);
      if (roleToDelete) {
        const updatedRolePermissions = { ...rolePermissions };
        delete updatedRolePermissions[roleToDelete.name];
        setRolePermissions(updatedRolePermissions);
        setRoles(roles.filter(r => r.id !== id));
        showSnackbar('Rol eliminado.', 'info');
      }
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setSelectedRolePermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
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
          <PeopleAltIcon sx={{ fontSize: 36, mr: 1, color: '#3f51b5' }} /> {/* Azul para Usuarios */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: '#424242' }}>
            Panel de Administración de Usuarios
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            sx={{ textTransform: 'none' }}
          >
            Refrescar Datos
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#3f51b5' }}>
            Gestión Centralizada de Usuarios y Permisos
          </Typography>
          <Typography variant="h6" color="#616161">
            Administra cuentas de usuario, grupos, roles y define accesos avanzados.
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
                backgroundColor: '#3f51b5', // Azul para la barra de la pestaña activa
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                '&.Mui-selected': {
                  color: '#3f51b5', // Color del texto de la pestaña activa
                },
              },
            }}
          >
            <Tab label="Usuarios" value="users" icon={<AccountCircleIcon />} iconPosition="start" />
            <Tab label="Roles" value="roles" icon={<SecurityIcon />} iconPosition="start" />
            <Tab label="Grupos" value="groups" icon={<GroupIcon />} iconPosition="start" />
            <Tab label="Permisos" value="permissions" icon={<VisibilityIcon />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Contenido de las Pestañas */}
        <Box sx={{ p: 0 }}>
          {/* Tab: Panel Administrador de Usuarios */}
          {currentTab === 'users' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountCircleIcon sx={{ color: '#3f51b5', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión de Cuentas de Usuario
                </Typography>
                <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => handleAddEditUser(null)} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Añadir Nuevo Usuario
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Buscar usuario por nombre o email"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: '#616161' }} />,
                  }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel size="small">Estado</InputLabel>
                  <Select label="Estado" size="small" defaultValue="">
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                    <MenuItem value="Bloqueado">Bloqueado</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 600 }}>
                <Table stickyHeader size="medium">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '15%' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '25%' }}>Nombre</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '25%' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Rol</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '15%', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell><Chip label={user.role} size="small" color="primary" /></TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            size="small"
                            color={user.status === 'Activo' ? 'success' : (user.status === 'Inactivo' ? 'default' : 'error')}
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Tooltip title="Editar Usuario">
                            <IconButton size="small" onClick={() => handleAddEditUser(user)}>
                              <EditIcon color="info" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={user.status === 'Bloqueado' ? 'Desbloquear Usuario' : 'Bloquear Usuario'}>
                            <IconButton size="small" onClick={() => handleBlockUser(user.id)}>
                              <BlockIcon color={user.status === 'Bloqueado' ? 'success' : 'warning'} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar Usuario">
                            <IconButton size="small" onClick={() => handleDeleteUser(user.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Total de usuarios: {users.length}
              </Typography>
            </Paper>
          )}

          {/* Tab: Asignación de Roles y Permisos Avanzados */}
          {currentTab === 'roles' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <SecurityIcon sx={{ color: '#ff9800', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Administración de Roles y Permisos
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddEditRole(null)} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Crear Nuevo Rol
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                {roles.map((role) => (
                  <Grid item xs={12} md={6} lg={4} key={role.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: '5px solid #3f51b5' }}>
                      <CardHeader
                        avatar={<SecurityIcon sx={{ color: '#3f51b5' }} />}
                        title={<Typography variant="h6" sx={{ fontWeight: 600 }}>{role.name}</Typography>}
                        action={
                          <Box>
                            <Tooltip title="Editar Rol">
                              <IconButton size="small" onClick={() => handleAddEditRole(role)}>
                                <EditIcon color="info" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Rol">
                              <IconButton size="small" onClick={() => handleDeleteRole(role.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                        sx={{ p: 0, pb: 1, mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {role.description}
                      </Typography>
                      <Accordion elevation={0} sx={{ bgcolor: '#fafafa', border: '1px solid #e0e0e0' }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5' }}>
                          <VisibilityIcon sx={{ mr: 1, color: '#616161' }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Permisos Asignados ({rolePermissions[role.name]?.length || 0})
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense>
                            {rolePermissions[role.name]?.length > 0 ? (
                              rolePermissions[role.name].map((permId) => {
                                const perm = allPermissions.find(p => p.id === permId);
                                return perm ? (
                                  <ListItem key={perm.id}>
                                    <ListItemIcon><CheckCircleOutlineIcon sx={{ fontSize: 18, color: '#4caf50' }} /></ListItemIcon>
                                    <ListItemText primary={perm.name} />
                                  </ListItem>
                                ) : null;
                              })
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                No hay permisos asignados a este rol.
                              </Typography>
                            )}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Tab: Grupos de Usuarios */}
          {currentTab === 'groups' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <GroupIcon sx={{ color: '#4caf50', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Gestión de Grupos de Usuarios
                </Typography>
                <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => handleAddEditGroup(null)} sx={{ textTransform: 'none', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                  Crear Nuevo Grupo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Grid container spacing={3}>
                {groups.map((group) => (
                  <Grid item xs={12} md={6} lg={4} key={group.id}>
                    <Card elevation={2} sx={{ p: 2, height: '100%', borderLeft: '5px solid #4caf50' }}>
                      <CardHeader
                        avatar={<GroupIcon sx={{ color: '#4caf50' }} />}
                        title={<Typography variant="h6" sx={{ fontWeight: 600 }}>{group.name}</Typography>}
                        action={
                          <Box>
                            <Tooltip title="Editar Grupo">
                              <IconButton size="small" onClick={() => handleAddEditGroup(group)}>
                                <EditIcon color="info" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar Grupo">
                              <IconButton size="small" onClick={() => handleDeleteGroup(group.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                        sx={{ p: 0, pb: 1, mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {group.description}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        Miembros: **{users.filter(u => u.groups.includes(group.name)).length}**
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* Tab: Listado de Permisos Detallados */}
          {currentTab === 'permissions' && (
            <Paper elevation={4} sx={{ p: 4, mb: 4, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <VisibilityIcon sx={{ color: '#616161', fontSize: 30, mr: 1 }} />
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600, color: '#333' }}>
                  Catálogo de Permisos del Sistema
                </Typography>
                <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ textTransform: 'none' }}>
                  Recargar Catálogo
                </Button>
              </Box>
              <Divider sx={{ mb: 3, bgcolor: '#e0e0e0' }} />

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Aquí se listan todos los permisos disponibles en el sistema. Estos permisos se asignan a los roles para definir el acceso de los usuarios.
              </Typography>

              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', maxHeight: 600 }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, width: '10%' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '30%' }}>Nombre del Permiso</TableCell>
                      <TableCell sx={{ fontWeight: 700, width: '60%' }}>Descripción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allPermissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell>{permission.id}</TableCell>
                        <TableCell>{permission.name}</TableCell>
                        <TableCell>{permission.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Total de permisos definidos: {allPermissions.length}
              </Typography>
            </Paper>
          )}
        </Box>
      </Container>

      {/* Dialog para Añadir/Editar Usuario */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          {currentUser ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre Completo"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentUser?.name || ''}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            defaultValue={currentUser?.email || ''}
            onChange={(e) => setCurrentUser(prev => ({ ...prev, email: e.target.value }))}
            sx={{ mb: 2 }}
          />
          {!currentUser && ( // Solo para creación de usuario nuevo
            <TextField
              margin="dense"
              label="Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
          )}
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Rol</InputLabel>
            <Select
              label="Rol"
              defaultValue={currentUser?.role || ''}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, role: e.target.value }))}
            >
              {roles.map(role => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Grupos (opcional)</InputLabel>
            <Select
              label="Grupos (opcional)"
              multiple
              value={currentUser?.groups || []}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, groups: e.target.value }))}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {groups.map(group => (
                <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {currentUser && (
            <FormControlLabel
              control={
                <Switch
                  checked={currentUser.status === 'Activo'}
                  onChange={(e) => setCurrentUser(prev => ({ ...prev, status: e.target.checked ? 'Activo' : 'Inactivo' }))}
                  color="primary"
                />
              }
              label="Usuario Activo"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={() => handleSaveUser(currentUser)} variant="contained" color="primary">
            {currentUser ? 'Guardar Cambios' : 'Crear Usuario'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Añadir/Editar Grupo */}
      <Dialog open={openGroupDialog} onClose={() => setOpenGroupDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          {currentGroup ? 'Editar Grupo' : 'Crear Nuevo Grupo'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Grupo"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentGroup?.name || ''}
            onChange={(e) => setCurrentGroup(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descripción del Grupo"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            defaultValue={currentGroup?.description || ''}
            onChange={(e) => setCurrentGroup(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={() => handleSaveGroup(currentGroup)} variant="contained" color="primary">
            {currentGroup ? 'Guardar Cambios' : 'Crear Grupo'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Añadir/Editar Rol y Asignar Permisos */}
      <Dialog open={openRoleDialog} onClose={() => setOpenRoleDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#f5f5f5', color: '#333' }}>
          {currentRole ? 'Editar Rol y Permisos' : 'Crear Nuevo Rol y Asignar Permisos'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Rol"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={currentRole?.name || ''}
            onChange={(e) => setCurrentRole(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descripción del Rol"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            defaultValue={currentRole?.description || ''}
            onChange={(e) => setCurrentRole(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Asignar Permisos a este Rol:
          </Typography>
          <Grid container spacing={2}>
            {allPermissions.map((permission) => (
              <Grid item xs={12} sm={6} md={4} key={permission.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRolePermissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      name={permission.name}
                      color="primary"
                    />
                  }
                  label={permission.name}
                  sx={{ width: '100%', '& .MuiFormControlLabel-label': { fontSize: '0.9rem' } }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, display: 'block' }}>
                  {permission.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleDialog(false)} color="secondary">Cancelar</Button>
          <Button onClick={() => handleSaveRole(currentRole)} variant="contained" color="primary">
            {currentRole ? 'Guardar Cambios' : 'Crear Rol'}
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

export default UserAdminPanel;