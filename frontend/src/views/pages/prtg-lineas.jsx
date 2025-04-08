import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BoardESECENTRO = () => {
  const [realtimedata, setrealtimedata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.200.155:8083/prtg-api');
        const jsonData = await response.json();
        setrealtimedata(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamar una vez al montar
    fetchData();

    // Intervalo para actualizar cada 5 segundos
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const renderChart = (data, index) => (
    <Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );

  return (
    <div>
      <h1>Datos en Tiempo Real de PRTG:</h1>
      {realtimedata && realtimedata.sensors.map((sensor, index) => {
        const data = [
          { name: 'Sensor 1', value: parseFloat(sensor.lastvalue) },
          { name: 'Sensor 2', value: 100 - parseFloat(sensor.lastvalue) },
        ];
        return renderChart(data, index);
      })}
    </div>
  );
};

export default BoardESECENTRO;
