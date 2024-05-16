import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

// Importar componentes de gráficos
import Barra from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Donut from '@/views/pages/ESECENTRO/Sensores/CLOCOSMIAP01.jsx';
import Area from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Linea from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Consumo from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Info from '@/views/pages/COSMITET/Sensores/sensor1.jsx';

const HomePage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Barra/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={9}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Donut/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Area/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Linea/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Consumo/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Info/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Linea/>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
