import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardActionArea, Typography, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Importar componentes de gráficos
import Barra from '@/views/pages/ESECENTRO/Sensores/COCLOSMIAP02.jsx';
import Donut from '@/views/pages/ESECENTRO/Sensores/COCLOSMIAP04.jsx';
import Area from '@/views/pages/ESECENTRO/Sensores/COCLOSMIAP06.jsx';
import Linea from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Linea2 from '@/views/pages/ESECENTRO/Sensores/COCLOSMIAP06.jsx';
import Consumo from '@/views/pages/COSMITET/Sensores/sensor1.jsx';
import Info from '@/views/pages/COSMITET/Sensores/sensor1.jsx';

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

const HomePage = () => {
  const defaultLayout = [
    { i: 'barra2', x: 0, y: 0, w: 2, h: 2 },
    { i: 'barra1', x: 2, y: 0, w: 2, h: 2 },
    { i: 'donut', x: 6, y: 0, w: 8, h: 3 },
    { i: 'area', x: 0, y: 3, w: 4, h: 3  },
    { i: 'info', x: 6, y: 4, w: 8, h: 2 },
    { i: 'linea1', x: 0, y: 6, w: 3, h: 3 },
    { i: 'linea2', x: 3, y: 6, w: 6, h: 3 },
    { i: 'consumo', x: 9, y: 6, w: 3, h: 3 },
    { i: 'tarjeta1', x: 0, y: 9, w: 3, h: 3 },
    { i: 'tarjeta2', x: 3, y: 9, w: 3, h: 3 },
    { i: 'tarjeta3', x: 6, y: 9, w: 3, h: 3 },
    { i: 'tarjeta4', x: 9, y: 9, w: 3, h: 3 }
  ];

  const [layout, setLayout] = useState(defaultLayout);

  useEffect(() => {
    const savedLayout = localStorage.getItem('grid-layout');
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
  }, []);

  const handleLayoutChange = (currentLayout) => {
    setLayout(currentLayout);
    localStorage.setItem('grid-layout', JSON.stringify(currentLayout));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, height: '100vh', backgroundColor: '#f5f5f5' }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={150}
        isResizable
        isDraggable
        draggableHandle=".drag-handle"
        onLayoutChange={(layout) => handleLayoutChange(layout)}
      >
        <div key="donut">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Donut Chart</Typography>
              <Divider />
              <Donut />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="barra1">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Barra Chart 1</Typography>
              <Divider />
              <Barra />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="barra2">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Barra Chart 2</Typography>
              <Divider />
              <Barra />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="area">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Area Chart</Typography>
              <Divider />
              <Area />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="linea1">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Linea Chart 1</Typography>
              <Divider />
              <Linea />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="linea2">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Linea Chart 2</Typography>
              <Divider />
              <Linea2 />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="info">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Info</Typography>
              <Divider />
              <Info />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="consumo">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Consumo</Typography>
              <Divider />
              <Consumo />
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="tarjeta1">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Tarjeta 1</Typography>
              <Divider />
              {/* Contenido de Tarjeta 1 */}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="tarjeta2">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Tarjeta 2</Typography>
              <Divider />
              {/* Contenido de Tarjeta 2 */}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="tarjeta3">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Tarjeta 3</Typography>
              <Divider />
              {/* Contenido de Tarjeta 3 */}
            </CardContent>
            <DragHandleTopLeft className="drag-handle" />
            <DragHandleTopRight className="drag-handle" />
            <DragHandleBottomLeft className="drag-handle" />
            <DragHandleBottomRight className="drag-handle" />
          </CardActionArea>
        </div>
        <div key="tarjeta4">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', color: '#000', overflow: 'hidden', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h6">Tarjeta 4</Typography>
              <Divider />
              {/* Contenido de Tarjeta 4 */}
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

export default HomePage;
