import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Link } from 'react-router-dom';

const Reportes = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulando llamada a una API para obtener los reportes
    setTimeout(() => {
      const mockReports = [
        { id: 1, date: '2024-03-01', process: 'Proceso A', status: 'Completado' },
        { id: 2, date: '2024-03-02', process: 'Proceso B', status: 'Pendiente' },
        { id: 3, date: '2024-03-03', process: 'Proceso C', status: 'En curso' }
      ];
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reportes Diarios de Procesos Contratados
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/create-report">
        Crear Reporte
      </Button>
      {loading ? (
        <Typography variant="body1">Cargando...</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Proceso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.process}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" component={Link} to={`/report/${report.id}`}>
                    Ver Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default Reportes;
