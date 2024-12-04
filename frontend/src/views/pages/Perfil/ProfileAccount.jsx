import React from 'react';
import { Typography, Box, Switch, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Grid } from '@mui/material';
import { CheckCircle, Circle, Cancel } from '@mui/icons-material';

function ProfileAccount() {
  return (
    <Box sx={{ p: 3, margin: 'auto' }}>
      <Typography variant="h6" fontWeight="bold">Configuración avanzada</Typography>

      {/* Navegación Segura */}
      <Box mt={3}>
        <Typography variant="subtitle1" fontWeight="bold">NAVEGACIÓN SEGURA</Typography>
        <Typography variant="body2">Navegación segura (https) cuando sea necesario</Typography>
        <Switch defaultChecked={false} color="primary" />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Notificaciones de Inicio de Sesión */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">NOTIFICACIONES DE INICIO DE SESIÓN</Typography>
        <Typography variant="body2">Notificar cuando se intenta iniciar sesión desde otro lugar</Typography>
        <Switch defaultChecked={false} color="primary" />
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Aprobaciones de Inicio de Sesión
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">APROBACIONES DE INICIO DE SESIÓN</Typography>
        <Typography variant="body2">No se requieren aprobaciones cuando se inicia sesión desde dispositivos no reconocidos.</Typography>
        <Switch defaultChecked={true} color="primary" />
      </Box>

      <Divider sx={{ my: 2 }} /> */}

      {/* Dispositivos Reconocidos */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">DISPOSITIVOS RECONOCIDOS</Typography>
        <List>
          {[
            { name: 'Escritorio Cent', location: '4351 Deans Lane, Chelmsford', status: 'Activo actual' },
            { name: 'Tableta Imho', location: '4185 Michigan Avenue', status: 'Activo hace 5 días' },
            { name: 'Albs Mobile', location: '3462 Fairfax Drive, Montcalm', status: 'Activo hace 1 mes' }
          ].map((device, index) => (
            <ListItem key={index}>
              <ListItemText primary={device.name} secondary={device.location} />
              <ListItemSecondaryAction>
                <Typography variant="body2" color="textSecondary">{device.status}</Typography>
                <Button variant="text" color="error">✖</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Sesiones Activas */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">SESIONES ACTIVAS</Typography>
        <List>
          {[
            { name: 'Escritorio Ceto', location: '4351 Deans Lane, Chelmsford' },
            { name: 'Tableta lunar', location: '4185 Michigan Avenue' }
          ].map((session, index) => (
            <ListItem key={index}>
              <ListItemText primary={session.name} secondary={session.location} />
              <ListItemSecondaryAction>
                <Button variant="text" color="error">Cerrar Sesión</Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Botón de actualización */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="contained" color="primary">Actualizar Perfil</Button>
        <Button variant="text">Claro</Button>
      </Box>
    </Box>
  );
}

export default ProfileAccount;
