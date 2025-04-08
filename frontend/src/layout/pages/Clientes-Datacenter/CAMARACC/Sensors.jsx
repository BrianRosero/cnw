import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { styled } from '@mui/system';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Info1 from './Sensores/COCLOCCCDES48/info.jsx';
import RadialBar1 from './Sensores/COCLOCCCDES48/bar.jsx';
import Area1 from './Sensores/COCLOCCCDES48/area.jsx';
import Info2 from './Sensores/COCLOCCCDEV00/info.jsx';
import RadialBar2 from './Sensores/COCLOCCCDEV00/bar.jsx';
import Area2 from './Sensores/COCLOCCCDEV00/area.jsx';
import Info3 from './Sensores/COCLOCCCDEVL02/info.jsx';
import RadialBar3 from './Sensores/COCLOCCCDEVL02/bar.jsx';
import Area3 from './Sensores/COCLOCCCDEVL02/area.jsx';
import Info4 from './Sensores/COCLOCCCDEVL35/info.jsx';
import RadialBar4 from './Sensores/COCLOCCCDEVL35/bar.jsx';
import Area4 from './Sensores/COCLOCCCDEVL35/area.jsx';
import Info5 from './Sensores/COCLOCCCDEVL98/info.jsx';
import RadialBar5 from './Sensores/COCLOCCCDEVL98/bar.jsx';
import Area5 from './Sensores/COCLOCCCDEVL98/area.jsx';
import Info6 from './Sensores/COCLOCCCDEVW36/info.jsx';
import RadialBar6 from './Sensores/COCLOCCCDEVW36/bar.jsx';
import Area6 from './Sensores/COCLOCCCDEVW36/area.jsx';
import Info7 from './Sensores/COCLOCCCPRDB01/info.jsx';
import RadialBar7 from './Sensores/COCLOCCCPRDB01/bar.jsx';
import Area7 from './Sensores/COCLOCCCPRDB01/area.jsx';
import Info8 from './Sensores/COCLOCCCPRDB02/info.jsx';
import RadialBar8 from './Sensores/COCLOCCCPRDB02/bar.jsx';
import Area8 from './Sensores/COCLOCCCPRDB02/area.jsx';
import Info9 from './Sensores/COCLOCCCPRDB03/info.jsx';
import RadialBar9 from './Sensores/COCLOCCCPRDB03/bar.jsx';
import Area9 from './Sensores/COCLOCCCPRDB03/area.jsx';
import Info10 from './Sensores/COCLOCCCPRDB06/info.jsx';
import RadialBar10 from './Sensores/COCLOCCCPRDB06/bar.jsx';
import Area10 from './Sensores/COCLOCCCPRDB06/area.jsx';
import Info11 from './Sensores/COCLOCCCPRDL01/info.jsx';
import RadialBar11 from './Sensores/COCLOCCCPRDL01/bar.jsx';
import Area11 from './Sensores/COCLOCCCPRDL01/area.jsx';
import Info12 from './Sensores/COCLOCCCPRDL02/info.jsx';
import RadialBar12 from './Sensores/COCLOCCCPRDL02/bar.jsx';
import Area12 from './Sensores/COCLOCCCPRDL02/area.jsx';
import Info13 from './Sensores/COCLOCCCPRDL03/info.jsx';
import RadialBar13 from './Sensores/COCLOCCCPRDL03/bar.jsx';
import Area13 from './Sensores/COCLOCCCPRDL03/area.jsx';
import Info14 from './Sensores/COCLOCCCPRDL06/info.jsx';
import RadialBar14 from './Sensores/COCLOCCCPRDL06/bar.jsx';
import Area14 from './Sensores/COCLOCCCPRDL06/area.jsx';
import Info15 from './Sensores/COCLOCCCPRDL07/info.jsx';
import RadialBar15 from './Sensores/COCLOCCCPRDL07/bar.jsx';
import Area15 from './Sensores/COCLOCCCPRDL07/area.jsx';
import Info16 from './Sensores/COCLOCCCPRDL08/info.jsx';
import RadialBar16 from './Sensores/COCLOCCCPRDL08/bar.jsx';
import Area16 from './Sensores/COCLOCCCPRDL08/area.jsx';
import Info17 from './Sensores/COCLOCCCPRDL09/info.jsx';
import RadialBar17 from './Sensores/COCLOCCCPRDL09/bar.jsx';
import Area17 from './Sensores/COCLOCCCPRDL09/area.jsx';
import Info18 from './Sensores/COCLOCCCPRDL10/info.jsx';
import RadialBar18 from './Sensores/COCLOCCCPRDL10/bar.jsx';
import Area18 from './Sensores/COCLOCCCPRDL10/area.jsx';
import Info19 from './Sensores/COCLOCCCPRDL15/info.jsx';
import RadialBar19 from './Sensores/COCLOCCCPRDL15/bar.jsx';
import Area19 from './Sensores/COCLOCCCPRDL15/area.jsx';
import Info20 from './Sensores/COCLOCCCPRDL16/info.jsx';
import RadialBar20 from './Sensores/COCLOCCCPRDL16/bar.jsx';
import Area20 from './Sensores/COCLOCCCPRDL16/area.jsx';
import Info21 from './Sensores/COCLOCCCPRDL17/info.jsx';
import RadialBar21 from './Sensores/COCLOCCCPRDL17/bar.jsx';
import Area21 from './Sensores/COCLOCCCPRDL17/area.jsx';
import Info22 from './Sensores/COCLOCCCPRDL18/info.jsx';
import RadialBar22 from './Sensores/COCLOCCCPRDL18/bar.jsx';
import Area22 from './Sensores/COCLOCCCPRDL18/area.jsx';
import Info23 from './Sensores/COCLOCCCPRDL37/info.jsx';
import RadialBar23 from './Sensores/COCLOCCCPRDL37/bar.jsx';
import Area23 from './Sensores/COCLOCCCPRDL37/area.jsx';
import Info24 from './Sensores/COCLOCCCPRDL41/info.jsx';
import RadialBar24 from './Sensores/COCLOCCCPRDL41/bar.jsx';
import Area24 from './Sensores/COCLOCCCPRDL41/area.jsx';
import Info25 from './Sensores/COCLOCCCPRDL48/info.jsx';
import RadialBar25 from './Sensores/COCLOCCCPRDL48/bar.jsx';
import Area25 from './Sensores/COCLOCCCPRDL48/area.jsx';
import Info26 from './Sensores/COCLOCCCPRDL49/info.jsx';
import RadialBar26 from './Sensores/COCLOCCCPRDL49/bar.jsx';
import Area26 from './Sensores/COCLOCCCPRDL49/area.jsx';
import Info27 from './Sensores/COCLOCCCPRDW10/info.jsx';
import RadialBar27 from './Sensores/COCLOCCCPRDW10/bar.jsx';
import Area27 from './Sensores/COCLOCCCPRDW10/area.jsx';
import Info28 from './Sensores/COCLOCCCPRDW22/info.jsx';
import RadialBar28 from './Sensores/COCLOCCCPRDW22/bar.jsx';
import Area28 from './Sensores/COCLOCCCPRDW22/area.jsx';
import Info29 from './Sensores/COCLOCCCPRDW23/info.jsx';
import RadialBar29 from './Sensores/COCLOCCCPRDW23/bar.jsx';
import Area29 from './Sensores/COCLOCCCPRDW23/area.jsx';
import Info30 from './Sensores/COCLOCCCPRDW24/info.jsx';
import RadialBar30 from './Sensores/COCLOCCCPRDW24/bar.jsx';
import Area30 from './Sensores/COCLOCCCPRDW24/area.jsx';
import Info31 from './Sensores/COCLOCCCPRDW25/info.jsx';
import RadialBar31 from './Sensores/COCLOCCCPRDW25/bar.jsx';
import Area31 from './Sensores/COCLOCCCPRDW25/area.jsx';
import Info32 from './Sensores/COCLOCCCPRDW30/info.jsx';
import RadialBar32 from './Sensores/COCLOCCCPRDW30/bar.jsx';
import Area32 from './Sensores/COCLOCCCPRDW30/area.jsx';
import Info33 from './Sensores/COCLOCCCPRDW35/info.jsx';
import RadialBar33 from './Sensores/COCLOCCCPRDW35/bar.jsx';
import Area33 from './Sensores/COCLOCCCPRDW35/area.jsx';
import Info34 from './Sensores/COCLOCCCPRDW48/info.jsx';
import RadialBar34 from './Sensores/COCLOCCCPRDW48/bar.jsx';
import Area34 from './Sensores/COCLOCCCPRDW48/area.jsx';
import Info35 from './Sensores/COCLOCCCPRDW97/info.jsx';
import RadialBar35 from './Sensores/COCLOCCCPRDW97/bar.jsx';
import Area35 from './Sensores/COCLOCCCPRDW97/area.jsx';
import Info36 from './Sensores/COCLOCCCPRDW98/info.jsx';
import RadialBar36 from './Sensores/COCLOCCCPRDW98/bar.jsx';
import Area36 from './Sensores/COCLOCCCPRDW98/area.jsx';
import Info37 from './Sensores/COCLOCCCTST00/info.jsx';
import RadialBar37 from './Sensores/COCLOCCCTST00/bar.jsx';
import Area37 from './Sensores/COCLOCCCTST00/area.jsx';
import Info38 from './Sensores/COCLOCCCTST01/info.jsx';
import RadialBar38 from './Sensores/COCLOCCCTST01/bar.jsx';
import Area38 from './Sensores/COCLOCCCTST01/area.jsx';
import Info39 from './Sensores/COCLOCCCTST02/info.jsx';
import RadialBar39 from './Sensores/COCLOCCCTST02/bar.jsx';
import Area39 from './Sensores/COCLOCCCTST02/area.jsx';
import Info40 from './Sensores/COCLOCCCTST03/info.jsx';
import RadialBar40 from './Sensores/COCLOCCCTST03/bar.jsx';
import Area40 from './Sensores/COCLOCCCTST03/area.jsx';
import Info41 from './Sensores/COCLOCCCTST06/info.jsx';
import RadialBar41 from './Sensores/COCLOCCCTST06/bar.jsx';
import Area41 from './Sensores/COCLOCCCTST06/area.jsx';
import Info42 from './Sensores/COCLOCCCTST07/info.jsx';
import RadialBar42 from './Sensores/COCLOCCCTST07/bar.jsx';
import Area42 from './Sensores/COCLOCCCTST07/area.jsx';
import Info43 from './Sensores/COCLOCCCTST09/info.jsx';
import RadialBar43 from './Sensores/COCLOCCCTST09/bar.jsx';
import Area43 from './Sensores/COCLOCCCTST09/area.jsx';
import Info44 from './Sensores/COCLOCCCTST10/info.jsx';
import RadialBar44 from './Sensores/COCLOCCCTST10/bar.jsx';
import Area44 from './Sensores/COCLOCCCTST10/area.jsx';
import Info45 from './Sensores/COCLOCCCTST11/info.jsx';
import RadialBar45 from './Sensores/COCLOCCCTST11/bar.jsx';
import Area45 from './Sensores/COCLOCCCTST11/area.jsx';
import Info46 from './Sensores/COCLOCCCTST15/info.jsx';
import RadialBar46 from './Sensores/COCLOCCCTST15/bar.jsx';
import Area46 from './Sensores/COCLOCCCTST15/area.jsx';
import Info47 from './Sensores/COCLOCCCTSTL01/info.jsx';
import RadialBar47 from './Sensores/COCLOCCCTSTL01/bar.jsx';
import Area47 from './Sensores/COCLOCCCTSTL01/area.jsx';
import Info48 from './Sensores/COCLOCCCTSTL02/info.jsx';
import RadialBar48 from './Sensores/COCLOCCCTSTL02/bar.jsx';
import Area48 from './Sensores/COCLOCCCTSTL02/area.jsx';
import Info49 from './Sensores/COCLOCCCTSTL03/info.jsx';
import RadialBar49 from './Sensores/COCLOCCCTSTL03/bar.jsx';
import Area49 from './Sensores/COCLOCCCTSTL03/area.jsx';
import Info50 from './Sensores/COCLOCCCTSTL06/info.jsx';
import RadialBar50 from './Sensores/COCLOCCCTSTL06/bar.jsx';
import Area50 from './Sensores/COCLOCCCTSTL06/area.jsx';
import Info51 from './Sensores/COCLOCCCTSTL07/info.jsx';
import RadialBar51 from './Sensores/COCLOCCCTSTL07/bar.jsx';
import Area51 from './Sensores/COCLOCCCTSTL07/area.jsx';
import Info52 from './Sensores/COCLOCCCTSTL09/info.jsx';
import RadialBar52 from './Sensores/COCLOCCCTSTL09/bar.jsx';
import Area52 from './Sensores/COCLOCCCTSTL09/area.jsx';
import Info53 from './Sensores/COCLOCCCTSTL10/info.jsx';
import RadialBar53 from './Sensores/COCLOCCCTSTL10/bar.jsx';
import Area53 from './Sensores/COCLOCCCTSTL10/area.jsx';
import Info54 from './Sensores/COCLOCCCTSTL15/info.jsx';
import RadialBar54 from './Sensores/COCLOCCCTSTL15/bar.jsx';
import Area54 from './Sensores/COCLOCCCTSTL15/area.jsx';
import Info55 from './Sensores/COCLOCCCTSTL41/info.jsx';
import RadialBar55 from './Sensores/COCLOCCCTSTL41/bar.jsx';
import Area55 from './Sensores/COCLOCCCTSTL41/area.jsx';

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
  const [graficoSeleccionado, setGraficoSeleccionado] = useState('COCLOCCCDES48');

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
      case 'COCLOCCCDES48':
        return type === 'RadialBar' ? <RadialBar1 /> : type === 'Info' ? <Info1 /> : <Area1 />;
      case 'COCLOCCCDEV00':
        return type === 'RadialBar' ? <RadialBar2 /> : type === 'Info' ? <Info2 /> : <Area2 />;
      case 'COCLOCCCDEVL02':
        return type === 'RadialBar' ? <RadialBar3 /> : type === 'Info' ? <Info3 /> : <Area3 />;
      case 'COCLOCCCDEVL35':
        return type === 'RadialBar' ? <RadialBar4 /> : type === 'Info' ? <Info4 /> : <Area4 />;
      case 'COCLOCCCDEVL98':
        return type === 'RadialBar' ? <RadialBar5 /> : type === 'Info' ? <Info5 /> : <Area5 />;
      case 'COCLOCCCDEVW36':
        return type === 'RadialBar' ? <RadialBar6 /> : type === 'Info' ? <Info6 /> : <Area6 />;
      case 'COCLOCCCPRDB01':
        return type === 'RadialBar' ? <RadialBar7 /> : type === 'Info' ? <Info7 /> : <Area7 />;
      case 'COCLOCCCPRDB02':
        return type === 'RadialBar' ? <RadialBar8 /> : type === 'Info' ? <Info8 /> : <Area8 />;
      case 'COCLOCCCPRDB03':
        return type === 'RadialBar' ? <RadialBar9 /> : type === 'Info' ? <Info9 /> : <Area9 />;
      case 'COCLOCCCPRDB06':
        return type === 'RadialBar' ? <RadialBar10 /> : type === 'Info' ? <Info10 /> : <Area10 />;
      case 'COCLOCCCPRDL01':
        return type === 'RadialBar' ? <RadialBar11 /> : type === 'Info' ? <Info11 /> : <Area11 />;
      case 'COCLOCCCPRDL02':
        return type === 'RadialBar' ? <RadialBar12 /> : type === 'Info' ? <Info12 /> : <Area12 />;
      case 'COCLOCCCPRDL03':
        return type === 'RadialBar' ? <RadialBar13 /> : type === 'Info' ? <Info13 /> : <Area13 />;
      case 'COCLOCCCPRDL06':
        return type === 'RadialBar' ? <RadialBar14 /> : type === 'Info' ? <Info14 /> : <Area14 />;
      case 'COCLOCCCPRDL07':
        return type === 'RadialBar' ? <RadialBar15 /> : type === 'Info' ? <Info15 /> : <Area15 />;
      case 'COCLOCCCPRDL08':
        return type === 'RadialBar' ? <RadialBar16 /> : type === 'Info' ? <Info16 /> : <Area16 />;
      case 'COCLOCCCPRDL09':
        return type === 'RadialBar' ? <RadialBar17 /> : type === 'Info' ? <Info17 /> : <Area17 />;
      case 'COCLOCCCPRDL10':
        return type === 'RadialBar' ? <RadialBar18 /> : type === 'Info' ? <Info18 /> : <Area18 />;
      case 'COCLOCCCPRDL15':
        return type === 'RadialBar' ? <RadialBar19 /> : type === 'Info' ? <Info19 /> : <Area19 />;
      case 'COCLOCCCPRDL16':
        return type === 'RadialBar' ? <RadialBar20 /> : type === 'Info' ? <Info20 /> : <Area20 />;
      case 'COCLOCCCPRDL17':
        return type === 'RadialBar' ? <RadialBar21 /> : type === 'Info' ? <Info21 /> : <Area21 />;
      case 'COCLOCCCPRDL18':
        return type === 'RadialBar' ? <RadialBar22 /> : type === 'Info' ? <Info22 /> : <Area22 />;
      case 'COCLOCCCPRDL37':
        return type === 'RadialBar' ? <RadialBar23 /> : type === 'Info' ? <Info23 /> : <Area23 />;
      case 'COCLOCCCPRDL41':
        return type === 'RadialBar' ? <RadialBar24 /> : type === 'Info' ? <Info24 /> : <Area24 />;
      case 'COCLOCCCPRDL48':
        return type === 'RadialBar' ? <RadialBar25 /> : type === 'Info' ? <Info25 /> : <Area25 />;
      case 'COCLOCCCPRDL49':
        return type === 'RadialBar' ? <RadialBar26 /> : type === 'Info' ? <Info26 /> : <Area26 />;
      case 'COCLOCCCPRDW10':
        return type === 'RadialBar' ? <RadialBar27 /> : type === 'Info' ? <Info27 /> : <Area27 />;
      case 'COCLOCCCPRDW22':
        return type === 'RadialBar' ? <RadialBar28 /> : type === 'Info' ? <Info28 /> : <Area28 />;
      case 'COCLOCCCPRDW23':
        return type === 'RadialBar' ? <RadialBar29 /> : type === 'Info' ? <Info29 /> : <Area29 />;
      case 'COCLOCCCPRDW24':
        return type === 'RadialBar' ? <RadialBar30 /> : type === 'Info' ? <Info30 /> : <Area30 />;
      case 'COCLOCCCPRDW25':
        return type === 'RadialBar' ? <RadialBar31 /> : type === 'Info' ? <Info31 /> : <Area31 />;
      case 'COCLOCCCPRDW30':
        return type === 'RadialBar' ? <RadialBar32 /> : type === 'Info' ? <Info32 /> : <Area32 />;
      case 'COCLOCCCPRDW35':
        return type === 'RadialBar' ? <RadialBar33 /> : type === 'Info' ? <Info33 /> : <Area33 />;
      case 'COCLOCCCPRDW48':
        return type === 'RadialBar' ? <RadialBar34 /> : type === 'Info' ? <Info34 /> : <Area34 />;
      case 'COCLOCCCPRDW97':
        return type === 'RadialBar' ? <RadialBar35 /> : type === 'Info' ? <Info35 /> : <Area35 />;
      case 'COCLOCCCPRDW98':
        return type === 'RadialBar' ? <RadialBar36 /> : type === 'Info' ? <Info36 /> : <Area36 />;
      case 'COCLOCCCTST00':
        return type === 'RadialBar' ? <RadialBar37 /> : type === 'Info' ? <Info37 /> : <Area37 />;
      case 'COCLOCCCTST01':
        return type === 'RadialBar' ? <RadialBar38 /> : type === 'Info' ? <Info38 /> : <Area38 />;
      case 'COCLOCCCTST02':
        return type === 'RadialBar' ? <RadialBar39 /> : type === 'Info' ? <Info39 /> : <Area39 />;
      case 'COCLOCCCTST03':
        return type === 'RadialBar' ? <RadialBar40 /> : type === 'Info' ? <Info40 /> : <Area40 />;
      case 'COCLOCCCTST06':
        return type === 'RadialBar' ? <RadialBar41 /> : type === 'Info' ? <Info41 /> : <Area41 />;
      case 'COCLOCCCTST07':
        return type === 'RadialBar' ? <RadialBar42 /> : type === 'Info' ? <Info42 /> : <Area42 />;
      case 'COCLOCCCTST09':
        return type === 'RadialBar' ? <RadialBar43 /> : type === 'Info' ? <Info43 /> : <Area43 />;
      case 'COCLOCCCTST10':
        return type === 'RadialBar' ? <RadialBar44 /> : type === 'Info' ? <Info44 /> : <Area44 />;
      case 'COCLOCCCTST11':
        return type === 'RadialBar' ? <RadialBar45 /> : type === 'Info' ? <Info45 /> : <Area45 />;
      case 'COCLOCCCTST15':
        return type === 'RadialBar' ? <RadialBar46 /> : type === 'Info' ? <Info46 /> : <Area46 />;
      case 'COCLOCCCTSTL01':
        return type === 'RadialBar' ? <RadialBar47 /> : type === 'Info' ? <Info47 /> : <Area47 />;
      case 'COCLOCCCTSTL02':
        return type === 'RadialBar' ? <RadialBar48 /> : type === 'Info' ? <Info48 /> : <Area48 />;
      case 'COCLOCCCTSTL03':
        return type === 'RadialBar' ? <RadialBar49 /> : type === 'Info' ? <Info49 /> : <Area49 />;
      case 'COCLOCCCTSTL06':
        return type === 'RadialBar' ? <RadialBar50 /> : type === 'Info' ? <Info50 /> : <Area50 />;
      case 'COCLOCCCTSTL07':
        return type === 'RadialBar' ? <RadialBar51 /> : type === 'Info' ? <Info51 /> : <Area51 />;
      case 'COCLOCCCTSTL09':
        return type === 'RadialBar' ? <RadialBar52 /> : type === 'Info' ? <Info52 /> : <Area52 />;
      case 'COCLOCCCTSTL10':
        return type === 'RadialBar' ? <RadialBar53 /> : type === 'Info' ? <Info53 /> : <Area53 />;
      case 'COCLOCCCTSTL15':
        return type === 'RadialBar' ? <RadialBar54/> : type === 'Info' ? <Info54 /> : <Area54 />;
      case 'COCLOCCCTSTL41':
        return type === 'RadialBar' ? <RadialBar55 /> : type === 'Info' ? <Info55 /> : <Area55 />;

      default:
        return null;
    }
  };

  const tabLabels = [
    'Desarrollo',
    'Productivo DB',
    'Productivo DL 1',
    'Productivo DL 2',
    'Productivo DW',
    'Test',
    'Test L',
  ];

  const cards = [
    ['COCLOCCCDES48', 'COCLOCCCDEV00', 'COCLOCCCDEVL02', 'COCLOCCCDEVL35', 'COCLOCCCDEVL98', 'COCLOCCCDEVW36'],
    ['COCLOCCCPRDB01', 'COCLOCCCPRDB02', 'COCLOCCCPRDB03', 'COCLOCCCPRDB06'],
    ['COCLOCCCPRDL01', 'COCLOCCCPRDL02', 'COCLOCCCPRDL03', 'COCLOCCCPRDL06', 'COCLOCCCPRDL07', 'COCLOCCCPRDL08', 'COCLOCCCPRDL09', 'COCLOCCCPRDL10'],
    [ 'COCLOCCCPRDL15', 'COCLOCCCPRDL16', 'COCLOCCCPRDL17', 'COCLOCCCPRDL18', 'COCLOCCCPRDL37', 'COCLOCCCPRDL41', 'COCLOCCCPRDL48', 'COCLOCCCPRDL49'],
    ['COCLOCCCPRDW10', 'COCLOCCCPRDW22', 'COCLOCCCPRDW23', 'COCLOCCCPRDW24', 'COCLOCCCPRDW25', 'COCLOCCCPRDW30', 'COCLOCCCPRDW35', 'COCLOCCCPRDW48', 'COCLOCCCPRDW97', 'COCLOCCCPRDW98'],
    ['COCLOCCCTST00', 'COCLOCCCTST01', 'COCLOCCCTST02', 'COCLOCCCTST03', 'COCLOCCCTST06', 'COCLOCCCTST07', 'COCLOCCCTST09', 'COCLOCCCTST10', 'COCLOCCCTST11', 'COCLOCCCTST15',],
    ['COCLOCCCTSTL01', 'COCLOCCCTSTL02', 'COCLOCCCTSTL03', 'COCLOCCCTSTL06', 'COCLOCCCTSTL07', 'COCLOCCCTSTL09', 'COCLOCCCTSTL10', 'COCLOCCCTSTL15', 'COCLOCCCTSTL41']
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
      <SwipeableViews style={{color: '#49a481'}} index={index} onChangeIndex={handleChangeIndex}>
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
            color: '#214092',
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
            color: '#214092',
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
            color: '#214092',
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
