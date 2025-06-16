import { useState, useEffect } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

export default function ResourceFetcher() {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8083/vcenter/resources-glake");
      const result = await response.json();
      if (response.ok) {
        setData(result.data);
        setLastUpdated(result.lastUpdatedGlake);
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
            <Typography variant="h6" fontWeight="bold">Datos del vCenter</Typography>
            <Typography variant="body1" fontWeight="bold">CPU:</Typography>
            <Typography variant="body2">Cores: {data.cpu?.cores}</Typography>
            <Typography variant="body2">Modelo: {data.cpu?.model?.join(", ")}</Typography>
            <Typography variant="body2">Total GHz: {data.cpu?.total_cpu_ghz}</Typography>
            <Typography variant="body2">Uso: {data.cpu?.usage_mhz} MHz ({data.cpu?.usage_percent}%)</Typography>

            <Typography variant="body1" fontWeight="bold" style={{ marginTop: "8px" }}>Memoria:</Typography>
            <Typography variant="body2">Total: {data.memory?.total_tb} TB</Typography>
            <Typography variant="body2">Usada: {data.memory?.used_tb} TB</Typography>
            <Typography variant="body2">Uso: {data.memory?.usage_percent}%</Typography>

            <Typography variant="body1" fontWeight="bold" style={{ marginTop: "8px" }}>Almacenamiento:</Typography>
            <Typography variant="body2">Total: {data.storage?.total_tb} TB</Typography>
            <Typography variant="body2">Usado: {data.storage?.used_tb} TB</Typography>
            <Typography variant="body2">Libre: {data.storage?.free_tb} TB</Typography>
            <Typography variant="body2">Uso: {data.storage?.usage_percent}%</Typography>

            <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
              Última actualización: {lastUpdated}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}