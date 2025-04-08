import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const BoardESECENTRO = () => {
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

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const updateChart = (data) => {
    const labels = data.sensors.map(sensor => sensor.device);
    const values = data.sensors.map(sensor => parseFloat(sensor.lastvalue));
    const ctx = document.getElementById("prtgChart");

    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).data.labels = labels;
      Chart.getChart(ctx).data.datasets[0].data = values;
      Chart.getChart(ctx).update();
    } else {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Valor del Sensor",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
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

  return (
    <div>
      <h1>Datos en Tiempo Real de PRTG:</h1>
      <canvas id="prtgChart" width="400" height="400"></canvas>
    </div>
  );
};

export default BoardESECENTRO;
