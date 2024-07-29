import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Info1 from './Sensores/COCLOCOSMIBD01/info.jsx';
import RadialBar1 from './Sensores/COCLOCOSMIBD01/bar.jsx';
import Area1 from './Sensores/COCLOCOSMIBD01/area.jsx';
import Info2 from './Sensores/COCLOCOSMIBD02/info.jsx';
import RadialBar2 from './Sensores/COCLOCOSMIBD02/bar.jsx';
import Area2 from './Sensores/COCLOCOSMIBD02/area.jsx';
import Info3 from './Sensores/COCLOCOSMIBD03/info.jsx';
import RadialBar3 from './Sensores/COCLOCOSMIBD03/bar.jsx';
import Area3 from './Sensores/COCLOCOSMIBD03/area.jsx';
import Info4 from './Sensores/COCLOCOSMIBD04/info.jsx';
import RadialBar4 from './Sensores/COCLOCOSMIBD04/bar.jsx';
import Area4 from './Sensores/COCLOCOSMIBD04/area.jsx';

import Info5 from './Sensores/COCLOCOSMIAP02/info.jsx';
import RadialBar5 from './Sensores/COCLOCOSMIAP02/bar.jsx';
import Area5 from './Sensores/COCLOCOSMIAP02/area.jsx';
import Info6 from './Sensores/COCLOCOSMIAP05/info.jsx';
import RadialBar6 from './Sensores/COCLOCOSMIAP05/bar.jsx';
import Area6 from './Sensores/COCLOCOSMIAP05/area.jsx';
import Info7 from './Sensores/COCLOCOSMIAP06/info.jsx';
import RadialBar7 from './Sensores/COCLOCOSMIAP06/bar.jsx';
import Area7 from './Sensores/COCLOCOSMIAP06/area.jsx';
import Info8 from './Sensores/COCLOCOSMIAP07/info.jsx';
import RadialBar8 from './Sensores/COCLOCOSMIAP07/bar.jsx';
import Area8 from './Sensores/COCLOCOSMIAP07/area.jsx';

import Info9 from './Sensores/COCLOCOSMISTG01/info.jsx';
import RadialBar9 from './Sensores/COCLOCOSMISTG01/bar.jsx';
import Area9 from './Sensores/COCLOCOSMISTG01/area.jsx';

import Info10 from './Sensores/COCLOCOSMIFI01/info.jsx';
import RadialBar10 from './Sensores/COCLOCOSMIFI01/bar.jsx';
import Area10 from './Sensores/COCLOCOSMIFI01/area.jsx';

import Info11 from './Sensores/COCLOCOSMIBK01/info.jsx';
import RadialBar11 from './Sensores/COCLOCOSMIBK01/bar.jsx';
import Area11 from './Sensores/COCLOCOSMIBK01/area.jsx';

import Info12 from './Sensores/COCLOCOSMIREP02/info.jsx';
import RadialBar12 from './Sensores/COCLOCOSMIREP02/bar.jsx';
import Area12 from './Sensores/COCLOCOSMIREP02/area.jsx';
import Info13 from './Sensores/COCLOCOSMIREP03/info.jsx';
import RadialBar13 from './Sensores/COCLOCOSMIREP03/bar.jsx';
import Area13 from './Sensores/COCLOCOSMIREP03/area.jsx';

import Info14 from './Sensores/COCLOCOSMIDES01/info.jsx';
import RadialBar14 from './Sensores/COCLOCOSMIDES01/bar.jsx';
import Area14 from './Sensores/COCLOCOSMIDES01/area.jsx';
import Info15 from './Sensores/COCLOCOSMIAST03/info.jsx';
import RadialBar15 from './Sensores/COCLOCOSMIAST03/bar.jsx';
import Area15 from './Sensores/COCLOCOSMIAST03/area.jsx';
import Info16 from './Sensores/COCLOCOSMIAST04/info.jsx';
import RadialBar16 from './Sensores/COCLOCOSMIAST04/bar.jsx';
import Area16 from './Sensores/COCLOCOSMIAST04/area.jsx';


