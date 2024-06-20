import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Info1 from '../ESECENTRO/Sensores/COCLOESECAP02/info.jsx';
import RadialBar1 from '../ESECENTRO/Sensores/COCLOESECAP02/bar.jsx';

import GraficoServidor2 from '../ESECENTRO/Sensores/Graficas/RadialBar.jsx';
import GraficoServidor3 from '../CAMARACC/Sensors/Informacion.jsx';
import Donut from '../ESECENTRO/Sensores/COCLOSMIAP02.jsx';
import Linea from '../ESECENTRO/Sensores/COCLOSMIAP04.jsx';
import Linea2 from '../ESECENTRO/Sensores/COCLOSMIAP04.jsx';

const styles = {
  tabs: {
    background: '#fff',
    borderRadius: '8px',
  },
  indicator: {
    backgroundColor: '#029E3D', // Cambia el color de la barra inferior del tab
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
    backgroundColor: '#004884',
    borderRadius: '8px',
    color: '#fff',
  },
  selectedCard: {
    backgroundColor: '#029E3D',
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

const DragHandle = styled('div')({
  width: '100%',
  height: '5%',
  position: 'absolute',
  cursor: 'move',
  backgroundColor: 'rgb(255,255,255)', // Puedes ajustar el estilo según tus preferencias
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
    // Seleccionar el primer servidor del primer tab por defecto al cargar la página
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
        <Tab label="Aplicativos 1" />
        <Tab label="Aplicativos 2" />
        <Tab label="Aplicativos 3" />
        <Tab label="Aplicativos 4" />
        <Tab label="Bases de datos" />
      </Tabs>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <div style={{ ...styles.slide, ...styles.slide1 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 1 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(1)}
          >
            <CardContent>
              COCLOESECAP02
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 2 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(2)}
          >
            <CardContent>
              COCLOESECAP03
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 3 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(3)}
          >
            <CardContent>
              COCLOESECAP04
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 4 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(4)}
          >
            <CardContent>
              COCLOESECAP05
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 5 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(5)}
          >
            <CardContent>
              COCLOESECAP06
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 6 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(6)}
          >
            <CardContent>
              COCLOESECAP07
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide2 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 7 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(7)}
          >
            <CardContent>
              COCLOESECAP08
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 8 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(8)}
          >
            <CardContent>
              COCLOESECAP09
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 9 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(9)}
          >
            <CardContent>
              COCLOESECAP10
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 10 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(10)}
          >
            <CardContent>
              COCLOESECAP11
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 11 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(11)}
          >
            <CardContent>
              COCLOESECAP12
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 12 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(12)}
          >
            <CardContent>
              COCLOESECAP13
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide3 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 13 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(13)}
          >
            <CardContent>
              COCLOESECAP14
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 14 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(14)}
          >
            <CardContent>
              COCLOESECAP15
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 15 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(15)}
          >
            <CardContent>
              COCLOESECAP16
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 16 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(16)}
          >
            <CardContent>
              COCLOESECAP17
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 17 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(17)}
          >
            <CardContent>
              COCLOESECAP18
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 18 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(18)}
          >
            <CardContent>
              COCLOESECAP19
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide4 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 19 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(19)}
          >
            <CardContent>
              COCLOESECAP20
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 20 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(20)}
          >
            <CardContent>
              COCLOESECAP21
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 21 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(21)}
          >
            <CardContent>
              COCLOESECAP22
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 22 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(22)}
          >
            <CardContent>
              COCLOESECAP23
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide5 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 23 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(23)}
          >
            <CardContent>
              COCLOESECDA01
            </CardContent>
          </CardActionArea>
        </div>
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
              <Linea2 />
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


