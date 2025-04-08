/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Link,
  Card,
  CardContent,
  Grid, Hidden, ListItemText, ListItem, List, Chip, Box, CardActions,
} from '@mui/material';
import logo from '@/assets/images/ESECENTRO/LOGO-WEB.png';
import Chart from 'react-apexcharts';
import ApexCharts from 'react-apexcharts';

// Importar componentes de páginas
import Rendimiento from '../../Calendario.jsx';
import INICIO from '../ESECENTRO/Inicio.jsx';
import { Button, Divider } from 'antd';
import { IconBackspace } from '@tabler/icons-react';

const styles = {
  mainContent:{
    paddingTop: '10px',
  },
  appBar: {
    backgroundColor: '#fff', // Color de fondo del appbar
    borderRadius: '8px',
    position: 'auto',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center', // Centra el contenido en el Toolbar
    alignItems: 'center',
    padding: '0 0 0 0', // Espaciado interno del toolbar
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1, // Permite que el logo tome el espacio necesario para estar centrado
  },
  logoImg: {
    maxWidth: '50%',
    height: 'auto',
    padding: '0px',
  },
  menuLinks: {

    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '1000px', // Limitar el ancho máximo para que no se vea estirado en pantallas grandes
    textAlign: 'center',
  },
  menuItem: {
    fontFamily: "Poppins, sans-serif", // Fuentes para el texto del logo
    marginRight: '20px', // Espacio entre cada elemento del menú
    color: '#ffffff', // Color del texto del menú
    fontWeight: 'bold', // Grosor del texto del menú
  },
  card: css`
      background-color: #282c60;
      color: #fff;
      margin-bottom: 20px;
  `,
  cardTitle: css`
      font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif; // Fuentes para el texto del logo
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.83);
      font-weight: bold;
  `,
  section: css`
      margin-bottom: 40px;
  `,
  testimonial: css`
      background-color: #c3c1c1;
      padding: 20px;
      border-radius: 5px;
  `,
  testimonialText: css`
      margin-bottom: 10px;
  `,
  testimonialAuthor: css`
      font-weight: bold;
  `,
  image: css`
      max-width: 100%;
      height: auto;
      border-radius: 5px;
  `,
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0px 10px 0px',
    backgroundColor: '#fff', // Fondo oscuro para la barra de enlaces
  },
  menuButton: {
    color: '#000', // Botones con texto blanco
    textTransform: 'none', // Evitar el cambio automático a mayúsculas
    margin: '0 15px',
    fontWeight: 'bold',
    fontSize: '16px', // Fuente más grande y profesional
    transition: 'all 0.3s ease', // Efecto de transición suave
    '&:hover': {
      backgroundColor: '#555', // Cambio de fondo al pasar el mouse
    },
  },
};

