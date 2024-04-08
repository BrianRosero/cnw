import React, { useState } from 'react';
import axios from 'axios';

const Informes = () => {
  const [report, setReport] = useState('');

  const handleUpload = async () => {
    try {
      await axios.post('/upload-report', { report });
      alert('Informe cargado exitosamente.');
      setReport('');
    } catch (error) {
      console.error('Error al cargar el informe:', error);
    }
  };

  return (
    <div>
      <h2>Cargar Informe</h2>
      <textarea value={report} onChange={(e) => setReport(e.target.value)} />
      <button onClick={handleUpload}>Subir Informe</button>
    </div>
  );
};

export default Informes;