import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Paper, Grid, Card, CardContent, CardActions, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Definir esquema de validación con Yup
const validationSchema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  email: yup.string().email('Ingrese un email válido').required('El email es requerido'),
  phone: yup.string().required('El número de teléfono es requerido'),
  industry: yup.string().required('La industria es requerida'),
  revenue: yup.number().required('Los ingresos son requeridos'),
  // Agrega más campos y validaciones según tus necesidades
});

const CRM = () => {
  // Estado para almacenar la lista de empresas
  const [companies, setCompanies] = useState([
    {
      id: uuidv4(),
      name: 'ESE CENTRO',
      email: 'empresa@saludcentro.com',
      phone: '123-456-7890',
      industry: 'Salud',
      revenue: 1000000,
      logo: 'data:image/png;base64,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'
    },
    {
      id: uuidv4(),
      name: 'JARAMILLOMORA',
      email: 'empresaB@example.com',
      phone: '987-654-3210',
      industry: 'Salud',
      revenue: 500000,
      logo: 'data:image/png;base64,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'
    },
    {
      id: uuidv4(),
      name: 'CONSULNETWORKS',
      email: 'empresaB@example.com',
      phone: '987-654-3210',
      industry: 'Salud',
      revenue: 500000,
      logo: 'https://www.cnw.co/wp-content/uploads/2022/09/LOGO_FULLCOLOR-Opaco.jpg'
    },
    {
      id: uuidv4(),
      name: 'Empresa D',
      email: 'empresaB@example.com',
      phone: '987-654-3210',
      industry: 'Salud',
      revenue: 500000,
      logo: 'https://via.placeholder.com/150'
    },
    {
      id: uuidv4(),
      name: 'Empresa E',
      email: 'empresaB@example.com',
      phone: '987-654-3210',
      industry: 'Salud',
      revenue: 500000,
      logo: 'https://via.placeholder.com/150'
    },
    {
      id: uuidv4(),
      name: 'Empresa F',
      email: 'empresaB@example.com',
      phone: '987-654-3210',
      industry: 'Salud',
      revenue: 500000,
      logo: 'https://via.placeholder.com/150'
    },
    // Agrega más empresas de ejemplo según sea necesario
  ]);

  // Estado para controlar la visibilidad del formulario de agregar empresa
  const [showForm, setShowForm] = useState(false);
  // Estado para el diálogo de detalles de la empresa
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Función para manejar el envío del formulario de agregar empresa
  const handleSubmit = (values) => {
    const newCompany = { id: uuidv4(), ...values };
    setCompanies([...companies, newCompany]);
    setShowForm(false);
  };

  // Función para eliminar una empresa
  const handleDeleteCompany = (companyId) => {
    const updatedCompanies = companies.filter((company) => company.id !== companyId);
    setCompanies(updatedCompanies);
  };

  // Hook de Formik para manejar el formulario de agregar empresa
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      industry: '',
      revenue: '',
      // Agrega más campos según sea necesario
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  // Función para abrir el diálogo de detalles de la empresa
  const handleOpenDialog = (company) => {
    setSelectedCompany(company);
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo de detalles de la empresa
  const handleCloseDialog = () => {
    setSelectedCompany(null);
    setOpenDialog(false);
  };

  return (
    <div>
      <AppBar position="static" style={{borderRadius:'8px', background:'#004a8f'}}>
        <Toolbar>
          <Typography variant="h1" component="div" align={'center'} style={{color:'#ffffff', borderRadius:'8px'}} sx={{ flexGrow: 1 }}>
            CRM
          </Typography>
          <Button onClick={() => setShowForm(true)} color="inherit">
            Agregar Empresa
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {showForm && <AddCompanyForm formik={formik} />}
        <CompanyList companies={companies} onDeleteCompany={handleDeleteCompany} onOpenDialog={handleOpenDialog} />
        {selectedCompany && (
          <CompanyDialog open={openDialog} company={selectedCompany} onCloseDialog={handleCloseDialog} />
        )}
      </Container>
    </div>
  );
};

const AddCompanyForm = ({ formik }) => (
  <Paper sx={{ p: 4, mt: 4 }}>
    <Typography variant="h5" gutterBottom>
      Agregar Nueva Empresa
    </Typography>
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input type="text" {...formik.getFieldProps('name')} placeholder="Nombre de la empresa" />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <input type="email" {...formik.getFieldProps('email')} placeholder="Email" />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <input type="text" {...formik.getFieldProps('phone')} placeholder="Teléfono" />
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <input type="text" {...formik.getFieldProps('industry')} placeholder="Industria" />
          {formik.touched.industry && formik.errors.industry ? (
            <div>{formik.errors.industry}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <input type="number" {...formik.getFieldProps('revenue')} placeholder="Ingresos" />
          {formik.touched.revenue && formik.errors.revenue ? (
            <div>{formik.errors.revenue}</div>
          ) : null}
        </Grid>
        {/* Agrega más campos según sea necesario */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Agregar Empresa
          </Button>
        </Grid>
      </Grid>
    </form>
  </Paper>
);

const CompanyList = ({ companies, onDeleteCompany, onOpenDialog }) => (
  <div>
    <Typography variant="h4" gutterBottom>
      Lista de Empresas
    </Typography>
    <Grid container spacing={2}>
      {companies.map((company) => (
        <Grid item xs={12} sm={6} md={4} key={company.id}>
          <CompanyCard company={company} onDeleteCompany={onDeleteCompany} onOpenDialog={onOpenDialog} />
        </Grid>
      ))}
    </Grid>
  </div>
);

const CompanyCard = ({ company, onDeleteCompany, onOpenDialog }) => (
  <Card sx={{ height: '100%' }}>
    <CardMedia component="img" height="140" image={company.logo} alt={company.name} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {company.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Email: {company.email}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Teléfono: {company.phone}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Industria: {company.industry}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Ingresos: ${company.revenue}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => onDeleteCompany(company.id)}>Eliminar</Button>
      <Button size="small" onClick={() => onOpenDialog(company)}>Ver Detalles</Button>
    </CardActions>
  </Card>
);

const CompanyDialog = ({ open, company, onCloseDialog }) => (
  <Dialog open={open} onClose={onCloseDialog}>
    <DialogTitle>{company.name}</DialogTitle>
    <DialogContent>
      <Typography variant="body1">Email: {company.email}</Typography>
      <Typography variant="body1">Teléfono: {company.phone}</Typography>
      <Typography variant="body1">Industria: {company.industry}</Typography>
      <Typography variant="body1">Ingresos: ${company.revenue}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCloseDialog}>Cerrar</Button>
    </DialogActions>
  </Dialog>
);

export default CRM;
