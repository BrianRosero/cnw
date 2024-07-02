import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Info1 from './Sensores/COCLOCOSMIBD01/info.jsx';
import RadialBar1 from './Sensores/COCLOCOSMIBD01/bar.jsx';
import Area from './Sensores/COCLOCOSMIBD01/area.jsx';

import GraficoServidor2 from '../../../../views/pages/COSMITET/COSMITET/Sensores/Graficas/RadialBar.jsx';
import GraficoServidor3 from '../../CAMARACC/Sensors/Informacion.jsx';


const styles = {
  tabs: {
    background: '#fff',
    borderRadius: '8px',
  },
  indicator: {
    backgroundColor: '#009100',
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
    backgroundColor: '#5e7775',
    borderRadius: '8px',
    color: '#fff',
  },
  selectedCard: {
    backgroundColor: '#009100',
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
  color: '#009100',
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
  const [graficoSeleccionado, setGraficoSeleccionado] = useState(1);

  useEffect(() => {
    setGraficoSeleccionado(1);
  }, []);

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const handleCardClick = (id) => {
    setGraficoSeleccionado(id);
  };

  const defaultLayout = [
    { i: 'servers', x: 0, y: 0, w: 4, h: 6 },
    { i: 'server1', x: 4, y: 0, w: 8, h: 2 },
    { i: 'server2', x: 6, y: 0, w: 2, h: 2 },
    { i: 'server3', x: 8, y: 0, w: 2, h: 2 },
    { i: 'server4', x: 10, y: 0, w: 2, h: 2 },
    { i: 'grafico', x: 4, y: 2, w: 8, h: 4 },
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
        {['Bases de datos', 'Aplicativos', 'Storage', 'Financiero', 'Backup', 'Replica', 'Desarrollo'].map((label, idx) => (
          <Tab key={label} label={label} style={index === idx ? activeTabStyle : {}} />
        ))}
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        {[
          ['COCLOCOSMIBD01', 'COCLOCOSMIBD02', 'COCLOCOSMIBD03', 'COCLOCOSMIBD04'],
          ['COCLOCOSMIAP02', 'COCLOCOSMIAP05', 'COCLOCOSMIAP06', 'COCLOCOSMIAP07'],
          ['COCLOCOSMISTG01'],
          ['COCLOCOSMIFI01'],
          ['COCLOCOSMIBK01'],
          ['COCLOCOSMIREP02', 'COCLOCOSMIREP03'],
          ['COCLOCOSMIDES01', 'COCLOCOSMIAST03', 'COCLOCOSMIAST04'],
        ].map((cards, idx) => (
          <div key={idx} style={{ ...styles.slide, ...styles[`slide${idx + 1}`] }}>
            {cards.map((card, cardIdx) => (
              <CardActionArea
                key={card}
                style={{
                  ...styles.card,
                  ...(graficoSeleccionado === cardIdx + 1 + idx * 4 && styles.selectedCard),
                }}
                onClick={() => handleCardClick(cardIdx + 1 + idx * 4)}
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
        <div key="servers">
          <CardActionArea style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#8e8e8e',
            overflow: 'hidden',
            height: '100%',
            position: 'relative'
          }}>
            <CardContent style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              {graficoSeleccionado === 1 && <RadialBar1 />}
              {graficoSeleccionado === 2 && <GraficoServidor2 />}
              {graficoSeleccionado === 3 && <GraficoServidor3 />}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="server1">
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
              {graficoSeleccionado === 1 && <Info1 />}
              {graficoSeleccionado === 2 && <GraficoServidor2 />}
              {graficoSeleccionado === 3 && <GraficoServidor3 />}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="grafico">
          <CardActionArea style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#8e8e8e',
            overflow: 'hidden',
            height: '100%',
            position: 'relative'
          }}>
            <CardContent style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <Area />
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
