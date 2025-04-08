/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const SensorCardWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  maxWidth: 400,
  textAlign: "center",
}));

const ChannelCard = ({ channel }) => {
  return (
    <SensorCardWrapper>
      <h3>{channel.name}</h3>
      <p><strong>Último Valor:</strong> {channel.lastvalue}</p>
      <p><strong>Valor Raw:</strong> {channel.lastvalue_raw}</p>
    </SensorCardWrapper>
  );
};

const Sensor = () => {
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.200.155:8083/prtg-api/CAMARACC/maquina');
        console.log('Data fetched from API:', response.data);
        setChannelData(response.data.channels || []); // Asegúrate de que 'channels' existe
      } catch (error) {
        console.error('Error fetching channel data:', error.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Datos de Canales</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {channelData.map(channel => (
          <ChannelCard key={channel.objid} channel={channel} />
        ))}
      </div>
    </div>
  );
};

export default Sensor;*/

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

const ChannelCard = ({ channel }) => {
  return (
    <SensorCardWrapper>
      <h3>{channel.name}</h3>
      <p><strong>Último Valor:</strong> {channel.lastvalue}</p>
    </SensorCardWrapper>
  );
};

const Sensor = () => {
  const [channelData, setChannelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.200.155:8083/prtg-api/ESECENTRO/COCLOESECAP02');
        console.log('Data fetched from API:', response.data);
        setChannelData(response.data.channels || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching channel data:', error.message);
        setError('Failed to fetch channel data');
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000); // Refrescar cada 10 segundos

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const channel11 = channelData.find(channel => channel.objid === 2);
  const channel9 = channelData.find(channel => channel.objid === 9);

  return (
    <div>
      <h1>Datos del Canal</h1>
      {channel11 && (
        <div>
          <h2>Canal 11</h2>
          <ChannelCard channel={channel11} />
        </div>
      )}
      {channel9 && (
        <div>
          <h2>Canal 9</h2>
          <ChannelCard channel={channel9} />
        </div>
      )}
      {!channel11 && !channel9 && <p>No data available for specified channels</p>}
    </div>
  );
};

export default Sensor;