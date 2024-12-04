import React from 'react';
import design from './horus.svg'; // Asegúrate de que el archivo esté en la ruta correcta.

const RotatingSVG = () => {
  return (
    <div>
      <style>
        {`
          .rotating-svg {
            width: 100px; /* Tamaño ajustable */
            height: auto; /* Mantiene la proporción */
            animation: spin 2s linear infinite;
            transform-origin: center; /* Centro exacto del círculo */
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div style={{ overflow: 'hidden', position: 'relative', width: '300px', height: 'auto' }}>
        <img
          src={design}
          alt="Diseño girando"
          className="rotating-svg"
          style={{
            display: 'block', // Elimina espacios no deseados
          }}
        />
      </div>
    </div>
  );
};

export default RotatingSVG;
