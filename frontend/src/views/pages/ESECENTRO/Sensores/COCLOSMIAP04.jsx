import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const SENSOR1 = () => {
  const [sensorData, setSensorData] = useState([]);
  const [sensorValues, setSensorValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/prtg-api/ESECENTRO');
        setSensorData(response.data.sensors);

        // Preparar datos para el gráfico
        const values = response.data.sensors.map(sensor => ({
          name: sensor.objid,
          value: parseFloat(sensor.lastvalue.replace(/[^0-9.-]+/g,""))  // Asegurar que los valores sean números
        }));
        setSensorValues(prevValues => [...prevValues, ...values]);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    // Realizar la primera solicitud al montar el componente
    fetchData();

    // Configurar un temporizador para actualizar los datos cada 3 segundos
    const intervalId = setInterval(fetchData, 3000);

    // Limpiar el temporizador cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  console.log("Valores del sensor en el estado:", sensorValues);

  // Seleccionar solo los últimos 15 valores
  const lastValues = sensorValues.slice(-100);

  const series = [
    {
      name: "Valor del Sensor",
      data: lastValues.map((sensor) => sensor.value),
    }
  ];

  const options = {
    chart: {
      id: "sensor-chart",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    yaxis: {
      title: {
        text: 'Valor del Sensor Mbit/s',
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${value} Mbit/s`;
        }
      }
    },
    legend: {
      position: 'top',
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: '100%',
          }
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            width: '100%',
          }
        },
      },
    ],
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    textAlign: 'center',
  };

  const chartContainerStyle = {
    width: '200%', // Ajustar el ancho del contenedor del gráfico
    height: '300px', // Ajustar la altura del contenedor del gráfico
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Datos de Sensores</h1>
      <div style={chartContainerStyle}>
        <h2 style={headerStyle}>Gráfico de Valor del Sensor</h2>
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default SENSOR1;
