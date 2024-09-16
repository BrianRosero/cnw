/*// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from '../../../ui-component/cards/MainCard.jsx';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title="Sample Card">
    <Typography variant="body2">
      Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna
      alissa. Ut enif ad
      minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue
      dolor in reprehended
      in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in
      culpa qui officiate
      descent molls anim id est labours.
    </Typography>
  </MainCard>
);

export default SamplePage;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const response = await axios.get('http://192.168.200.155:8081/sensors');
        setSensors(response.data.sensors);
      } catch (error) {
        console.error('Error fetching sensors:', error.message);
      }
    };

    fetchSensors();
  }, []);

  return (
    <div className="App">
      <h1>Lista de Sensores</h1>
      <ul>
        {sensors.map((sensor) => (
          <li key={sensor.objid}>
            {sensor.objid}: {sensor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

