import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { openDB } from 'idb';

const CombinedSensors = () => {
  const [sensorValues, setSensorValues] = useState([]);
  const [numValues, setNumValues] = useState(100);

  let db;

  const initDB = useCallback(async () => {
    try {
      const dbInstance = await openDB('sensorDB', 1, {
        upgrade(db) {
          db.createObjectStore('sensorStore', { keyPath: 'id', autoIncrement: true });
        },
      });
      return dbInstance;
    } catch (error) {
      console.error('Error initializing database:', error);
      return null;
    }
  }, []);

  const fetchData = useCallback(async (dbInstance) => {
    if (!dbInstance) return;
    try {
      const response = await axios.get('http://localhost:8080/prtg-api/ESECENTRO');
      const values = response.data.sensors.map(sensor => ({
        name: sensor.objid,
        value: parseFloat(sensor.lastvalue.replace(/[^0-9.-]+/g, "")),
        time: new Date().toLocaleTimeString()
      }));

      const tx = dbInstance.transaction('sensorStore', 'readwrite');
      const store = tx.objectStore('sensorStore');
      await Promise.all(values.map(async (value) => {
        try {
          await store.add(value);
        } catch (error) {
          console.error('Error adding value to the store:', error);
        }
      }));

      const allValues = await store.getAll();
      setSensorValues(allValues);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  }, []);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      fetchData(db);
    }
  }, [fetchData, db]);

  useEffect(() => {
    let intervalId;
    let dbInstance;

    const setupDataFetching = async () => {
      dbInstance = await initDB();
      db = dbInstance; // Set the global db variable
      if (dbInstance) {
        fetchData(dbInstance);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        intervalId = setInterval(() => fetchData(dbInstance), 60000);
      }
    };

    setupDataFetching();

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [initDB, fetchData, handleVisibilityChange]);

  const lastValuesSensor1 = sensorValues.filter(sensor => sensor.name === 2099).slice(-numValues);
  const lastValuesSensor2 = sensorValues.filter(sensor => sensor.name === 2098).slice(-numValues);

  const series = [
    {
      name: "Maquina Productiva",
      data: lastValuesSensor1.map(sensor => sensor.value),
    },
    {
      name: "Maquina Pruebas",
      data: lastValuesSensor2.map(sensor => sensor.value),
    }
  ];

  const options = {
    chart: {
      id: 'combined-sensors-chart',
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
    colors: ['#004a8f', '#00b8a9'],
    dataLabels: {
      enabled: false
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
      type: 'category',
      categories: lastValuesSensor1.map(sensor => sensor.time), // Assuming both sensors have the same time points
      labels: {
        format: 'HH:mm:ss'
      }
    },
    yaxis: {
      title: {
        text: 'Consumo (Mbit/s)',
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
        format: 'HH:mm:ss'
      }
    },
    legend: {
      position: 'top',
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
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
          }
          .button-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          .button-container button {
            margin: 0 10px;
            padding: 10px 20px;
            border: none;
            background-color: #004a8f;
            color: white;
            cursor: pointer;
            border-radius: 5px;
          }
          .button-container button:hover {
            background-color: #00376b;
          }
        `}
      </style>
      <div className="area-graph-container">
        <div className="button-container">
          <button onClick={() => setNumValues(30)}>30 minutos</button>
          <button onClick={() => setNumValues(60)}>1 hora</button>
          <button onClick={() => setNumValues(1440)}>24 horas</button>
        </div>
        <Chart options={options} series={series} type="area" height={350} />
      </div>
    </>
  );
};

export default CombinedSensors;
