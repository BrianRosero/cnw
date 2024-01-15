import React, { useState, ChangeEvent } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Ajusta el ancho según tus necesidades
  const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      {/* Pestañas flotantes */}
      <Box
        position="fixed"
        top={67}
        left={67}
        right={0}
        zIndex={1000}
        bgcolor="#012169" // Cambia el color de fondo de las pestañas
        borderRadius="8px" // Añade bordes redondeados
      >
        <Tabs value={tabValue} onChange={handleTabChange} >
            <Tab
              label={`Tickets`}
              sx={{
                bgcolor: tabValue === 0 ? '#5AAD41' : '#012169', // Cambia a un color más claro cuando está seleccionada
                color: '#ffffff',
                borderRadius: '8px', // Añade bordes redondeados
              }}
            />
          <Tab
            label={`Pestaña 2`}
            sx={{
              bgcolor: tabValue === 1 ? '#5AAD41' : '#012169', // Cambia a un color más claro cuando está seleccionada
              color: '#ffffff',
              borderRadius: '8px', // Añade bordes redondeados
            }}
          />
          <Tab
            label={`Pestaña 3`}
            sx={{
              bgcolor: tabValue === 2 ? '#5AAD41' : '#012169', // Cambia a un color más claro cuando está seleccionada
              color: '#ffffff',
              borderRadius: '8px', // Añade bordes redondeados
            }}
          />
          <Tab
            label={`Pestaña 4`}
            sx={{
              bgcolor: tabValue === 3 ? '#5AAD41' : '#012169', // Cambia a un color más claro cuando está seleccionada
              color: '#ffffff',
              borderRadius: '8px', // Añade bordes redondeados
            }}
          />
        </Tabs>
      </Box>

      {/* Contenido de la página con tarjetas responsivas */}
      <Grid container style={{ marginTop: '10px', paddingLeft: isSmallScreen ? '69px' : '69px' }} spacing={2}>
        {[...Array(5)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ minWidth: '67px' }}>
              <CardContent>
                {/* Contenido dinámico según la pestaña seleccionada */}
                {tabValue === 0 && (
                  <>
                    <h1>Contenido de la Pestaña 1</h1>
                    <p>Contenido específico de la Pestaña 1...</p>
                  </>
                )}
                {tabValue === 1 && (
                  <>
                    <h1>Contenido de la Pestaña 2</h1>
                    <p>Contenido específico de la Pestaña 2...</p>
                  </>
                )}
                {tabValue === 2 && (
                  <>
                    <h1>Contenido de la Pestaña 3</h1>
                    <p>Contenido específico de la Pestaña 3...</p>
                  </>
                )}
                {tabValue === 3 && (
                  <>
                    <h1>Contenido de la Pestaña 4</h1>
                    <p>Contenido específico de la Pestaña 4...</p>
                  </>
                )}
                {tabValue === 4 && (
                  <>
                    <h1>Contenido de la Pestaña 5</h1>
                    <p>Contenido específico de la Pestaña 5...</p>
                  </>
                )}
                {tabValue === 5 && (
                  <>
                    <h1>Contenido de la Pestaña 6</h1>
                    <p>Contenido específico de la Pestaña 6...</p>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
