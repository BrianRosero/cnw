import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const SENSOR1 = () => {
  const [sensorData, setSensorData] = useState([]);
  const [sensorValues, setSensorValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.200.155:8080/prtg-api/ESECENTRO');
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

  // Seleccionar solo los últimos 100 valores
  const lastValues = sensorValues.slice(-100);

  const series = [
    {
      name: "Valor del Sensor",
      data: lastValues.map((sensor) => sensor.value),
    }
  ];

  const options = {
    chart: {
      id: 'area-chart',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 800
        }
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
      },
    },
    colors: ['#5e8bff'],
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 5,
      colors: ['#5e8bff']
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#9aa0ac'
        },
        format: 'dd MMM'
      }
    },
    yaxis: {
      title: {
        text: 'Valor del Sensor (Mbit/s)',
        style: {
          color: '#9aa0ac'
        }
      },
      labels: {
        style: {
          colors: '#9aa0ac'
        }
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    },
    grid: {
      borderColor: '#f1f3fa'
    },
    title: {
      text: 'Consumo Diario de MBits',
      align: 'center',
      style: {
        color: '#333',
        fontSize: '20px',
        fontFamily: 'Arial, sans-serif'
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          width: '100%',
          height: 300,
          toolbar: {
            show: false
          }
        },
        markers: {
          size: 3
        },
        title: {
          style: {
            fontSize: '16px'
          }
        },
        xaxis: {
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: true,
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              fontSize: '12px'
            }
          }
        }
      }
    }]
  };

  return (
    <>
      <style>
        {`
          .area-graph-container {
            width: 100%;
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .selected-data {
            margin-top: 20px;
          }
          .selected-data h3 {
            color: #333;
            font-size: 18px;
            margin-bottom: 10px;
          }
          .selected-data ul {
            list-style: none;
            padding: 0;
          }
          .selected-data li {
            font-size: 16px;
            margin-bottom: 5px;
          }
          @media (max-width: 768px) {
            .area-graph-container {
              padding: 10px;
            }
            .selected-data h3 {
              font-size: 16px;
            }
            .selected-data li {
              font-size: 14px;
            }
          }
        `}
      </style>
      <div className="area-graph-container">
        <Chart
          options={options}
          series={series}
          type="area"
          width="100%"
          height={400}
        />
      </div>
    </>
  );
};

export default SENSOR1;
