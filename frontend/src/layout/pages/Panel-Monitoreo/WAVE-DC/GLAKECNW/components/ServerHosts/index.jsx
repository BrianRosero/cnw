import { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Grid,
  CircularProgress,
  Card,
  Icon,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

// Soft UI components
import SoftBox from '@/components/SoftBox';
import SoftTypography from '@/components/SoftTypography';

export default function HostsFetcher() {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://192.168.200.155:8083/vcenter/hosts');
      const result = await response.json();
      if (response.ok) {
        setData(result.data);
        setLastUpdated(result.lastUpdatedHosts);
      } else {
        setError(result.error || 'Error al obtener los datos');
      }
    } catch (err) {
      setError('Error al conectar con la API');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SoftBox>
      {/*<Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
        {loading ? "Cargando..." : "Actualizar Datos"}
      </Button>

      {error && (
        <Typography color="error" style={{ marginTop: "8px" }}>
          {error}
        </Typography>
      )}

      {loading && <CircularProgress style={{ marginTop: 16 }} />}*/}

      {data && (
        <SoftBox mt={3}>
          <SoftTypography variant="h3" fontWeight="bold" gutterBottom display="flex" flexDirection="column"
                          alignItems="center">
            Información de Hosts disponibles.
          </SoftTypography>
          <Grid container spacing={2}>
            {data.map((host, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <SoftBox>
                    <SoftBox p={2}>
                      <Grid container alignItems="center">
                        {/* Text Area */}
                        <Grid item xs={8}>
                          <SoftBox lineHeight={1}>
                            <SoftTypography
                              variant="button"
                              color="text"
                              textTransform="capitalize"
                              fontWeight="medium"
                            >
                              {host.name}
                            </SoftTypography>
                            <SoftTypography
                              variant="body2"
                              sx={{ color: host.power_state === 'on' ? '#00A082' : 'red' }}
                            >
                              <strong>Estado:</strong> {host.power_state === 'on' ? 'Encendida' : 'Apagada'}
                            </SoftTypography>
                            <SoftTypography
                              variant="h5"
                              fontWeight="bold"
                              color="dark"
                            >
                              {host.memory_gb} GB RAM{' '}
                            </SoftTypography>
                            <SoftTypography
                              variant="button"
                              fontWeight="bold"
                              display="inline"
                            >
                              ({host.cpu_cores} cores)
                            </SoftTypography>
                          </SoftBox>
                        </Grid>

                        {/* Icon Box */}
                        <Grid item xs={4}>
                          <SoftBox
                            variant="gradient"
                            bgColor="secondary"
                            color="white"
                            width="3rem"
                            height="3rem"
                            marginLeft="auto"
                            borderRadius="md"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            shadow="md"
                          >
                            <Icon fontSize="small" color="inherit">
                              <StorageIcon />
                            </Icon>
                          </SoftBox>
                        </Grid>
                      </Grid>

                      {/* Extra details */}
                      <SoftBox mt={2}>
                        <SoftTypography variant="body2" color="text">
                          <strong>Modelo CPU:</strong> {host.cpu_model}
                        </SoftTypography>
                        <SoftTypography variant="body2" color="text">
                          <strong>Uso CPU:</strong> {host.cpu_usage_mhz} MHz
                        </SoftTypography>
                        <SoftTypography variant="body2" color="text">
                          <strong>Uso Memoria:</strong> {host.memory_usage_mb} MB
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                  </SoftBox>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/*
          <SoftTypography variant="body2" color="textSecondary" mt={2}>
            Última actualización: {lastUpdated}
          </SoftTypography>*/}
        </SoftBox>
      )}
    </SoftBox>
  );
}
