import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Importar componentes de gráficos
import Barra from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Donut from '@/views/pages/ESECENTRO/Sensores/COCLOSMIAP04.jsx';
import Area from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Linea from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Consumo from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Info from '@/views/pages/COSMITET/Sensores/sensor1.jsx';

const StyledCard = styled(Card)(({ theme }) => ({
  background: '#fff',
  borderRadius: '8px',
  // boxShadow: '5px 5px 10px #004a8f, -5px -5px 10px #004a8f',
  color: '#fff',
  overflow: 'hidden',
}));

const HomePage = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={15} height="20%">
          <StyledCard>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Donut />
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={2} md={3}>
          <StyledCard>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Barra />
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Area />
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Linea />
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Consumo />
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Info />
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Linea />
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
