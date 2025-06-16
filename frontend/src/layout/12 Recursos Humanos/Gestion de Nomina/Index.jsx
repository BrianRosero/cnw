import { Grid, Typography, Card, CardContent, CardHeader } from '@mui/material';
import MainCard from '@/layout/Ui-Components/Cards/MainCard.jsx';
import { useEffect, useState } from 'react';

// Cargar automáticamente todos los archivos .js de este directorio
const modules = import.meta.glob('./*.jsx', { eager: true });

const SamplePage = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const loadedComponents = Object.entries(modules)
      .filter(([path, mod]) => typeof mod.default === 'function')
      .map(([path, mod]) => ({
        name: path.replace('./', ''),
        Component: mod.default,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    setComponents(loadedComponents);
  }, []);

  return (
    <MainCard title="Tarjetas de Prueba">
      <Grid container spacing={3}>
        {components.map(({ name, Component }) => (
          <Grid item xs={12} sm={6} md={4} key={name}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardHeader
                title={name}
                titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
              />
              <CardContent>
                <Component />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default SamplePage;
