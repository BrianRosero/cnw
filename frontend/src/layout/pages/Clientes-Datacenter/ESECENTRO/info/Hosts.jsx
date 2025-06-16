import { useState, useEffect } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

export default function HostsFetcher() {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8083/vcenter/hosts");
      const result = await response.json();
      if (response.ok) {
        setData(result.data);
        setLastUpdated(result.lastUpdatedHosts);
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
    <div style={{ padding: "16px" }}>
      <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
        {loading ? "Cargando..." : "Actualizar Datos"}
      </Button>
      {error && <Typography color="error" style={{ marginTop: "8px" }}>{error}</Typography>}
      {data && (
        <Card style={{ marginTop: "16px", padding: "16px" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">Lista de Hosts Virtuales</Typography>
            <Typography variant="body1" fontWeight="bold" style={{ marginTop: "8px" }}>
              Total de Hosts: {data.length}
            </Typography>
            <Typography variant="h6" fontWeight="bold">Lista de Hosts</Typography>
            {data.map((host, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <Typography variant="body1" fontWeight="bold">Host: {host.name}</Typography>
                <Typography variant="body2">CPU Cores: {host.cpu_cores}</Typography>
                <Typography variant="body2">Modelo CPU: {host.cpu_model}</Typography>
                <Typography variant="body2">Memoria: {host.memory_gb} GB</Typography>
                <Typography variant="body2">Uso de CPU: {host.cpu_usage_mhz} MHz</Typography>
                <Typography variant="body2">Uso de Memoria: {host.memory_usage_mb} MB</Typography>
                <Typography variant="body2">Estado: {host.power_state}</Typography>
              </div>
            ))}
            <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
              Última actualización: {lastUpdated}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
