import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, Grid, Box } from '@mui/material';
import { CheckCircleOutline as CheckIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import GraficoServidor1 from './CLOCOSMIAP01.jsx';
import GraficoServidor2 from './CLOCOSMIAP02.jsx';
import GraficoServidor3 from './CLOCOSMIAP03.jsx';

// Definimos una paleta de colores inspirada en Monday.com
const colors = {
  active: '#64B5F6',
  inactive: '#E57373',
  background: '#ffffff',
  button: '#004a8f',
  textWhite: '#FFFFFF',
  hoverRed: '#FF0000', // Nuevo color rojo para el hover
};

const Dashboard = () => {
  const [servidores] = useState([
    { id: 1, nombre: 'Servidor 1', estado: 'Activo', carga: 75, usuarios: 102 },
    { id: 2, nombre: 'Servidor 2', estado: 'Inactivo', carga: 0, usuarios: 0 },
    { id: 3, nombre: 'Servidor 3', estado: 'Activo', carga: 60, usuarios: 50 },
    // Agrega más servidores con datos simulados
  ]);
  const [servidorSeleccionado, setServidorSeleccionado] = useState(null);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState(null);

  const handleServidorClick = (servidor) => {
    setServidorSeleccionado(servidor);
    // Restablecer el gráfico seleccionado cuando se cambia de servidor
    setGraficoSeleccionado(null);
  };

  const handleGraficoClick = (grafico) => {
    setGraficoSeleccionado(grafico);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.background }}>
      <Typography variant="h1" sx={{ textAlign: 'center', marginBottom: '20px', color: colors.active }}>Dashboard Futurista</Typography>
      <Card style={{ marginBottom: 20, backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="h5" component="h2" sx={{ color: colors.active, marginBottom: '20px' }}>Servidores</Typography>
              <List sx={{ backgroundColor: colors.background, borderRadius: '8px', padding: '10px' }}>
                {servidores.map((servidor) => (
                  <ListItem
                    key={servidor.id}
                    button
                    onClick={() => handleServidorClick(servidor)}
                    sx={{
                      marginBottom: '10px',
                      borderRadius: '4px',
                      backgroundColor: servidorSeleccionado === servidor ? colors.button : '#FFFFFF',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: colors.hoverRed,
                      }
                    }}
                  >
                    <Typography variant="body1" className={servidor.estado === 'Activo' ? 'activo' : ''} style={{ color: servidorSeleccionado === servidor ? colors.textWhite : 'inherit' }}>{servidor.nombre} - Estado: {servidor.estado}</Typography>
                    {servidor.estado === 'Activo' ? <CheckIcon sx={{ color: colors.active, marginLeft: 'auto' }} /> : <ErrorIcon sx={{ color: colors.inactive, marginLeft: 'auto' }} />}
                  </ListItem>

                ))}
              </List>
              {servidorSeleccionado && (
                <ServidorDetalles servidor={servidorSeleccionado} onGraficoClick={handleGraficoClick} />
              )}
            </Grid>
            {graficoSeleccionado && (
              <Grid item xs={12} md={9}>
                <GraficoDetalle grafico={graficoSeleccionado} />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const ServidorDetalles = ({ servidor, onGraficoClick }) => (
  <div>
    <Typography variant="h6" gutterBottom>Detalles de {servidor.nombre}</Typography>
    <Typography variant="body1" gutterBottom>Estado: {servidor.estado}</Typography>
    <Typography variant="body1" gutterBottom>Carga promedio: {servidor.carga}%</Typography>
    <Typography variant="body1" gutterBottom>Usuarios conectados: {servidor.usuarios}</Typography>
    <Button
      onClick={() => onGraficoClick(`Grafico${servidor.id}`)}
      disabled={!servidor}
      sx={{
        marginTop: '20px',
        backgroundColor: colors.button,
        color: '#FFF',
        '&:hover': {
          backgroundColor: colors.hoverRed,
        }
      }}
    >
      Ver Gráfico
    </Button>
  </div>
);

const GraficoDetalle = ({ grafico }) => (
  <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    {grafico === 'Grafico1' && <GraficoServidor1 />}
    {grafico === 'Grafico2' && <GraficoServidor2 />}
    {grafico === 'Grafico3' && <GraficoServidor3 />}
  </CardContent>
);

// Suponiendo que GraficoServidor1, GraficoServidor2 y GraficoServidor3 son componentes de gráficos específicos para cada servidor
// Debes sustituir estos componentes por los reales que tengas en tu aplicación.

export default Dashboard;
