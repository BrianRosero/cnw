import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  Grid,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Pagination,
  Button,
  Divider, ListItemText, ListItem,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const UsuariosData = [
    { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com', rol: 'Administrador' },
    { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com', rol: 'Usuario' },
    { id: 3, nombre: 'Usuario 3', email: 'usuario3@example.com', rol: 'Usuario' },
    // Agregar más datos de usuarios según sea necesario
  ];

  const VentasData = [
    { fecha: '2022-01-01', cantidad: 10 },
    { fecha: '2022-01-02', cantidad: 15 },
    { fecha: '2022-01-03', cantidad: 20 },
    // Agregar más datos de ventas según sea necesario
  ];

  const Administracion = () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/user/all');
          // Verificar si la respuesta es un array antes de asignarla a userData
          if (Array.isArray(response.data)) {
            setUserData(response.data);
          } else {
            console.error('La respuesta de la API no es un array:', response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, []);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>Panel de Administración</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Usuarios</Typography>
                <Typography variant="body2" color="textSecondary">Total: {UsuariosData.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Conexiones</Typography>
                <Typography variant="body2"
                            color="textSecondary">Total: {VentasData.reduce((total, venta) => total + venta.cantidad, 0)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Agregar más tarjetas para otras funciones de administración */}
        </Grid>

        <Typography variant="h5" gutterBottom style={{ marginTop: '30px' }}>Usuarios</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                  ? UsuariosData.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  : UsuariosData
              ).map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
          count={Math.ceil(UsuariosData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />

        {/* Gráfico de ventas */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '30px' }}>Gráfico de conexiones</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={VentasData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        {/* Agregar más contenido, como botones de acción, estadísticas, etc. */}

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Typography variant="h3" gutterBottom>
            Perfil
          </Typography>
          <Paper variant="outlined" style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Información de usuarios:
            </Typography>
            <List>
              {userData.map((user, index) => (
                <div key={user.id} style={{ marginBottom: '10px' }}>
                  <ListItem>
                    <ListItemText
                      primary={`Usuario ${index + 1}`}
                      secondary={
                        <>
                          <Typography variant="subtitle1">{`Nombre: ${user.names}`}</Typography>
                          <Typography variant="subtitle1">{`Apellido: ${user.lastname}`}</Typography>
                          <Typography variant="subtitle1">{`Nombre de usuario: ${user.username}`}</Typography>
                          <Typography variant="subtitle1">{`Correo electrónico: ${user.email}`}</Typography>
                          <Typography variant="subtitle1">{`Rol: ${user.role.name}`}</Typography>
                          <Typography variant="subtitle1">{`Grupo: ${user.group.name}`}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < userData.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Paper>
        </Container>
      </div>
    )
      ;
  };

  export default Administracion;
