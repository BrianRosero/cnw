import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";
import useMediaQuery from '@mui/material/useMediaQuery';

const SensorCardWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(-2),
  maxWidth: 300,
  textAlign: "center",
  flex: "1 1 200px", // Agregar flexibilidad para la responsividad
}));

const SensorCard = ({ sensor }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const chartHeight = isSmallScreen ? 150 : 280;

  // Opciones para la gráfica radial
  const chartOptions = {
    chart: {
      height: chartHeight,
      type: "radialBar",
    },
    series: [sensor.lastvalue], // Asumiendo que sensor.lastvalue es un número
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#293450"
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: isSmallScreen ? "10px" : "13px"
          },
          value: {
            color: "#fff",
            fontSize: isSmallScreen ? "15px" : "20px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Progress"]
  };

  return (
    <SensorCardWrapper>
      <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height={chartHeight} />
    </SensorCardWrapper>
  );
};

const SENSOR1 = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.200.155:8080/prtg-api/ESECENTRO');
        setSensorData(response.data.sensors);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Datos de Sensores</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {sensorData.map(sensor => (
          <SensorCard key={sensor.objid} sensor={sensor} />
        ))}
      </div>
    </div>
  );
};

export default SENSOR1;
