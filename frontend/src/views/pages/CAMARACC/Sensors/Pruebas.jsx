import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import GraficoServidor1 from '../../../../views/pages/CAMARACC/Sensors/Informacion.jsx';
import GraficoServidor2 from '../../../../views/pages/CAMARACC/Sensors/Informacion.jsx';
import GraficoServidor3 from '../../../../views/pages/CAMARACC/Sensors/Informacion.jsx';
import Donut from '../../../../views/pages/CAMARACC/Sensors/Informacion.jsx';
import Linea from '../../../../views/pages/CAMARACC/Sensors/Informacion.jsx';
import Linea2 from '../../../../views/pages/CAMARACC/Sensors/Informacion.jsx';

const styles = {
  tabs: {
    background: '#fff',
    borderRadius: '8px',
  },
  indicator: {
    backgroundColor: '#EF0074', // Cambia el color de la barra inferior del tab
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
    backgroundColor: '#253D90',
    borderRadius: '8px',
    color: '#fff',
  },
  selectedCard: {
    backgroundColor: '#EF0074',
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
    { i: 'server1', x: 4, y: 0, w: 2, h: 2 },
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
        <Tab label="Productivo" />
        <Tab label="Pruebas" />
        <Tab label="Desarrollo" />
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
              Servidor 1
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
              Servidor 2
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
              Servidor 3
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 1 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(1)}
          >
            <CardContent>
              Servidor 1
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
              Servidor 2
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
              Servidor 3
            </CardContent>
          </CardActionArea>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 1 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(1)}
          >
            <CardContent>
              Servidor 1
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide2 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 1 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(1)}
          >
            <CardContent>
              Servidor 1
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
              Servidor 2
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide3 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 1 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(1)}
          >
            <CardContent>
              Servidor 1
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
              Servidor 2
            </CardContent>
          </CardActionArea>
        </div>
        <div style={{ ...styles.slide, ...styles.slide4 }}>
          <CardActionArea
            style={{
              ...styles.card,
              ...(graficoSeleccionado === 1 && styles.selectedCard),
            }}
            onClick={() => handleCardClick(1)}
          >
            <CardContent>
              Servidor 1
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
              Servidor 2
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
              height: '100%'
            }}>
              {graficoSeleccionado === 1 && <GraficoServidor1 />}
              {graficoSeleccionado === 2 && <GraficoServidor2 />}
              {graficoSeleccionado === 3 && <GraficoServidor3 />}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="server2">
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
              <Donut />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="server3">
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
              <Donut />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="server4">
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
              <Donut />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
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
              <Linea />
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