const Inicio = () => {
  const [setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Header = ({ onBackButtonClick }) => {
    const services = [
      'Datos Empresariales',
      'Gestión de Tickets',
      'Tareas Pendientes',
      'Monitoreo',
      'Backups',
      'Acuerdos',
    ];

    return (
      <div>
        <AppBar position="static" css={styles.appBar}>
          <Toolbar style={styles.toolbar}>
            <div css={styles.logo}>
              <img
                src={logo}
                alt="Logo"
                style={styles.logoImg}
                onClick={onBackButtonClick}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div style={styles.menuContainer}>
          <div style={styles.menuLinks}>
            {/* Lista de Servicios Horizontal */}
            {services.map((service, index) => (
              <Button
                key={index}
                onClick={onBackButtonClick}
                style={styles.menuButton}
              >
                {service}
              </Button>
            ))}
          </div>
        </div>;
      </div>
  )
    ;
  };

  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackButtonClick = () => {
    setCurrentPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'rendimiento':
        return <Rendimiento />;
      case 'inicio':
        return <INICIO />;
      default:
        return null;
    }
  };

  const pieChartOptions = {
    labels: ['Abiertos', 'En Proceso', 'Resueltos', 'Cerrados'],
  };

  const pieChartData = [30, 20, 40, 10];

  const barChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
  };

  const barChartData = [{ name: 'Tickets', data: [10, 15, 8, 12, 20, 5, 7] }];

  const lineChartOptions = {
    chart: { type: 'line' },
    xaxis: { categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] },
  };

  const lineChartData = [{ name: 'Tareas', data: [5, 10, 7, 12] }];

  const revenueChartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Datacenter', 'Conectividad', 'Administración de BD Oracle'],
    },
    yaxis: {
      title: {
        text: 'Porcentaje de Uso (%)',
      },
    },
    title: {
      text: 'Uso de Servicios',
      align: 'center',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  const revenueChartData = [
    {
      name: 'Servicios',
      data: [70, 50, 60],  // Porcentaje de uso de cada servicio: 70% Datacenter, 50% Conectividad, 60% BD Oracle
    },
  ];

  const vmData = {
    totalVMs: 50,
    activeVMs: 45,
    inactiveVMs: 5,
    avgCpuUsage: 70,   // Promedio de uso de CPU en todas las máquinas
    avgMemoryUsage: 60, // Promedio de uso de memoria en todas las máquinas
    avgDiskUsage: 55,   // Promedio de uso de disco en todas las máquinas
  };

  // Datos para el gráfico de disponibilidad de máquinas
  const availabilityData = {
    series: [vmData.activeVMs, vmData.inactiveVMs],
    options: {
      chart: { type: 'donut' },
      labels: ['Máquinas Activas', 'Máquinas Inactivas'],
      colors: ['#28a745', '#dc3545'],
      theme: { mode: 'light' },
      title: { text: 'Disponibilidad de Máquinas Virtuales', align: 'center', style: { color: '#000' } },
    },
  };

  // Datos para el gráfico de tendencia de recursos
  const resourceTrendData = {
    series: [
      { name: 'Uso de CPU', data: [60, 65, 70, 72, 68, 75, 74, 78, 80, 82] },
      { name: 'Uso de Memoria', data: [50, 55, 60, 63, 60, 65, 68, 70, 72, 75] },
      { name: 'Uso de Disco', data: [45, 50, 55, 58, 60, 63, 65, 67, 70, 72] },
    ],
    options: {
      chart: { type: 'line' },
      xaxis: {
        categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      title: { text: 'Tendencia de Uso de Recursos', align: 'center', style: { color: '#000' } },
      stroke: { curve: 'smooth' },
      theme: { mode: 'light' },
    },
  };

  // Datos para el gráfico de ejemplo
  const chartOptions = {
    chart: {
      id: 'backup-chart',
      type: 'line', // Puedes cambiar a 'bar' para un gráfico de barras
    },
    xaxis: {
      categories: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    },
    title: {
      text: 'Backups Diarios Realizados',
      align: 'center',
    },
    colors: ['#4CAF50'],
  };

  const chartSeries = [
    {
      name: 'Backups Realizados',
      data: [43, 43, 43, 43, 43, 43, 43], // Datos de ejemplo, puedes actualizarlos según tus datos reales
    },
  ];

  // Información adicional
  const totalBackups = 43; // Total de backups realizados en la semana
  const completedBackups = 43; // Backups completados
  const failedBackups = 0; // Backups fallidos
  const pendingBackups = 0; // Backups pendientes

  const chartOptions2 = {
    chart: {
      id: 'agreements-per-week',
      type: 'bar', // Gráfico de barras
    },
    xaxis: {
      categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    },
    title: {
      text: 'Acuerdos por Semana',
      align: 'center',
    },
    colors: ['#00ACC1'],
  };

  const chartSeries2 = [
    {
      name: 'Acuerdos Creados',
      data: [5, 8, 10, 7], // Datos de ejemplo para la cantidad de acuerdos creados por semana
    },
  ];

  return (
    <div>
      {/* Barra de navegación */}
      <Header onBackButtonClick={handleBackButtonClick} />
      <div css={styles.mainContent}>
        {currentPage ? (
          <div className="page-content">
            {renderPageContent()}
          </div>
        ) : (
          <Grid container spacing={3} css={styles.section}>
            {/* Sección de Bienvenida */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12} >
                <CardContent >
                  <Typography style={{color: '#282c60', paddingTop: '20px'}} variant="h2" align="center">¡Bienvenido al Panel de Control de Servicios de RED SALUD DEL CENTRO E.S.E </Typography>
                </CardContent>
              </Grid>
            </Grid>
            {/* Sección de Servicios */}
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography style={{color: '#282c60'}} variant="h4" align="center" id="servicios">Servicios</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    {/* Título */}
                    <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Datos Empresariales
                    </Typography>

                    {/* Información de la empresa */}
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      <strong>Empresa:</strong> Red de Salud del Centro E.S.E.
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      <strong>Dirección:</strong> Sede administrativa: Carrera 12E No. 50-18 Cali –
                      Valle del Cauca (Colombia)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      <strong>Teléfono:</strong> Línea Administrativa: +57 (602) 3120930
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      <strong>Email:</strong> atencionalusuario@saludcentro.gov.co
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                      <strong>Horario de atención:</strong> Lunes a viernes: 7:00 am – 5:30 pm
                    </Typography>
                    {/* Servicios brindados */}
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      Servicios Brindados
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label="Datacenter" color="primary" />
                      <Chip label="Conectividad" color="secondary" />
                      <Chip label="Administración Bases de Datos Oracle" color="success" />
                    </Box>
                    {/* Gráfico de uso de servicios */}
                    <Chart options={revenueChartOptions} series={revenueChartData} type="bar" height={200} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Gestión de Tickets
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Monitoreo de tickets por estado y frecuencia de creación.
                    </Typography>
                    <Chart options={pieChartOptions} series={pieChartData} type="pie" height={200} />
                    <Chart options={barChartOptions} series={barChartData} type="bar" height={200} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Tareas Pendientes
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Gestión de tareas pendientes y su progreso semanal.
                    </Typography>
                    <Chart options={lineChartOptions} series={lineChartData} type="line" height={200} />
                    <List>
                      <ListItem>
                        <ListItemText primary="Revisión de reportes" secondary="Vence en 2 días" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Entrega de documentación" secondary="Vence en 4 días" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Actualización de software" secondary="Vence en 1 semana" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent onClick={() => handleButtonClick('rendimiento')}>
                    <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Monitoreo General
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Monitoreo general del rendimiento de las máquinas virtuales.
                    </Typography>
                    <ApexCharts
                      options={availabilityData.options}
                      series={availabilityData.series}
                      type="donut"
                      height={250}
                    />
                     Promedio de Uso de Recursos
                    <Typography variant="body2" style={{ marginTop: 16 }}>
                      Promedio de Uso de Recursos
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          CPU: {vmData.avgCpuUsage}%
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          Memoria: {vmData.avgMemoryUsage}%
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          Disco: {vmData.avgDiskUsage}%
                        </Typography>
                      </Grid>
                    </Grid>
                     Gráfico de Tendencia de Uso de Recursos
                    <Typography variant="body2" style={{ marginTop: 16 }}>
                      Tendencia de Uso de Recursos
                    </Typography>
                    <ApexCharts
                      options={resourceTrendData.options}
                      series={resourceTrendData.series}
                      type="line"
                      height={250}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent onClick={() => handleButtonClick('rendimiento')}>
                    <Typography variant="h2">
                      Informes de Backups
                    </Typography>
                    <Typography variant="body2">
                      Visualiza el estado y los informes de backups realizados en máquinas virtuales.
                    </Typography>

                     Información adicional sobre el estado de los backups


                    <Typography variant="h6" color="primary">
                      Total Backups
                    </Typography>
                    <Typography variant="body1">{totalBackups}</Typography>


                    <Typography variant="h6" color="success">
                      Completados
                    </Typography>
                    <Typography variant="body1">{completedBackups}</Typography>


                    <Typography variant="h6" color="error">
                      Fallidos
                    </Typography>
                    <Typography variant="body1">{failedBackups}</Typography>

                    <Divider style={{ margin: '20px 0' }} />

                     Gráfico de backups realizados
                    <Typography variant="h6" style={styles.sectionTitle}>
                      Gráfico de Backups Realizados
                    </Typography>
                    <div>
                      <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />
                    </div>

                     Detalle de backups pendientes
                    <Typography variant="h6" style={styles.sectionTitle}>
                      Backups Pendientes
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Actualmente, hay {pendingBackups} backups pendientes de completar. Revisa los detalles para más
                      información.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h2">
                      Gestión de Acuerdos de Compra y Venta
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Aquí puedes gestionar y visualizar información general sobre los acuerdos de compra y venta.
                    </Typography>
                     Información General de los Gráficos
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="h6">
                      Estado General de los Acuerdos
                    </Typography>
                    <Divider style={{ margin: '20px 0' }} />
                     Gráfico de Acuerdos Creados por Semana
                    <Typography variant="h6" css={styles.sectionTitle}>
                      Acuerdos Creados por Semana
                    </Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <ApexCharts options={chartOptions2} series={chartSeries2} type="bar" height={250} />
                    <Divider style={{ margin: '20px 0' }} />
                     Descripción y Enlace para gestionar los acuerdos
                    <Typography variant="body2" color="textSecondary">
                      Utiliza estas gráficas para analizar el progreso de los acuerdos de compra y venta y gestionar
                      eficientemente cada uno.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/*  Sección de Proyectos
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" id="proyectos">Nuestros Proyectos Recientes</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Implementación de Sistema de Gestión
                      Empresarial</Typography>
                    <Typography variant="body2">
                      Desarrollamos un sistema de gestión empresarial personalizado para mejorar la eficiencia operativa de
                      nuestro cliente.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Integración de Chatbot en Plataforma de Servicio al
                      Cliente</Typography>
                    <Typography variant="body2">
                      Implementamos un chatbot inteligente para brindar soporte automatizado a los clientes de nuestro
                      cliente, reduciendo los tiempos de respuesta y mejorando la satisfacción del cliente.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card css={styles.card}>
                  <CardContent>
                    <Typography variant="h5" css={styles.cardTitle}>Despliegue de Sistema de Seguridad Avanzado</Typography>
                    <Typography variant="body2">
                      Instalamos un sistema de seguridad avanzado que utiliza tecnología de reconocimiento facial y análisis
                      de comportamiento para proteger las instalaciones de nuestro cliente contra intrusiones.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

             Sección de Testimonios
            <Grid container spacing={3} css={styles.section}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center">Lo que dicen nuestros clientes</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <div css={styles.testimonial}>
                  <Typography variant="body1" css={styles.testimonialText}>
                    "CONSULNETWORKS ha transformado por completo nuestra empresa. Su equipo nos brindó soluciones
                    innovadoras y un soporte excepcional."
                  </Typography>
                  <Typography variant="body2" css={styles.testimonialAuthor}>
                    - Juan Pérez, CEO de Empresa Ejemplo
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div css={styles.testimonial}>
                  <Typography variant="body1" css={styles.testimonialText}>
                    "Estamos muy satisfechos con el trabajo realizado por CONSULNETWORKS. Su profesionalismo y dedicación
                    nos han permitido alcanzar nuevos niveles de eficiencia."
                  </Typography>
                  <Typography variant="body2" css={styles.testimonialAuthor}>
                    - María González, Directora de Tecnología de Otra Empresa
                  </Typography>
                </div>
              </Grid>
            </Grid>*/}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Inicio;
