/*
import React from 'react';
import { Grid, Card, CardContent, Typography, Divider, Box } from '@mui/material';
import Chart from 'react-apexcharts';

const data = [
  {
    id: 1,
    name: 'Equipo 1',
    cpuReady: 10,
    cpuUsage: 50,
    diskRead: 100,
    diskUsage: 60,
    diskWrite: 80,
    memoryActive: 2000,
    memoryConsumed: 1000,
    memoryPercent: 50,
    networkReceived: 500,
    networkTransmitted: 700,
    networkUsage: 60,
  },
  // Agrega datos de más equipos aquí
];

const cardStyle = {
  maxWidth: 400,
  margin: 'auto',
  marginBottom: 20,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
  },
};

const chartContainerStyle = {
  marginTop: 16,
};

const MachineCard = ({ machine }) => {
  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {machine.name}
        </Typography>
        <Divider style={{ margin: '16px 0' }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">CPU</Typography>
            <Typography color="textSecondary">Ready: {machine.cpuReady}%</Typography>
            <Typography color="textSecondary">Usage: {machine.cpuUsage}%</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Memory</Typography>
            <Typography color="textSecondary">Active: {machine.memoryActive}</Typography>
            <Typography color="textSecondary">Consumed: {machine.memoryConsumed}</Typography>
            <Typography color="textSecondary">Usage: {machine.memoryPercent}%</Typography>
          </Grid>
        </Grid>
        <Divider style={{ margin: '16px 0' }} />
        <Box style={chartContainerStyle}>
          <Typography variant="h6">Disk</Typography>
          <Chart
            options={{
              chart: { id: `disk-chart-${machine.id}` },
              xaxis: { categories: ['Read', 'Usage', 'Write'] },
            }}
            series={[{ name: 'Value', data: [machine.diskRead, machine.diskUsage, machine.diskWrite] }]}
            type="bar"
            height={200}
          />
        </Box>
        <Box style={chartContainerStyle}>
          <Typography variant="h6">Network</Typography>
          <Chart
            options={{
              chart: { id: `network-chart-${machine.id}` },
              xaxis: { categories: ['Received', 'Transmitted', 'Usage'] },
            }}
            series={[{ name: 'Value', data: [machine.networkReceived, machine.networkTransmitted, machine.networkUsage] }]}
            type="bar"
            height={200}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const MachineList = () => {
  return (
    <Grid container spacing={3}>
      {data.map(machine => (
        <Grid item xs={12} md={4} key={machine.id}>
          <MachineCard machine={machine} />
        </Grid>
      ))}
    </Grid>
  );
};

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Datos de los equipos
      </Typography>
      <MachineList />
    </div>
  );
};

export default App;
*/


import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { CardContent, CardActionArea } from '@mui/material';

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Grid adaptable
    gap: '10px', // Espaciado entre tarjetas
    justifyContent: 'center', // Centra las tarjetas horizontalmente
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  slide4: {
    backgroundColor: '#1b3f5c',
  },
  card: {
    margin: '10px',
    width: '100%', // Ocupa todo el ancho de su contenedor
  },
};

const DemoTabs = () => {
  const [index, setIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  return (
    <Box>
      <Tabs value={index} onChange={handleChange} style={styles.tabs} variant="fullWidth">
        <Tab label="Productivo" />
        <Tab label="Pruebas" />
        <Tab label="Desarrollo" />
        <Tab label="Bases de datos" />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div style={{ ...styles.slide, ...styles.slide1 }}>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide2 }}>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide3 }}>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide4 }}>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
          <CardActionArea style={styles.card}>
            <CardContent>
              Contenido de la tarjeta
            </CardContent>
          </CardActionArea>
        </div>
      </SwipeableViews>
    </Box>
  );
};

export default DemoTabs;
