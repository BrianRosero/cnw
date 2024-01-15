import React from 'react';
import IframeComponent from './ContenedorConURL';
//muestra la pagina de la empresa alojada en un contenedor
//pendiente, necesario aplicar configuracion para que sea relativa
const App: React.FC = () => {
  const urlExterna = 'https://www.cnw.co/nuestra-red/';

  return (
    <div>
      <IframeComponent src={urlExterna} />
    </div>
  );
};

export default App;
