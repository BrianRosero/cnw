import React from 'react';

const InformeDetallado = ({ data }) => {
  return (
    <div>
      <h2>Detalle del Informe</h2>
      <p>Simulación de información detallada del informe:</p>
      <ul>
        <li>Máquinas virtuales: {data.maquinasVirtuales}</li>
        <li>Memoria: {data.memoria}</li>
        <li>Procesamiento: {data.procesamiento}</li>
        <li>Disco: {data.disco}</li>
        <li>Drop de Datos: {data.dropDatos}</li>
        <li>Conexiones: {data.conexiones}</li>
      </ul>
    </div>
  );
};

export default InformeDetallado;
