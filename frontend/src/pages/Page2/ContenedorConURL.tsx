// ContenedorConURL.tsx
import React from 'react';
import { Container } from '@mui/material';

interface ContenedorConURLProps {
  url: string;
}

const ContenedorConURL: React.FC<ContenedorConURLProps> = ({ url }) => {
  const iframeStyle: React.CSSProperties = {
    width: '1840px', // Ancho personalizado
    height: '900px', // Alto personalizado
    border: 'none', // Sin borde
    marginLeft: '0', // Margen izquierdo personalizado
    position: 'fixed', // Posición fija para que sea flotante
    top: '520px', // Alinea el componente en la mitad superior
    left: '69px', // Establece la posición izquierda en 0
    transform: 'translateY(-50%)', // Centra verticalmente
    zIndex: 999, // Asegura que esté por encima de otros elementos
  };

  return (
    <Container>
      <iframe title="Página Externa" src={url} style={iframeStyle} />
    </Container>
  );
};

export default ContenedorConURL;
