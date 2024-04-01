import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { sendEmail } from './emailService';
import InformeDetallado from './InformeDetallado';
import ClientesSelect from './ClientesSelect';

const Informes = () => {
  const [informeData, setInformeData] = useState(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (clienteSeleccionado) {
      fetchInformeData(clienteSeleccionado);
    }
  }, [clienteSeleccionado]);

  const fetchInformeData = async (cliente) => {
    setCargando(true);
    try {
      const response = await axios.get(`/api/informe/${cliente}`);
      setInformeData(response.data);
    } catch (error) {
      console.error('Error al obtener datos del informe:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleEnviarInforme = async () => {
    if (!informeData) return;

    try {
      await sendEmail({
        to: clienteSeleccionado.email,
        subject: 'Informe Diario Semanal',
        body: `Adjunto encontrará el informe correspondiente al día ${format(new Date(), 'dd/MM/yyyy')}.`,
        attachment: informeData,
      });
      alert('Informe enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar informe por correo:', error);
      alert('Error al enviar el informe. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <h1>Informe Diario Semanal</h1>
      <ClientesSelect onSelect={setClienteSeleccionado} />
      {cargando ? (
        <p>Cargando informe...</p>
      ) : informeData ? (
        <div>
          <InformeDetallado data={informeData} />
          <button onClick={handleEnviarInforme}>Enviar Informe por Correo</button>
        </div>
      ) : (
        <p>Seleccione un cliente para ver el informe.</p>
      )}
    </div>
  );
};

export default Informes;
