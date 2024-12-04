import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Grid, Card, CardContent } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

const validationSchema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  email: yup.string().email('Formato de email inválido').required('El email es requerido'),
  message: yup.string().required('El mensaje es requerido'),
});
const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar la lógica para enviar el formulario de contacto
      console.log(values);
    },
  });



  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        ¡Bienvenido al Dashboard de Gestión de Recursos Empresariales!
      </Typography>
      <Typography variant="body1" paragraph style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Te damos la bienvenida a nuestra plataforma de gestión de recursos empresariales. Aunque aún no se te haya asignado ningún rol ni recurso para gestionar, estamos aquí para ayudarte en lo que necesites.
      </Typography>
      <Typography variant="body1" paragraph style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
        Por favor, completa el formulario a continuación si deseas contactar con nosotros o tienes alguna pregunta:
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="message"
              name="message"
              label="Mensaje"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Enviar Mensaje
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h5" gutterBottom style={{ marginTop: '2rem' }}>
        Ejemplos de Recursos Disponibles:
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Formulario de Registro
              </Typography>
              <Typography variant="body1">
                Completa el formulario de registro para acceder a todos los recursos y funcionalidades del dashboard.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Reporte de Ventas Mensuales
              </Typography>
              <Typography variant="body1">
                Consulta el reporte de ventas mensuales para mantener un seguimiento de los ingresos de tu empresa.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Formulario de Solicitud de Vacaciones
              </Typography>
              <Typography variant="body1">
                Solicita tus vacaciones utilizando nuestro formulario y mantén un registro de tu tiempo libre.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;



/*

import React, { useState, useEffect } from 'react';

import UserService from '../../services/user.service.jsx';

const Home = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      },
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;*/
