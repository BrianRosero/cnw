import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const Historico = () => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('1hour');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.200.155:8080/prtg-api/2139/${range}`);
        const historicalData = response.data.historicalData.map(item => ({
          x: new Date(item.date).getTime(),
          y: item.value
        }));
        setData(historicalData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };
    fetchData();
  }, [range]);

  const options = {
    chart: {
      type: 'area',
      zoom: {
        enabled: true
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Valores del sensor'
      }
    }
  };

  const series = [
    {
      name: 'Datos históricos',
      data: data
    }
  ];

  return (
    <div>
      <h2>Histórico de Datos del Sensor</h2>
      <div>
        <button onClick={() => setRange('1hour')}>1 Hora</button>
        <button onClick={() => setRange('1day')}>1 Día</button>
        <button onClick={() => setRange('10days')}>10 Días</button>
      </div>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default Historico;
