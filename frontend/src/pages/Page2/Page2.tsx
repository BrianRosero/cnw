// App.tsx
import React from 'react';
import ContenedorConURL from './ContenedorConURL';
// Inicio de la pagina de configuración para la url de OSTiket
const App: React.FC = () => {
  const url = 'http://helpdesk.cnw.co/scp/index.php'; // la URL que deseas mostrar

  return (
    <div>
      <ContenedorConURL url={url} />
    </div>
  );
};

export default App;

