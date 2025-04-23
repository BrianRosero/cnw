import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Tabs, Tab, Box, CardContent, CardActionArea, Typography, ButtonGroup, Button } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { GraficasArea } from './GraficoArea.jsx';
import { getChartOptions } from './GraficoArea.jsx';
import { styled } from '@mui/system';

import Info1 from '../Sensores/COCLOESECAP02/info.jsx';
import RadialBar1 from '../Sensores/COCLOESECAP02/bar.jsx';
import Area1 from '../Sensores/COCLOESECAP02/area.jsx';
import Info2 from '../Sensores/COCLOESECAP03/info.jsx';
import RadialBar2 from '../Sensores/COCLOESECAP03/bar.jsx';
import Area2 from '../Sensores/COCLOESECAP03/area.jsx';
import Info3 from '../Sensores/COCLOESECAP04/info.jsx';
import RadialBar3 from '../Sensores/COCLOESECAP04/bar.jsx';
import Area3 from '../Sensores/COCLOESECAP04/area.jsx';
import Info4 from '../Sensores/COCLOESECAP05/info.jsx';
import RadialBar4 from '../Sensores/COCLOESECAP05/bar.jsx';
import Area4 from '../Sensores/COCLOESECAP05/area.jsx';

const API_URL = 'http://192.168.200.155:8083/vcenter/vms-db';
const ResponsiveGridLayout = WidthProvider(Responsive);
const MAX_DATA_POINTS = 50;

const styles = {
  tabs: {
    background: '#fff',
    borderRadius: '8px',
  },
  indicator: {
    backgroundColor: '#282c60',
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
    backgroundColor: '#abb8c3',
    borderRadius: '8px',
    color: '#fff',
  },
  selectedCard: {
    backgroundColor: '#282c60',
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
  color: '#282c60',
  fontWeight: 'bold',
};

const VmCard = ({ name, isSelected, onClick }) => (
  <CardActionArea onClick={onClick} style={{ ...styles.card, ...(isSelected ? styles.selectedCard : {}) }}>
    <CardContent><Typography>{name}</Typography></CardContent>
  </CardActionArea>
);

export default function VmTable() {
  const [vmsData, setVmsData] = useState({ dbVms: {}, appVms: {}, otherVms: {} });
  const [selectedVm, setSelectedVm] = useState(null);
  const [chartData, setChartData] = useState({ cpu: [], memory: [], timestamps: [] });
  const [tabIndex, setTabIndex] = useState(0);
  const intervalRef = useRef(null);


  const [filteredTimestamps, setFilteredTimestamps] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('Uso de CPU');
  const chartOptions = getChartOptions(filteredTimestamps, selectedMetric);

  const [index, setIndex] = useState(0);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState('COCLOESECAP02');

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const handleCardClick = useCallback((id) => {
    setGraficoSeleccionado(id);
  }, []);

  const fetchVms = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener datos');
      const data = await response.json();
      if (!data.data) throw new Error('Formato inesperado');

      const categorizedVms = { dbVms: {}, appVms: {}, otherVms: {} };
      data.data.forEach(vm => {
        if (!vm.name.includes('ESE')) return;
        const category = vm.name.includes('BD') || vm.name.includes('DB') ? 'dbVms' : vm.name.includes('DA') ? 'appVms' : 'otherVms';
        if (!categorizedVms[category][vm.name]) categorizedVms[category][vm.name] = [];
        categorizedVms[category][vm.name].push(vm);
      });
      setVmsData(categorizedVms);
      if (selectedVm) updateChartData(categorizedVms[selectedVm.type]?.[selectedVm.name] || []);
    } catch (error) {
      console.error('Error obteniendo las máquinas virtuales:', error);
    }
  };

  useEffect(() => {
    let retryDelay = 1000;

    const fetchWithBackoff = () => {
      fetchVms().catch(() => {
        retryDelay = Math.min(retryDelay * 2, 30000);
        setTimeout(fetchWithBackoff, retryDelay);
      });
    };

    fetchWithBackoff();
    intervalRef.current = setInterval(fetchWithBackoff, 10000);
    return () => clearInterval(intervalRef.current);
  }, [selectedVm]);

  const updateChartData = useMemo(() => (history) => {
    const sortedHistory = history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setChartData({
      timestamps: sortedHistory.map(vm => new Date(vm.timestamp).toLocaleTimeString()).slice(-MAX_DATA_POINTS),
      cpu: sortedHistory.map(vm => vm.cpu_usage_mhz).slice(-MAX_DATA_POINTS),
      memory: sortedHistory.map(vm => vm.memory_usage_mb).slice(-MAX_DATA_POINTS),
    });
  }, []);

  const defaultLayout = [
    { i: '3', x: 4, y: 2, w: 9, h: 5 },
  ];

  // Componente de graficos basado en la seleccion actual
  const graficoComponentes = {
    COCLOESECAP02: { RadialBar: <RadialBar1 />, Info: <Info1 />, Area: <Area1 /> },
    COCLOESECAP03: { RadialBar: <RadialBar2 />, Info: <Info2 />, Area: <Area2 /> },
    COCLOESECAP04: { RadialBar: <RadialBar3 />, Info: <Info3 />, Area: <Area3 /> },
    COCLOESECAP05: { RadialBar: <RadialBar4 />, Info: <Info4 />, Area: <Area4 /> },
  };

  const tabLabels = Object.keys(vmsData);

  const getComponent = (type) => graficoComponentes[graficoSeleccionado]?.[type] || null;

  const combinedCards = [
    ['COCLOESECAP02', ...Object.keys(vmsData['Bases_de_datos'] || {})],
    ['COCLOESECAP03', ...Object.keys(vmsData['Aplicativos'] || {})],
    ['COCLOESECAP04', 'COCLOESECAP05', ...Object.keys(vmsData['Otros'] || {})],
  ];

  const handleChange = (e, newIndex) => {
    setTabIndex(newIndex);
    setIndex(newIndex);
    setSelectedVm(combinedCards[newIndex][0] || null);
  };

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
      </Tabs>;
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        {combinedCards.map((group, groupIndex) => (
          <div key={groupIndex} style={styles.slide}>
            {group.map((card) => (
              <CardActionArea
                key={card}
                onClick={() => handleCardClick(card)}
                style={{
                  ...styles.card,
                  ...(graficoSeleccionado === card || selectedVm?.name === card ? styles.selectedCard : {}),
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
      <SwipeableViews index={tabIndex} onChangeIndex={setTabIndex}>
        {Object.entries(vmsData).map(([category, vms]) => (
          <div key={category} style={styles.slide}>
            {Object.entries(vms).map(([name]) => (
              <VmCard
                key={name}
                name={name}
                isSelected={selectedVm?.name === name}
                onClick={() => setSelectedVm({ name, type: category })}
              />
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
              {selectedVm && <GraficasArea chartOptions={chartOptions} chartData={chartData} />}
            </CardContent>
          </CardActionArea>
        </div>
      </ResponsiveGridLayout>
    </Box>
  );
}
