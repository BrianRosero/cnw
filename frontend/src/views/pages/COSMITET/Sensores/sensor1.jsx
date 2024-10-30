import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const SensorCardWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  maxWidth: 400,
  textAlign: "center",
}));

const SensorCard = ({ sensor }) => {
  return (
    <SensorCardWrapper>
      <h3>{sensor.sensor}</h3>
      <p><strong>ID:</strong> {sensor.objid}</p>
      <p><strong>Mensaje:</strong> {sensor.probe}</p>
      <p><strong>Sensor IP:</strong> {sensor.device}</p>
      <p><strong>Grupo:</strong> {sensor.group}</p>
      <p><strong>Estado:</strong> {sensor.status}</p>
      <p><strong>Valor de mi sensor Mbit/s:</strong> {sensor.lastvalue}</p>
      <p><strong>Prioridad:</strong> {sensor.priority}</p>
    </SensorCardWrapper>
  );
};

const SENSOR1 = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.99.0.228:8083/prtg-api');
        setSensorData(response.data.sensors);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    // Realizar la primera solicitud al montar el componente
    fetchData();

    // Configurar un temporizador para actualizar los datos cada 5 segundos
    const intervalId = setInterval(fetchData, 1000); // Cambiado de 1000 a 5000 para que actualice cada 5 segundos

    // Limpiar el temporizador cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // <--- Asegúrate de que esta dependencia esté vacía para que useEffect solo se ejecute una vez al montar

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