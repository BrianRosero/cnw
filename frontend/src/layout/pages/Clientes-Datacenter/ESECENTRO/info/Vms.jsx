import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
  Chip,
  Stack,
} from "@mui/material";

export default function VMsFetcher() {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://192.168.200.155:8083/vcenter/vms-unified");
      const result = await response.json();
      if (response.ok) {
        setData(result.data);
        setLastUpdated(result.lastUpdatedVms);
      } else {
        setError(result.error || "Error al obtener los datos");
      }
    } catch (err) {
      setError("Error al conectar con la API");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Máquinas Virtuales
        </Typography>
        <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
          {loading ? "Cargando..." : "Actualizar Datos"}
        </Button>
      </Stack>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {data && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Total de VMs: <strong>{data.length}</strong>
          </Typography>

          <Grid container spacing={3}>
            {data.current && data.current.map((vm, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                  <CardHeader
                    title={vm.name}
                    subheader={`Estado: ${vm.power_state}`}
                    titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
                  />
                  <Divider />
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <strong>CPU:</strong> {vm.cpu_cores} cores | {vm.cpu_usage_mhz} MHz
                      </Typography>
                      <Typography variant="body2">
                        <strong>Memoria:</strong> {vm.memory_gb} GB ({vm.memory_usage_mb} MB usados)
                      </Typography>
                      <Typography variant="body2">
                        <strong>Host:</strong> {vm.host}
                      </Typography>

                      {vm.guest_info && (
                        <>
                          <Typography variant="body2">
                            <strong>SO:</strong> {vm.guest_info.os_fullname}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Hostname:</strong> {vm.guest_info.hostname}
                          </Typography>
                          <Typography variant="body2">
                            <strong>IPs:</strong> {vm.guest_info.ip_addresses?.join(", ")}
                          </Typography>
                        </>
                      )}

                      {vm.disks?.length > 0 && (
                        <>
                          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "bold" }}>
                            Discos:
                          </Typography>
                          {vm.disks.map((disk, i) => (
                            <Chip
                              key={i}
                              label={`${disk.label} - ${disk.capacity_gb} GB - ${disk.thin_provisioned ? "Thin" : "Thick"}`}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                              color="info"
                            />
                          ))}
                        </>
                      )}

                      {vm.network_adapters?.length > 0 && (
                        <>
                          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "bold" }}>
                            Red:
                          </Typography>
                          {vm.network_adapters.map((nic, i) => (
                            <Chip
                              key={i}
                              label={`${nic.label} - ${nic.mac_address} - ${nic.connected ? "Conectado" : "Desconectado"} - ${nic.network}`}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                              color={nic.connected ? "success" : "default"}
                            />
                          ))}
                        </>
                      )}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Actualizado: {new Date(lastUpdated).toLocaleString()}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
