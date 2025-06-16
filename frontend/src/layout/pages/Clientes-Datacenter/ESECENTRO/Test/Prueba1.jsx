import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tabs, Tab, CardContent, CardActionArea, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import RadialBar from './RadialBar.jsx';

const API_URL = 'http://localhost:8083/vcenter/vms-db';
const API_URL_1 = 'http://localhost:8083/vcenter/vms-db1';

const ResponsiveGridLayout = WidthProvider(Responsive);
const MAX_DATA_POINTS = 50;

const styles = {
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
  slide: {
    padding: 15,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
  },
};

const VmCard = ({ name, isSelected, onClick }) => (
  <CardActionArea onClick={onClick} style={{ ...styles.card, ...(isSelected ? styles.selectedCard : {}) }}>
    <CardContent><Typography>{name}</Typography></CardContent>
  </CardActionArea>
);

export default function VmTable() {
  const [selectedVm, setSelectedVm] = useState(null);
  const [chartData, setChartData] = useState({ cpu: [], memory: [], timestamps: [] });
  const [tabIndex, setTabIndex] = useState(0);
  const [combinedData, setCombinedData] = useState({ dbVms: {}, appVms: {}, otherVms: {} });
  const intervalRef = useRef(null);

  const fetchVms = async () => {
    try {
      const [response1, response2] = await Promise.all([fetch(API_URL), fetch(API_URL_1)]);
      if (!response1.ok || !response2.ok) throw new Error('Error al obtener datos');

      const data1 = await response1.json();
      const data2 = await response2.json();
      if (!data1.data || !data2.data) throw new Error('Formato inesperado');

      const combinedApiData = [...data1.data, ...data2.data].filter(vm => vm.name.includes('ESE'));
      const apiData = { dbVms: {}, appVms: {}, otherVms: {} };

      combinedApiData.forEach(vm => {
        const category = vm.name.includes('BD') || vm.name.includes('AP0') ? 'dbVms' :
          vm.name.includes('AP1') ? 'appVms' : 'otherVms';
        if (!apiData[category][vm.name]) apiData[category][vm.name] = [];
        apiData[category][vm.name].push(vm);
      });

      setCombinedData(apiData);
      if (selectedVm) updateChartData(apiData[selectedVm.type]?.[selectedVm.name] || []);
    } catch (error) {
      console.error('Error obteniendo las máquinas virtuales:', error);
    }
  };

  const updateChartData = (history) => {
    const sortedHistory = history.filter(vm => vm.timestamp).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setChartData({
      timestamps: sortedHistory.map(vm => new Date(vm.timestamp).toLocaleTimeString()).slice(-MAX_DATA_POINTS),
      cpu: sortedHistory.map(vm => vm.cpu).slice(-MAX_DATA_POINTS),
      memory: sortedHistory.map(vm => vm.memory).slice(-MAX_DATA_POINTS),
    });
  };

  useEffect(() => {
    fetchVms();
    intervalRef.current = setInterval(fetchVms, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (selectedVm) updateChartData(combinedData[selectedVm.type]?.[selectedVm.name] || []);
  }, [combinedData, selectedVm]);

  const handleCardClick = useCallback((id, category) => {
    setSelectedVm({ name: id, type: category });
    updateChartData(combinedData[category]?.[id] || []);
  }, [combinedData]);

  return (
    <div>
      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} variant="fullWidth">
        {['Grupo 1', 'Grupo 2', 'Grupo 3'].map((label, i) => <Tab key={i} label={label} />)}
      </Tabs>
      <SwipeableViews index={tabIndex} onChangeIndex={setTabIndex}>
        {Object.entries(combinedData).map(([category, vms]) => (
          <div key={category} style={styles.slide}>
            {Object.keys(vms).map(name => (
              <VmCard key={name} name={name} isSelected={selectedVm?.name === name} onClick={() => handleCardClick(name, category)} />
            ))}
          </div>
        ))}
      </SwipeableViews>
      <ResponsiveGridLayout className="layout" layouts={{ lg: [{ i: '1', x: 0, y: 0, w: 3, h: 7 }] }}
                            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} rowHeight={80}>
        <div key="1">
          <CardActionArea style={{ background: '#fff', borderRadius: '8px', height: '100%', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <RadialBar selectedVm={selectedVm} chartData={chartData} />
            </CardContent>
          </CardActionArea>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}