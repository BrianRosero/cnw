import React from 'react';
import { Typography, Box, Switch, Divider, List, ListItem, ListItemText, Checkbox, FormControlLabel, Button, Grid, Container, Paper } from '@mui/material';

function ProfileSettings() {
  return (
      <Box elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Configuración de correo electrónico</Typography>

        {/* Configurar notificación por correo electrónico */}
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight="bold">Configurar notificación por correo electrónico</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Notificación por correo electrónico" />
          <FormControlLabel control={<Switch />} label="Enviar copia a correo electrónico personal" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Correos electrónicos relacionados con la actividad */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">CORREOS ELECTRÓNICOS RELACIONADOS CON LA ACTIVIDAD</Typography>
          <Typography variant="body2" color="textSecondary">¿Cuándo enviar un correo electrónico?</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Tener nuevas notificaciones" />
          <FormControlLabel control={<Switch />} label="Te enviaron un mensaje directo" />
          <FormControlLabel control={<Switch defaultChecked />} label="Alguien te agrega como conexión" />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>¿Cuándo escalar correos electrónicos?</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Por nuevo pedido" />
          <FormControlLabel control={<Switch defaultChecked />} label="Aprobación de nueva membresía" />
          <FormControlLabel control={<Switch />} label="Registro de miembros" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Actualizaciones de la notificación del sistema */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">ACTUALIZACIONES DE LA NOTIFICACIÓN DEL SISTEMA</Typography>
          <Typography variant="body2" color="textSecondary">¿Enviarme un correo electrónico con?</Typography>
          <List dense>
            {[
              "Noticias sobre los productos y actualizaciones de funciones de PCT-themes",
              "Consejos para sacar el máximo partido a los temas del PCT",
              "Cosas que te perdiste desde la última vez que iniciaste sesión en PCT-themes",
              "Noticias sobre productos y otros servicios",
              "Consejos y documentación de productos empresariales"
            ].map((text, index) => (
              <ListItem key={index}>
                <FormControlLabel control={<Checkbox defaultChecked={index < 2} />} label={text} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Opciones de seguridad */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">SEGURIDAD</Typography>
          <FormControlLabel control={<Switch />} label="Requerir autenticación de dos factores al iniciar sesión" />
          <FormControlLabel control={<Switch />} label="Alertarme sobre inicios de sesión desde dispositivos desconocidos" />
          <FormControlLabel control={<Switch />} label="Cerrar automáticamente sesiones inactivas después de 30 minutos" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Personalización de la cuenta */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">PERSONALIZACIÓN DE LA CUENTA</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Modo oscuro" />
          <FormControlLabel control={<Switch />} label="Activar sonidos de notificación" />
          <FormControlLabel control={<Switch />} label="Mostrar sugerencias personalizadas" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Preferencias de privacidad */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">PRIVACIDAD</Typography>
          <FormControlLabel control={<Switch />} label="Hacer mi perfil visible para otros usuarios" />
          <FormControlLabel control={<Switch defaultChecked />} label="Permitir que otros me envíen mensajes" />
          <FormControlLabel control={<Switch />} label="Permitir que las empresas se pongan en contacto conmigo" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Botones de acción */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
          <Button variant="contained" color="primary">Actualizar</Button>
          <Button variant="text">Claro</Button>
        </Box>
      </Box>
  );
}

export default ProfileSettings;
