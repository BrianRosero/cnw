import React from 'react';
import { Paper } from '@mui/material';

interface IframeProps {
  src: string;
}

const IframeComponent: React.FC<IframeProps> = ({ src }) => {
  return (
    <Paper sx={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', margin: '0 0 0 0' }}>
      <iframe
        title="iframe"
        src={src}
        frameBorder="0"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 67,
          width: '100%',
          height: '100%',
        }}
      />
    </Paper>
  );
};

export default IframeComponent;
