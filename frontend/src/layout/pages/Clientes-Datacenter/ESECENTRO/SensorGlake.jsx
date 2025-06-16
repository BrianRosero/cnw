import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Tabs, Tab, Box, CardContent, CardActionArea, Typography, ButtonGroup, Button } from '@mui/material';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { GraficasArea } from './Test/GraficoArea.jsx';
import { getChartOptions } from './Test/GraficoArea.jsx';
import RadialBar from './Test/RadialBar.jsx';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';

import Info1 from './Sensores/COCLOESECAP02/info.jsx';
import RadialBar1 from './Sensores/COCLOESECAP02/bar.jsx';
import Area1 from './Sensores/COCLOESECAP02/area.jsx';
import Info2 from './Sensores/COCLOESECAP03/info.jsx';
import RadialBar2 from './Sensores/COCLOESECAP03/bar.jsx';
import Area2 from './Sensores/COCLOESECAP03/area.jsx';
import Info3 from './Sensores/COCLOESECAP04/info.jsx';
import RadialBar3 from './Sensores/COCLOESECAP04/bar.jsx';
import Area3 from './Sensores/COCLOESECAP04/area.jsx';
import Info4 from './Sensores/COCLOESECAP05/info.jsx';
import RadialBar4 from './Sensores/COCLOESECAP05/bar.jsx';
import Area4 from './Sensores/COCLOESECAP05/area.jsx';
import Info5 from './Sensores/COCLOESECAP06/info.jsx';
import RadialBar5 from './Sensores/COCLOESECAP06/bar.jsx';
import Area5 from './Sensores/COCLOESECAP06/area.jsx';
import Info6 from './Sensores/COCLOESECAP07/info.jsx';
import RadialBar6 from './Sensores/COCLOESECAP07/bar.jsx';
import Area6 from './Sensores/COCLOESECAP07/area.jsx';
import Info7 from './Sensores/COCLOESECAP08/info.jsx';
import RadialBar7 from './Sensores/COCLOESECAP08/bar.jsx';
import Area7 from './Sensores/COCLOESECAP08/area.jsx';
import Info8 from './Sensores/COCLOESECAP09/info.jsx';
import RadialBar8 from './Sensores/COCLOESECAP09/bar.jsx';
import Area8 from './Sensores/COCLOESECAP09/area.jsx';
import Info9 from './Sensores/COCLOESECAP10/info.jsx';
import RadialBar9 from './Sensores/COCLOESECAP10/bar.jsx';
import Area9 from './Sensores/COCLOESECAP10/area.jsx';
import Info10 from './Sensores/COCLOESECAP11/info.jsx';
import RadialBar10 from './Sensores/COCLOESECAP11/bar.jsx';
import Area10 from './Sensores/COCLOESECAP11/area.jsx';
import Info11 from './Sensores/COCLOESECAP12/info.jsx';
import RadialBar11 from './Sensores/COCLOESECAP12/bar.jsx';
import Area11 from './Sensores/COCLOESECAP12/area.jsx';
import Info12 from './Sensores/COCLOESECAP13/info.jsx';
import RadialBar12 from './Sensores/COCLOESECAP13/bar.jsx';
import Area12 from './Sensores/COCLOESECAP13/area.jsx';
import Info13 from './Sensores/COCLOESECAP14/info.jsx';
import RadialBar13 from './Sensores/COCLOESECAP14/bar.jsx';
import Area13 from './Sensores/COCLOESECAP14/area.jsx';
import Info14 from './Sensores/COCLOESECAP15/info.jsx';
import RadialBar14 from './Sensores/COCLOESECAP15/bar.jsx';
import Area14 from './Sensores/COCLOESECAP15/area.jsx';
import Info15 from './Sensores/COCLOESECAP16/info.jsx';
import RadialBar15 from './Sensores/COCLOESECAP16/bar.jsx';
import Area15 from './Sensores/COCLOESECAP16/area.jsx';
import Info16 from './Sensores/COCLOESECAP17/info.jsx';
import RadialBar16 from './Sensores/COCLOESECAP17/bar.jsx';
import Area16 from './Sensores/COCLOESECAP17/area.jsx';
import Info17 from './Sensores/COCLOESECAP18/info.jsx';
import RadialBar17 from './Sensores/COCLOESECAP18/bar.jsx';
import Area17 from './Sensores/COCLOESECAP18/area.jsx';
import Info18 from './Sensores/COCLOESECAP19/info.jsx';
import RadialBar18 from './Sensores/COCLOESECAP19/bar.jsx';
import Area18 from './Sensores/COCLOESECAP19/area.jsx';
import Info19 from './Sensores/COCLOESECAP20/info.jsx';
import RadialBar19 from './Sensores/COCLOESECAP20/bar.jsx';
import Area19 from './Sensores/COCLOESECAP20/area.jsx';
import Info20 from './Sensores/COCLOESECAP21/info.jsx';
import RadialBar20 from './Sensores/COCLOESECAP21/bar.jsx';
import Area20 from './Sensores/COCLOESECAP21/area.jsx';
import Info21 from './Sensores/COCLOESECAP22/info.jsx';
import RadialBar21 from './Sensores/COCLOESECAP22/bar.jsx';
import Area21 from './Sensores/COCLOESECAP22/area.jsx';
import Info22 from './Sensores/COCLOESECAP23/info.jsx';
import RadialBar22 from './Sensores/COCLOESECAP23/bar.jsx';
import Area22 from './Sensores/COCLOESECAP23/area.jsx';
import Info23 from './Sensores/COCLOESECAP24/info.jsx';
import RadialBar23 from './Sensores/COCLOESECAP24/bar.jsx';
import Area23 from './Sensores/COCLOESECAP24/area.jsx';
import Info24 from './Sensores/COCLOESECDA01/info.jsx';
import RadialBar24 from './Sensores/COCLOESECDA01/bar.jsx';
import Area24 from './Sensores/COCLOESECDA01/area.jsx';

