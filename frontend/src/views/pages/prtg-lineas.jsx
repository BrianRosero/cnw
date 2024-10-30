import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Paper } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { css } from "@emotion/react";

const BoardESECENTRO = () => {
  const [content, setContent] = useState("");
  const [isAdminESECENTRO, setIsAdminESECENTRO] = useState(false);
  const [realtimedata, setrealtimedata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.200.155:8083/prtg-api');
        const jsonData = await response.json();
        setrealtimedata(jsonData);
        updateChart(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Realizar la primera solicitud al montar el componente
    fetchData();

    // Establecer un intervalo para realizar solicitudes periódicas cada 5 segundos
    const intervalId = setInterval(fetchData, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    UserService.getAdminESECENTRO().then(
      (response) => {
        setContent(response.data);
        setIsAdminESECENTRO(true); // Establecer como moderador si la solicitud tiene éxito
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(errorMessage);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);


  const updateChart = (data) => {
    const sensors = data.sensors;

    sensors.forEach((sensor, index) => {
      const sensorData = [
        { name: "Sensor 1", value: parseFloat(sensor.lastvalue) },
        { name: "Sensor 2", value: 100 - parseFloat(sensor.lastvalue) }
      ];

      // Obtener o crear una referencia al div del gráfico
      const ctx = document.getElementById(`prtgChart${index}`);

      // Verificar si el div existe
      if (ctx) {
        // Si existe, renderizar el gráfico
        renderChart(sensorData, index);
      }
    });
  };

  const renderChart = (data, index) => (
    <Paper key={index} elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <div id={`prtgChart${index}`} css={chartStyles}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );

  const chartStyles = css`
      width: 100%;
      height: 400px;
      margin-bottom: 20px;
  `;

  if (content === "Requiere permisos de Moderador normal") {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
    );
  }

  if (isAdminESECENTRO) {
    return (
      <div>
        <h1>Datos en Tiempo Real de PRTG:</h1>
        {realtimedata && realtimedata.sensors.map((sensor, index) => (
          renderChart([
            { name: "Sensor 1", value: parseFloat(sensor.lastvalue) },
            { name: "Sensor 2", value: 100 - parseFloat(sensor.lastvalue) }
          ], index)
        ))}
      </div>
    );
  }

  // Si no es moderador y no requiere permisos de moderador, se puede manejar según los requisitos
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardESECENTRO;
