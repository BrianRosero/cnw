import React, { useState } from 'react';
import RotatingSVG from './RotatingSVG.jsx'; // Asegúrate de que la ruta esté correcta.

const ButtonHorus = () => {
  const [showDesign, setShowDesign] = useState(false);

  const toggleDesign = () => {
    setShowDesign((prev) => !prev); // Cambia el estado al hacer clic
  };

  return (
    <div>
      {/* El botón que se muestra */}
      <button
        onClick={toggleDesign}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        <RotatingSVG />
      </button>
      {/* Si deseas mostrar algo adicional al hacer clic */}
      {showDesign && <div>¡Horus activado!</div>}
    </div>
  );
};

export default ButtonHorus;
