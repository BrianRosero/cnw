import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, Grid, Box } from '@mui/material';
import { CheckCircleOutline as CheckIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
import GraficoServidor1 from '../ESECENTRO/Sensores/COCLOSMIAP01.jsx';
import GraficoServidor2 from '../ESECENTRO/Sensores/COCLOSMIAP05.jsx';
import GraficoServidor3 from '../ESECENTRO/Sensores/COCLOSMIAP04.jsx';

const colors = {
  active: '#64B5F6',
  inactive: '#E57373',
  background: '#ffffff',
  button: '#004a8f',
  textWhite: '#FFFFFF',
  hoverRed: '#5AAE41',
};

const Dashboard = () => {
  const [servidores] = useState([
    { id: 1, nombre: 'Servidor 1', estado: 'Activo', carga: 75, usuarios: 102 },
    { id: 2, nombre: 'Servidor 2', estado: 'Inactivo', carga: 0, usuarios: 0 },
    { id: 3, nombre: 'Servidor 3', estado: 'Activo', carga: 60, usuarios: 50 },
  ]);
  const [servidorSeleccionado, setServidorSeleccionado] = useState(null);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState(null);

  const handleServidorClick = (servidor) => {
    setServidorSeleccionado(servidor);
    setGraficoSeleccionado(null);
  };

  const handleGraficoClick = (id) => {
    setGraficoSeleccionado(id);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: colors.background }}>
      <Typography variant="h1" sx={{ textAlign: 'center', marginBottom: '20px', color: colors.button }}>Dashboard</Typography>
      <Card style={{ marginBottom: 20, backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Typography variant="h5" component="h2" sx={{ color: colors.button, marginBottom: '20px' }}>Servidores</Typography>
              <List sx={{ backgroundColor: colors.background, borderRadius: '8px', padding: '10px' }}>
                {servidores.map((servidor) => (
                  <ListItem
                    key={servidor.id}
                    button
                    onClick={() => handleServidorClick(servidor)}
                    sx={{
                      marginBottom: '10px',
                      borderRadius: '4px',
                      backgroundColor: servidorSeleccionado === servidor ? colors.button : '#fff',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: colors.hoverRed,
                        color: '#fff',
                      }
                    }}
                  >
                    <Typography variant="body1" style={{ color: servidorSeleccionado === servidor ? colors.textWhite : 'inherit' }}>
                      {servidor.nombre} - Estado: {servidor.estado}
                    </Typography>
                    {servidor.estado === 'Activo' ? (
                      <CheckIcon sx={{ color: colors.active, marginLeft: 'auto' }} />
                    ) : (
                      <ErrorIcon sx={{ color: colors.inactive, marginLeft: 'auto' }} />
                    )}
                  </ListItem>
                ))}
              </List>
              {servidorSeleccionado && (
                <ServidorDetalles servidor={servidorSeleccionado} onGraficoClick={handleGraficoClick} />
              )}
            </Grid>
            {graficoSeleccionado && (
              <Grid item xs={12} md={9}>
                <GraficoDetalle id={graficoSeleccionado} />
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
      onClick={() => onGraficoClick(servidor.id)}
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

const GraficoDetalle = ({ id }) => (
  <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    {id === 1 && <GraficoServidor1 />}
    {id === 2 && <GraficoServidor2 />}
    {id === 3 && <GraficoServidor3 />}
  </CardContent>
);

export default Dashboard;
