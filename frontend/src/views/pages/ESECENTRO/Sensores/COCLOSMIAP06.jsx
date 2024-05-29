import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const SENSOR1 = () => {
  const [sensorData, setSensorData] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: '100%',
        width: '100%',
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
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ['#004a8f'],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
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
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/prtg-api/ESECENTRO');
        setSensorData(response.data.sensors);

        const sensorValues = response.data.sensors.map(sensor => parseFloat(sensor.lastvalue.replace(/[^0-9.-]+/g, "")));
        const sensorNames = response.data.sensors.map(sensor => sensor.sensor);

        setChartData({
          ...chartData,
          series: [{
            name: 'Valor de mi sensor Mbit/s',
            data: sensorValues,
          }],
          options: {
            ...chartData.options,
            xaxis: {
              categories: sensorNames,
            },
          },
        });
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <style>
        {`
          .chart-container {
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
        `}
      </style>
      <div className="chart-container">
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
    </>
  );
};

export default SENSOR1;