const API_URL = 'http://localhost:8083/vcenter/vms-db';
const API_URL_1 = 'http://localhost:8083/vcenter/vms-db1';

const ResponsiveGridLayout = WidthProvider(Responsive);
const MAX_DATA_POINTS = 50;


const styles = {
  tabs: {
    background: '#fff',
    borderRadius: '8px',
    color: '#000',
  },
  indicator: {
    backgroundColor: '#4dae4d',
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

const CustomButton = styled(Button)(({ variant }) => ({
  backgroundColor: variant === 'default' ? '#282c60' : '#abb8c3',
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: '0px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  flex: 1, // Hace que los botones ocupen el 50% del ancho
  height: '50px', // Ajusta la altura de los botones
  '&:hover': {
    backgroundColor: variant === 'default' ? '#34a434' : '#4dae4d',
  },
}));

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
  const [graficoSeleccionado, setGraficoSeleccionado] = useState('COCLOESECAP02');
  const intervalRef = useRef(null);

  const [filteredTimestamps, setFilteredTimestamps] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('Uso de CPU');
  const chartOptions = getChartOptions(filteredTimestamps, selectedMetric);

  const combinedCards = {
    dbVms: ['COCLOESECAP02', 'COCLOESECAP03', 'COCLOESECAP04', 'COCLOESECAP05', 'COCLOESECAP06', 'COCLOESECAP07', 'COCLOESECAP08', 'COCLOESECAP09'],
    appVms: ['COCLOESECAP10', 'COCLOESECAP11', 'COCLOESECAP12', 'COCLOESECAP13', 'COCLOESECAP14', 'COCLOESECAP15', 'COCLOESECAP16', 'COCLOESECAP17', 'COCLOESECAP18', 'COCLOESECAP19'],
    otherVms: ['COCLOESECAP20', 'COCLOESECAP21', 'COCLOESECAP22', 'COCLOESECAP23', 'COCLOESECAP24', 'COCLOESECDA01'],
  };

  const hasInitialized = useRef(false);

  const fetchVms = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch(API_URL),
        fetch(API_URL_1),
      ]);

      if (!response1.ok || !response2.ok) throw new Error('Error al obtener datos');

      const data1 = await response1.json();
      const data2 = await response2.json();

      if (!data1.data || !data2.data) throw new Error('Formato inesperado');

      // Combinar ambos datos
      const combinedApiData = [...data1.data, ...data2.data];
      const apiData = { dbVms: {}, appVms: {}, otherVms: {} };

      combinedApiData.forEach(vm => {
        if (!vm.name.includes('ESE')) return;
        const category = vm.name.includes('BD') || vm.name.includes('AP0') ? 'dbVms' :
          vm.name.includes('AP1') ? 'appVms' : 'otherVms';
        if (!apiData[category][vm.name]) apiData[category][vm.name] = [];

        apiData[category][vm.name].push({
          name: vm.name,
          cpu: vm.cpu_usage_mhz,
          memory: vm.memory_usage_mb,
          timestamp: vm.timestamp,
          estado: vm.power_state || 'Desconocido',
          host: vm.host || 'Desconocido',
          nucleos: vm.cpu_cores || 0,
          memory_gb: vm.memory_gb || 0,
          storage_usage_gb: vm.storage_usage_gb || 0,  // Almacenamiento usado en GB
          cores_per_socket: vm.cores_per_socket || 0,  // Núcleos por socket
          instance_uuid: vm.instance_uuid || 'Desconocido',    // UUID de la instancia
          guest_info: vm.guest_info || {},             // Información del sistema operativo
          os_fullname: vm.guest_info?.os_fullname || 'Desconocido', // Nombre completo del OS
          hostname: vm.guest_info?.hostname || 'Desconocido',       // Nombre de host
          ip_addresses: vm.guest_info?.ip_addresses || [],  // Direcciones IP
          tools_status: vm.guest_info?.tools_status || 'Desconocido', // Estado de las VMware Tools
          tools_version: vm.guest_info?.tools_version || 'Desconocido', // Versión de VMware Tools
          disks: vm.disks || [],
          network_adapters: vm.network_adapters || [],
          ...vm,
          source: 'api', category,
        });
      });

      // Ordenar los nombres de las VMs dentro de cada categoría
      Object.keys(apiData).forEach(category => {
        apiData[category] = Object.fromEntries(
          Object.entries(apiData[category]).sort(([a], [b]) => a.localeCompare(b)),
        );
      });

      setCombinedData(apiData);

      // Solo seleccionar COCLOESECAP02 la primera vez
      if (!hasInitialized.current) {
        const defaultVmName = 'COCLOESECAP02';
        let found = false;

        Object.entries(apiData).forEach(([category, vms]) => {
          if (vms[defaultVmName] && !found) {
            const vmList = vms[defaultVmName];
            const latestVm = vmList[vmList.length - 1];

            setGraficoSeleccionado(defaultVmName);
            setSelectedVm({
              name: defaultVmName,
              type: category,
              estado: latestVm?.estado,
              host: latestVm?.host,
              nucleos: latestVm?.nucleos,
              memory_gb: latestVm?.memory_gb,
              storage_usage_gb: latestVm?.storage_usage_gb,
              cores_per_socket: latestVm?.cores_per_socket,
              instance_uuid: latestVm?.instance_uuid,
              os_fullname: latestVm?.os_fullname,
              hostname: latestVm?.hostname,
              ip_addresses: latestVm?.ip_addresses,
              tools_status: latestVm?.tools_status,
              tools_version: latestVm?.tools_version,
              disks: latestVm?.disks,
              network_adapters: latestVm?.network_adapters,
            });

            updateChartData(vmList);
            found = true;
          }
        });

        hasInitialized.current = true; // Ya se hizo la selección inicial
      }
    } catch (error) {
      console.error('Error obteniendo las máquinas virtuales:', error);
    }
  };

  useEffect(() => {
    fetchVms(); // Llama al inicio
    intervalRef.current = setInterval(fetchVms, 10000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (selectedVm) {
      updateChartData(combinedData[selectedVm.type]?.[selectedVm.name] || []);
    }
  }, [combinedData, selectedVm]);

  const handleCardClick = useCallback((id, category) => {
    setGraficoSeleccionado(id);
    setSelectedVm({ name: id, type: category });
    const data = combinedData[category]?.[id] || [];
    const vmList = combinedData[category]?.[id] || [];
    const latestVm = vmList[vmList.length - 1];

    setSelectedVm({
      name: id,
      type: category,
      estado: latestVm?.estado,
      host: latestVm?.host,
      nucleos: latestVm?.nucleos,
      memory_gb: latestVm?.memory_gb,
      storage_usage_gb: latestVm?.storage_usage_gb,
      cores_per_socket: latestVm?.cores_per_socket,
      instance_uuid: latestVm?.instance_uuid,
      os_fullname: latestVm?.os_fullname,
      hostname: latestVm?.hostname,
      ip_addresses: latestVm?.ip_addresses,
      tools_status: latestVm?.tools_status,
      tools_version: latestVm?.tools_version,
      disks: latestVm?.disks,
      network_adapters: latestVm?.network_adapters,
    });
    updateChartData(data);
  }, [combinedData]);

  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  const updateChartData = (history) => {
    // Filtra datos sin timestamp válido
    const validHistory = history.filter(vm => vm.timestamp && !isNaN(new Date(vm.timestamp).getTime()));

    if (validHistory.length === 0) {
      console.warn('No hay datos válidos para mostrar.');
      return setChartData({ cpu: [], memory: [], timestamps: [] });
    }

    // Ordena por fecha y toma solo los válidos
    const sortedHistory = validHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    setChartData({
      timestamps: sortedHistory
        .map(vm => new Date(vm.timestamp).toLocaleTimeString())
        .slice(-MAX_DATA_POINTS),
      cpu: sortedHistory
        .map(vm => vm.cpu_usage_mhz)
        .slice(-MAX_DATA_POINTS),
      memory: sortedHistory
        .map(vm => vm.memory_usage_mb)
        .slice(-MAX_DATA_POINTS),
    });
  };

  const defaultLayout = [
    { i: '1', x: 0, y: 0, w: 3, h: 7 },
    { i: '2', x: 4, y: 0, w: 9, h: 1 },
    { i: '3', x: 4, y: 2, w: 9, h: 6 },
  ];

  // Componente de graficos basado en la seleccion actual
  const graficoComponentes = {
    COCLOESECAP02: { RadialBar: <RadialBar1 />, Info: <Info1 />, Area: <Area1 /> },
    COCLOESECAP03: { RadialBar: <RadialBar2 />, Info: <Info2 />, Area: <Area2 /> },
    COCLOESECAP04: { RadialBar: <RadialBar3 />, Info: <Info3 />, Area: <Area3 /> },
    COCLOESECAP05: { RadialBar: <RadialBar4 />, Info: <Info4 />, Area: <Area4 /> },
    COCLOESECAP06: { RadialBar: <RadialBar5 />, Info: <Info5 />, Area: <Area5 /> },
    COCLOESECAP07: { RadialBar: <RadialBar6 />, Info: <Info6 />, Area: <Area6 /> },
    COCLOESECAP08: { RadialBar: <RadialBar7 />, Info: <Info7 />, Area: <Area7 /> },
    COCLOESECAP09: { RadialBar: <RadialBar8 />, Info: <Info8 />, Area: <Area8 /> },
    COCLOESECAP10: { RadialBar: <RadialBar9 />, Info: <Info9 />, Area: <Area9 /> },
    COCLOESECAP11: { RadialBar: <RadialBar10 />, Info: <Info10 />, Area: <Area10 /> },
    COCLOESECAP12: { RadialBar: <RadialBar11 />, Info: <Info11 />, Area: <Area11 /> },
    COCLOESECAP13: { RadialBar: <RadialBar12 />, Info: <Info12 />, Area: <Area12 /> },
    COCLOESECAP14: { RadialBar: <RadialBar13 />, Info: <Info13 />, Area: <Area13 /> },
    COCLOESECAP15: { RadialBar: <RadialBar14 />, Info: <Info14 />, Area: <Area14 /> },
    COCLOESECAP16: { RadialBar: <RadialBar15 />, Info: <Info15 />, Area: <Area15 /> },
    COCLOESECAP17: { RadialBar: <RadialBar16 />, Info: <Info16 />, Area: <Area16 /> },
    COCLOESECAP18: { RadialBar: <RadialBar17 />, Info: <Info17 />, Area: <Area17 /> },
    COCLOESECAP19: { RadialBar: <RadialBar18 />, Info: <Info18 />, Area: <Area18 /> },
    COCLOESECAP20: { RadialBar: <RadialBar19 />, Info: <Info19 />, Area: <Area19 /> },
    COCLOESECAP21: { RadialBar: <RadialBar20 />, Info: <Info20 />, Area: <Area20 /> },
    COCLOESECAP22: { RadialBar: <RadialBar21 />, Info: <Info21 />, Area: <Area21 /> },
    COCLOESECAP23: { RadialBar: <RadialBar22 />, Info: <Info22 />, Area: <Area22 /> },
    COCLOESECAP24: { RadialBar: <RadialBar23 />, Info: <Info23 />, Area: <Area23 /> },
    COCLOESECCDA01: { RadialBar: <RadialBar24 />, Info: <Info24 />, Area: <Area24 /> },

    COCLOESECAP25: { RadialBar: <RadialBar24 />, Info: <Info24 />, Area: <Area24 /> },
  };

  //const tabLabels = Object.keys(combinedData);
  const tabLabels = ['Grupo 1', 'Grupo 2', 'Grupo 3'];

  const getComponent = (type) => graficoComponentes[graficoSeleccionado]?.[type] || null;

  const [activeGraph, setActiveGraph] = useState('graph1');

  const handleToggle = (graph) => {
    setActiveGraph(graph);
  };

  return (
    <div>
      <Tabs
        value={tabIndex || 0}
        onChange={(e, newIndex) => handleChangeIndex(newIndex)}
        style={styles.tabs}
        variant="fullWidth"
        TabIndicatorProps={{ style: styles.indicator }}
      >
        {tabLabels.map((label, i) => (
          <Tab key={i} label={label} />
        ))}
      </Tabs>
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {combinedData && Object.entries(combinedData).length > 0 ? (
          Object.entries(combinedData).map(([category, vms]) => (
            <div key={category} style={styles.slide}>
              {Object.entries(vms).map(([name, vmList]) => {
                const latestVm = vmList[vmList.length - 1]; // Último dato (el más reciente)
                return (
                  <VmCard
                    key={name}
                    name={name}
                    estado={latestVm.estado}
                    host={latestVm.host}
                    nucleos={latestVm.nucleos}
                    memory_gb={latestVm.memory_gb}
                    storage_usage_gb={latestVm.storage_usage_gb}
                    cores_per_socket={latestVm.cores_per_socket}
                    os_fullname={latestVm.os_fullname}
                    hostname={latestVm.hostname}
                    ip_addresses={latestVm.ip_addresses}
                    tools_status={latestVm.tools_status}
                    tools_version={latestVm.tools_version}
                    isSelected={selectedVm?.name === name}
                    onClick={() => {
                      handleCardClick(name);
                      setSelectedVm({
                        name,
                        type: category,
                        estado: latestVm.estado,
                        host: latestVm.host,
                        nucleos: latestVm.nucleos,
                        memory_gb: latestVm.memory_gb,
                        storage_usage_gb: latestVm.storage_usage_gb,
                        cores_per_socket: latestVm.cores_per_socket,
                        os_fullname: latestVm.os_fullname,
                        hostname: latestVm.hostname,
                        ip_addresses: latestVm.ip_addresses,
                        tools_status: latestVm.tools_status,
                        tools_version: latestVm.tools_version,
                      });
                    }}
                  />
                );
              })}
            </div>
          ))
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>No data available</div>
        )}
      </SwipeableViews>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: defaultLayout || {} }}
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
              <RadialBar selectedVm={selectedVm} chartData={chartData} />
            </CardContent>
          </CardActionArea>
        </div>
        <div key="2" style={{ width: '100%', height: '100%' }}>
          <CardActionArea
            style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              color: '#8e8e8e',
              overflow: 'hidden',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '16px',
              }}
            >
              {getComponent('Info')}
            </CardContent>
          </CardActionArea>
        </div>
        <div key="3">
          {/* Botones superiores */}
          <ButtonGroup fullWidth style={{borderRadius: '8px'}}>
            <div style={{ display: 'flex', width: '100%' }}>
              <CustomButton
                variant={activeGraph === 'graph1' ? 'default' : 'outline'}
                onClick={() => handleToggle('graph1')}
                style={{ flex: 1 }}
              >
                Detalle
              </CustomButton>
              <CustomButton
                variant={activeGraph === 'graph2' ? 'default' : 'outline'}
                onClick={() => handleToggle('graph2')}
                style={{ flex: 1 }}
              >
                General
              </CustomButton>
            </div>
          </ButtonGroup>
          <CardActionArea style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#666666',
            position: 'relative',
          }}>
            {activeGraph === 'graph1' && (
              <motion.div
                key={`graph1-${selectedVm?.name || 'default'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="h-full w-full p-4 bg-gray-50 rounded-lg shadow-inner"
              >
                {selectedVm && chartData?.cpu?.length > 0 && chartData?.memory?.length > 0 && chartData?.timestamps?.length > 0 && (
                  <GraficasArea chartOptions={chartOptions} chartData={chartData} />
                )}
              </motion.div>
            )}

            {activeGraph === 'graph2' && getComponent('Area') && (
              <motion.div
                key={`graph2-${selectedVm?.name || 'default'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="h-full w-full p-4 bg-gray-50 rounded-lg shadow-inner"
              >
                {getComponent('Area')}
              </motion.div>
            )}
          </CardActionArea>
        </div>
      </ResponsiveGridLayout>;
    </div>
  )
    ;
}