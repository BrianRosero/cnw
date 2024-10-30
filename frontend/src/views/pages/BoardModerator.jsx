import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { css } from "@emotion/react";

const BoardESECENTRO = () => {
  const [content, setContent] = useState("");
  const [isAdminESECENTRO, setIsAdminESECENTRO] = useState(false);
  const [realtimedata, setRealTimeData] = useState(null);
  const [filteredSensors, setFilteredSensors] = useState(null);
  const [sensorTypeFilter, setSensorTypeFilter] = useState("Todos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.200.155:8083/prtg-api');
        const jsonData = await response.json();
        setRealTimeData(jsonData);
        // Inicialmente, mostramos todos los sensores
        setFilteredSensors(jsonData.sensors);
        updateChart(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    UserService.getAdminESECENTRO().then(
      (response) => {
        setContent(response.data);
        setIsAdminESECENTRO(true);
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

  useEffect(() => {
    // Filtrar los sensores cuando cambie el tipo de sensor
    if (realtimedata) {
      let filtered = realtimedata.sensors;

      // Filtrar por tipo de sensor
      if (sensorTypeFilter !== "Todos") {
        filtered = realtimedata.sensors.filter(sensor => sensor.type === sensorTypeFilter);
      }
      setFilteredSensors(filtered);
    }
  }, [realtimedata, sensorTypeFilter]);

  const updateChart = (data) => {
    // Implementation remains the same
  };

  const renderChart = (data, title) => (
    <div className="chart-card">
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>{title}</h2>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#8884d8" : "#82ca9d"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const handleSensorTypeChange = (event) => {
    setSensorTypeFilter(event.target.value);
  };

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
      <div style={{ background: "#fff", padding: "20px" }}>
        <h1 style={{ color: "#333", textAlign: "center" }}>Datos en Tiempo Real de PRTG:</h1>
        <div style={{ marginBottom: "20px" }}>
          <FormControl>
            <InputLabel>Tipo de Sensor</InputLabel>
            <Select value={sensorTypeFilter} onChange={handleSensorTypeChange}>
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="Sonda">Sonda</MenuItem>
              <MenuItem value="Servidor Central">Servidor Central</MenuItem>
              <MenuItem value="Internet">Internet</MenuItem>
              <MenuItem value="IP">IP</MenuItem>
              <MenuItem value="DNS">DNS</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="chart-container" style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredSensors &&
            filteredSensors.map((sensor, index) => (
              <Paper key={index} elevation={3} className="chart-paper" style={{ width: "20%", background: "#fff", padding: "20px", borderRadius: "10px", margin: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                {renderChart(
                  [
                    { name: sensor.device, value: parseFloat(sensor.lastvalue) },
                    { name: "Libre", value: 100 - parseFloat(sensor.lastvalue) }
                  ],
                  sensor.device
                )}
              </Paper>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardESECENTRO;
