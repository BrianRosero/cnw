import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Info1 from './Sensores/COCLOCERTORI01/info.jsx';
import RadialBar1 from './Sensores/COCLOCERTORI01/bar.jsx';
import Area1 from './Sensores/COCLOCERTORI01/area.jsx';
import Info2 from './Sensores/COCLOCERTORI02/info.jsx';
import RadialBar2 from './Sensores/COCLOCERTORI02/bar.jsx';
import Area2 from './Sensores/COCLOCERTORI02/area.jsx';
import Info3 from './Sensores/COCLOSERTORIBD01/info.jsx';
import RadialBar3 from './Sensores/COCLOSERTORIBD01/bar.jsx';
import Area3 from './Sensores/COCLOSERTORIBD01/area.jsx';

const styles = {
  tabs: {
    background: '#fcfcfc',
    borderRadius: '8px',
  },
  labels: {
    color: '#000000',
  },
  indicator: {
    backgroundColor: '#000000',
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
    backgroundColor: 'rgba(102,102,102,0.82)',
    borderRadius: '8px',
    color: '#fff',
    font: 'SF-Body-font',
    fontSize: '14px',
  },
  selectedCard: {
    backgroundColor: '#EF5485',
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
  color: '#000000',
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
  const [graficoSeleccionado, setGraficoSeleccionado] = useState('COCLOCERTORI02');

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
      case 'COCLOCERTORI01':
        return type === 'RadialBar' ? <RadialBar1 /> : type === 'Info' ? <Info1 /> : <Area1 />;
      case 'COCLOCERTORI02':
        return type === 'RadialBar' ? <RadialBar2 /> : type === 'Info' ? <Info2 /> : <Area2 />;
      case 'COCLOSERTORIBD01':
        return type === 'RadialBar' ? <RadialBar3 /> : type === 'Info' ? <Info3 /> : <Area3 />;
      default:
        return null;
    }
  };

  const tabLabels = [
    'Aplicativos',
    'Bases de Datos',
  ];

  const cards = [
    ['COCLOCERTORI02'],
    ['COCLOSERTORIBD01']
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
          <Tab css={styles.labels} key={i} label={label} style={index === i ? activeTabStyle : {}} />
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
            color: '#000000',
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
            color: '#666666',
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
            color: '#666666',
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
