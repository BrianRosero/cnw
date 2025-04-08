import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tickets = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.200.155:8083/tickets');
        setData(response.data);
      } catch (err) {
        setError('Error al obtener datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Datos de la API de osTicket</h2>
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {data ? JSON.stringify(data, null, 2) : "No hay datos"}
            </pre>
    </div>
  );
};

export default Tickets;