const styles = {
  tabs: {
    background: '#fff',
    borderRadius: '8px',
  },
  indicator: {
    backgroundColor: '#d3256b',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    justifyContent: 'center',
  },
  card: {
    margin: '10px',
    width: '100%',
    backgroundColor: '#214092',
    borderRadius: '8px',
    color: '#fff',
  },
  selectedCard: {
    backgroundColor: '#d3256b',
    color: 'white',
  },
  graficoContainer: {
    marginTop: '20px',
    backgroundColor: '#EEF2F6',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },
};

const activeTabStyle = {
  color: '#d3256b',
  fontWeight: 'bold',
};

const DragHandle = styled('div')({
  width: '100%',
  height: '5%',
  position: 'absolute',
  cursor: 'move',
  backgroundColor: 'rgb(255,255,255)',
});

const DragHandleTopLeft = styled(DragHandle)({
  top: 0,
  left: 0,
});

const DragHandleTopRight = styled(DragHandle)({
  top: 0,
  right: 0,
});

const DragHandleBottomLeft = styled(DragHandle)({
  bottom: 0,
  left: 0,
});

const DragHandleBottomRight = styled(DragHandle)({
  bottom: 0,
  right: 0,
});

const ResponsiveGridLayout = WidthProvider(Responsive);

const DemoTabs = () => {
  const [index, setIndex] = useState(0);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState('COCLOCOSMIBD01');

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const handleCardClick = (id) => {
    console.log(`Card clicked: ${id}`); // Debug: Mostrar el id de la tarjeta clicada
    setGraficoSeleccionado(id);
  };

  const defaultLayout = [
    { i: '1', x: 0, y: 0, w: 3, h: 7 },
    { i: '2', x: 4, y: 0, w: 9, h: 2 },
    { i: 'server2', x: 6, y: 0, w: 2, h: 2 },
    { i: 'server3', x: 8, y: 0, w: 2, h: 2 },
    { i: 'server4', x: 10, y: 0, w: 2, h: 2 },
    { i: '3', x: 4, y: 2, w: 9, h: 5 },
  ];

  // Función para obtener el componente basado en la selección actual
  const getComponent = (type) => {
    console.log(`Fetching ${type} for selected graph: ${graficoSeleccionado}`);
    switch (graficoSeleccionado) {
      case 'COCLOCOSMIBD01':
        return type === 'RadialBar' ? <RadialBar1 /> : type === 'Info' ? <Info1 /> : <Area1 />;
      case 'COCLOCOSMIBD02':
        return type === 'RadialBar' ? <RadialBar2 /> : type === 'Info' ? <Info2 /> : <Area2 />;
      case 'COCLOCOSMIBD03':
        return type === 'RadialBar' ? <RadialBar3 /> : type === 'Info' ? <Info3 /> : <Area3 />;
      case 'COCLOCOSMIBD04':
        return type === 'RadialBar' ? <RadialBar4 /> : type === 'Info' ? <Info4 /> : <Area4 />;
      case 'COCLOCOSMIAP02':
        return type === 'RadialBar' ? <RadialBar5 /> : type === 'Info' ? <Info5 /> : <Area5 />;
      case 'COCLOCOSMIAP05':
        return type === 'RadialBar' ? <RadialBar6 /> : type === 'Info' ? <Info6 /> : <Area6 />;
      case 'COCLOCOSMIAP06':
        return type === 'RadialBar' ? <RadialBar7 /> : type === 'Info' ? <Info7 /> : <Area7 />;
      case 'COCLOCOSMIAP07':
        return type === 'RadialBar' ? <RadialBar8 /> : type === 'Info' ? <Info8 /> : <Area8 />;
      case 'COCLOCOSMISTG01':
        return type === 'RadialBar' ? <RadialBar9 /> : type === 'Info' ? <Info9 /> : <Area9 />;
      case 'COCLOCOSMIFI01':
        return type === 'RadialBar' ? <RadialBar10 /> : type === 'Info' ? <Info10 /> : <Area10 />;
      case 'COCLOCOSMIBK01':
        return type === 'RadialBar' ? <RadialBar11 /> : type === 'Info' ? <Info11 /> : <Area11 />;
      case 'COCLOCOSMIREP02':
        return type === 'RadialBar' ? <RadialBar12 /> : type === 'Info' ? <Info12 /> : <Area12 />;
      case 'COCLOCOSMIREP03':
        return type === 'RadialBar' ? <RadialBar13 /> : type === 'Info' ? <Info13 /> : <Area13 />;
      case 'COCLOCOSMIDES01':
        return type === 'RadialBar' ? <RadialBar14 /> : type === 'Info' ? <Info14 /> : <Area14 />;
      case 'COCLOCOSMIAST03':
        return type === 'RadialBar' ? <RadialBar15 /> : type === 'Info' ? <Info15 /> : <Area15 />;
      case 'COCLOCOSMIAST04':
        return type === 'RadialBar' ? <RadialBar16 /> : type === 'Info' ? <Info16 /> : <Area16 />;
      default:
        return null;
    }
  };

  const tabLabels = [
    'Bases de datos',
    'Aplicativos',
    'Storage',
    'Financiero',
    'Backup',
    'Replica',
    'Desarrollo',
  ];

  const cards = [
    ['COCLOCOSMIBD01', 'COCLOCOSMIBD02', 'COCLOCOSMIBD03', 'COCLOCOSMIBD04'],
    ['COCLOCOSMIAP02', 'COCLOCOSMIAP05', 'COCLOCOSMIAP06', 'COCLOCOSMIAP07'],
    ['COCLOCOSMISTG01'],
    ['COCLOCOSMIFI01'],
    ['COCLOCOSMIBK01'],
    ['COCLOCOSMIREP02', 'COCLOCOSMIREP03'],
    ['COCLOCOSMIDES01', 'COCLOCOSMIAST03', 'COCLOCOSMIAST04'],
  ];

  return (
    <Box>
      <Tabs
        value={index}
        onChange={handleChange}
        style={styles.tabs}
        variant="fullWidth"
        TabIndicatorProps={{ style: styles.indicator }}
      >
        {tabLabels.map((label, i) => (
          <Tab key={i} label={label} style={index === i ? activeTabStyle : {}} />
        ))}
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        {cards.map((group, groupIndex) => (
          <div key={groupIndex} style={styles.slide}>
            {group.map((card) => (
              <CardActionArea
                key={card}
                onClick={() => handleCardClick(card)}
                style={{
                  ...styles.card,
                  ...(graficoSeleccionado === card ? styles.selectedCard : {}),
                }}
              >
                <CardContent>
                  {card}
                </CardContent>
              </CardActionArea>
            ))}
          </div>
        ))}
      </SwipeableViews>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: defaultLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        isResizable
        isDraggable
        draggableHandle=".drag-handle"
      >
        <div key="1">
          <CardActionArea style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#8e8e8e',
            overflow: 'hidden',
            height: '100%',
            position: 'relative',
          }}>
            <CardContent style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
              {getComponent('RadialBar')}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="2">
          <CardActionArea style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#8e8e8e',
            overflow: 'hidden',
            height: '100%',
            position: 'relative',
          }}>
            <CardContent style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
              {getComponent('Info')}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="3">
          <CardActionArea style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#8e8e8e',
            overflow: 'hidden',
            height: '100%',
            position: 'relative',
          }}>
            <CardContent style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
              {getComponent('Area')}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
      </ResponsiveGridLayout>
    </Box>
  );
};

export default DemoTabs;
