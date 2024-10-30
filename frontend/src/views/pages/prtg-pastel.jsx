import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import Chart from "chart.js/auto";

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
    const intervalId = setInterval(fetchData, 5000);

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
    const labels = data.sensors.map(sensor => sensor.device);
    const values = data.sensors.map(sensor => parseFloat(sensor.lastvalue));

    // Obtener o crear una referencia al canvas del gráfico
    const ctx = document.getElementById("prtgChart");

    // Verificar si el gráfico ya está creado
    if (Chart.getChart(ctx)) {
      // Si el gráfico ya existe, actualizar los datos
      Chart.getChart(ctx).data.labels = labels;
      Chart.getChart(ctx).data.datasets[0].data = values;
      Chart.getChart(ctx).update();
    } else {
      // Si el gráfico no existe, crear uno nuevo
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [{
            label: "Valor del Sensor",
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 99, 132, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
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
      <div>
        <h1>Datos en Tiempo Real de PRTG:</h1>
        <canvas id="prtgChart" width="400" height="400"></canvas>
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
