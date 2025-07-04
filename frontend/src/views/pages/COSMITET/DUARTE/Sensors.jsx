import React, { useState } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Info1 from './Sensores/COCLOCDUARAP01/info.jsx';
import RadialBar1 from './Sensores/COCLOCDUARAP01/bar.jsx';
import Area1 from './Sensores/COCLOCDUARAP01/area.jsx';
import Info2 from './Sensores/COCLOCDUARTBD01/info.jsx';
import RadialBar2 from './Sensores/COCLOCDUARTBD01/bar.jsx';
import Area2 from './Sensores/COCLOCDUARTBD01/area.jsx';
import Info3 from './Sensores/COCLOCDUARTBD02/info.jsx';
import RadialBar3 from './Sensores/COCLOCDUARTBD02/bar.jsx';
import Area3 from './Sensores/COCLOCDUARTBD02/area.jsx';
import Info4 from './Sensores/COCLOCDUARFI01/info.jsx';
import RadialBar4 from './Sensores/COCLOCDUARFI01/bar.jsx';
import Area4 from './Sensores/COCLOCDUARFI01/area.jsx';
import Info5 from './Sensores/COCLOCDUARTBK01/info.jsx';
import RadialBar5 from './Sensores/COCLOCDUARTBK01/bar.jsx';
import Area5 from './Sensores/COCLOCDUARTBK01/area.jsx';
import Info6 from './Sensores/COCLOCDUAREP02/info.jsx';
import RadialBar6 from './Sensores/COCLOCDUAREP02/bar.jsx';
import Area6 from './Sensores/COCLOCDUAREP02/area.jsx';
import Info7 from './Sensores/COCLOCDUARST02/info.jsx';
import RadialBar7 from './Sensores/COCLOCDUARST02/bar.jsx';
import Area7 from './Sensores/COCLOCDUARST02/area.jsx';
import Info8 from './Sensores/COCLOCDUARAST01/info.jsx';
import RadialBar8 from './Sensores/COCLOCDUARAST01/bar.jsx';
import Area8 from './Sensores/COCLOCDUARAST01/area.jsx';
import Info9 from './Sensores/COCLOCDUARTSTG01/info.jsx';
import RadialBar9 from './Sensores/COCLOCDUARTSTG01/bar.jsx';
import Area9 from './Sensores/COCLOCDUARTSTG01/area.jsx';

const styles = {
  tabs: {
    background: '#fff',
    borderRadius: '8px',
  },
  indicator: {
    backgroundColor: '#0693e3',
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
    backgroundColor: '#2154ac',
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
  color: '#0693e3',
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
  const [graficoSeleccionado, setGraficoSeleccionado] = useState('COCLOCDUARAP01');

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
      case 'COCLOCDUARAP01':
        return type === 'RadialBar' ? <RadialBar1 /> : type === 'Info' ? <Info1 /> : <Area1 />;
      case 'COCLOCDUARTBD01':
        return type === 'RadialBar' ? <RadialBar2 /> : type === 'Info' ? <Info2 /> : <Area2 />;
      case 'COCLOCDUARTBD02':
        return type === 'RadialBar' ? <RadialBar3 /> : type === 'Info' ? <Info3 /> : <Area3 />;
      case 'COCLOCDUARFI01':
        return type === 'RadialBar' ? <RadialBar4 /> : type === 'Info' ? <Info4 /> : <Area4 />;
      case 'COCLOCDUARTBK01':
        return type === 'RadialBar' ? <RadialBar5 /> : type === 'Info' ? <Info5 /> : <Area5 />;
      case 'COCLOCDUAREP02':
        return type === 'RadialBar' ? <RadialBar6 /> : type === 'Info' ? <Info6 /> : <Area6 />;
      case 'COCLOCDUARST02':
        return type === 'RadialBar' ? <RadialBar7 /> : type === 'Info' ? <Info7 /> : <Area7 />;
      case 'COCLOCDUARAST01':
        return type === 'RadialBar' ? <RadialBar8 /> : type === 'Info' ? <Info8 /> : <Area8 />;
      case 'COCLOCDUARTSTG01':
        return type === 'RadialBar' ? <RadialBar9 /> : type === 'Info' ? <Info9 /> : <Area9 />;
      default:
        return null;
    }
  };

  const tabLabels = [
    'Aplicativos',
    'Bases de Datos',
    'Financiero',
    'Backup',
    'Replica',
    'Storage',
    'AST STG',
  ];

  const cards = [
    ['COCLOCDUARAP01'],
    ['COCLOCDUARTBD01', 'COCLOCDUARTBD02'],
    ['COCLOCDUARFI01'],
    ['COCLOCDUARTBK01'],
    ['COCLOCDUAREP02'],
    ['COCLOCDUARST02'],
    ['COCLOCDUARAST01', 'COCLOCDUARTSTG01'],
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
