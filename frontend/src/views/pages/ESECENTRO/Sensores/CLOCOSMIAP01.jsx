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
      <p><strong>Último valor:</strong> {sensor.lastvalue}</p>
      <p><strong>Prioridad:</strong> {sensor.priority}</p>
    </SensorCardWrapper>
  );
};
// objid, probe, group, device, sensor, status, message, lastvalue, priority, favorite, deviceid, device_type,device_manufacturer,device_uptime',

const SENSOR1 = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/prtg-api/ESECENTRO');
        setSensorData(response.data.sensors);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };
    // Realizar la primera solicitud al montar el componente
    fetchData();
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