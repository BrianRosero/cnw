import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
//import axios from 'axios';

const CombinedAreaGraph = () => {
  const initialData = [
    { x: '2024-05-01', y: 50 },
    { x: '2024-05-02', y: 45 },
    { x: '2024-05-03', y: 60 },
    { x: '2024-05-04', y: 30 },
    { x: '2024-05-05', y: 70 },
    { x: '2024-05-06', y: 55 },
  ];

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => prevData.map((point, index) => {
        if (index === prevData.length - 1) {
          return { ...point, y: point.y + Math.floor(Math.random() * 20) - 10 };
        } else {
          return point;
        }
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        text: 'Consumo (MBits)',
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
          series={[{ data: data }]}
          type="area"
          width="100%"
          height={400}
        />
      </div>
    </>
  );
}

export default CombinedAreaGraph;
