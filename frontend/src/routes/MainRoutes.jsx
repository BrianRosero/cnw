import { lazy } from 'react';
import { useAuth } from '../services/AuthContext';

// project imports
import MainLayout from '../layout/MainLayout/index.jsx';
import Loadable from '../layout/Ui-Components/Loadable.jsx';

// administrador routing

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../layout/13 Configuración y Apariencia/Diseño Visual/Typography.jsx')));
const UtilsColor = Loadable(lazy(() => import('../layout/13 Configuración y Apariencia/Diseño Visual/Color.jsx')));
const UtilsShadow = Loadable(lazy(() => import('../layout/13 Configuración y Apariencia/Diseño Visual/Shadow.jsx')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../layout/13 Configuración y Apariencia/Diseño Visual/MaterialIcons.jsx')));
const UtilsTablerIcons = Loadable(lazy(() => import('../layout/13 Configuración y Apariencia/Diseño Visual/TablerIcons.jsx')));

const Graficos = Loadable(lazy(() => import('../layout/Dashboards/Default/index.jsx')));

// Inicio
//const DashboardDefault1 = Loadable(lazy(() => import('../layout/1 Inicio/Inicio/Index.jsx')));
import Inicio from '../layout/1 Inicio/Inicio/Index.jsx';
//import Inicio from '../layout/Dashboards/Default';
import AccesosRapidos from '@/layout/1 Inicio/Accesos Rapidos/Index.jsx'

// Infraestructura y Tecnologia
import Panel from '../layout/2 Infraestructura y Tecnologia/Panel de Control/Index3.jsx';
import Monitoreo from '../layout/pages/Panel-Monitoreo/WAVE-DC/default';
//import Monitoreo from '../layout/2 Infraestructura y Tecnologia/Monitoreo Real';
//import Gestion from '../layout/2 Infraestructura y Tecnologia/Gestion de Clientes'
import Gestion from '../layout/pages/Clientes-Datacenter/INICIO/Panel.jsx'
import Infraestructura from '../layout/2 Infraestructura y Tecnologia/Infraestructura'
import Mfibra from '../layout/2 Infraestructura y Tecnologia/Mapa Fibra Optica'
import Continuidad from '../layout/2 Infraestructura y Tecnologia/Continuidad Operativa'

//CLientes y Servicios
//import CRM from '../layout/3 Clientes y Servicios/CRM/CRM Central';
import CRM from '../layout/3 Clientes y Servicios/CRM';
import GestionC from '../layout/3 Clientes y Servicios/Gestion Comercial';
import GestionD from '../layout/3 Clientes y Servicios/Gestion Documental';

//Operaciones Internas
import Proyectos from '../layout/4 Operaciones Internas/Gestion de Proyectos';
import Actividades from '../layout/4 Operaciones Internas/Tareas y Actividades';
import Planificacion from '../layout/4 Operaciones Internas/Planificacion y Calendario';
import Soporte from '../layout/4 Operaciones Internas/Soporte Interno';
import Automatizacion from '../layout/4 Operaciones Internas/Automatizacion';

// Inteligencia y Analisis
import Visualizacion from '../layout/5 Inteligencia y Analisis/Paneles y Visualización'
import Reportes from '../layout/5 Inteligencia y Analisis/Analisis y Reportes'
import Prediccion from '../layout/5 Inteligencia y Analisis/Prediccion y Modelos IA'
import AutomatizacionIA from '../layout/5 Inteligencia y Analisis/Automatizacion Inteligente'

// Gestion de Usuarios
import Administracion from '../layout/6 Gestion de Usuarios/Administración General'
import Seguridad from '../layout/6 Gestion de Usuarios/Seguridad y Control de Accesos'
import Perfil from '../layout/6 Gestion de Usuarios/Perfil y Personalizacion'
import Seguimiento from '../layout/6 Gestion de Usuarios/Estadisticas y Seguimiento'

//Comunicacion
import Chats from '../layout/7 Comunicación/Mensajeria y Chats'
import SoporteC from '../layout/7 Comunicación/Soporte y Colaboracion'
import Foros from '../layout/7 Comunicación/Foros y Comunicaciones'
import Alertas from '../layout/7 Comunicación/Reuniones y Alertas'

//Gestion financiera
import Facturacion from '../layout/8 Gestion Financiera/Facturacion y Pagos'
import Comisiones from '../layout/8 Gestion Financiera/Bonos y Comisiones'
import AnalisisFi from '../layout/8 Gestion Financiera/Analisis Financiero'
import Presupuestos from '../layout/8 Gestion Financiera/Presupuesto y Control'

//Gobierno TIC
import Cumplimiento from '../layout/10 Gobierno TIC/Cumplimiento Normativo'
import GestionDoc from '../layout/10 Gobierno TIC/Gestion Documental Legal'
import RelacionFac from '../layout/10 Gobierno TIC/Relacion con Facturacion'

//Formación y Capacitación
import Plataforma from '../layout/11 Formación y Capacitacion/Plataforma de Aprendizaje'
import Evaluacion from '../layout/11 Formación y Capacitacion/Evaluacion y Seguimiento'
import Recursos from '../layout/11 Formación y Capacitacion/Recursos y Soporte'

//Recursos Humanos
import GestionP from '../layout/12 Recursos Humanos/Gestion de Personal'
import Desempeno from '../layout/12 Recursos Humanos/Desempeño & Evaluación'
import Integracion from '../layout/12 Recursos Humanos/Procesos de Integración'

//Configuración y Apariencia
import Diseno from '../layout/13 Configuración y Apariencia/Diseño Visual'
import Personalizacion from '../layout/13 Configuración y Apariencia/Personalizacion del Sistema'

//Integraciones
import SistemasCorp from '../layout/14 Integraciones/Sistemas Corporativos'
import AutomatizacionCon from '../layout/14 Integraciones/Automatizacion y Conectividad'

//Seguridad
import SeguridadS from '../layout/15 Seguridad/Gestion de Seguridad'
import MonitoreoP from '../layout/15 Seguridad/Monitoreo y Prevencion'

//Laboratorio de Innovación
import ProyectosN from '../layout/16 Laboratorio de Innovacion/Proyectos Experimentales'
import FuncionesN from '../layout/16 Laboratorio de Innovacion/Pruebas de Nuevas Funciones'
import Prototipos from '../layout/16 Laboratorio de Innovacion/Ideas y Prototipos'
import Sandbox from '../layout/16 Laboratorio de Innovacion/Sandbox IA y Automatizacion'

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = () => {
  const { isAdmin, isUser } = useAuth();

  const adminRoutes = isAdmin ? [
    {
      path: 'datacenter',
      children: [
        { path: 'panel-control', element: <Panel /> },
        { path: 'monitoreo', element: <Monitoreo /> },
        { path: 'gestion-clientes', element: <Gestion /> },
        { path: 'infraestructura', element: <Infraestructura /> },
        { path: 'mapa fibra', element: <Mfibra /> },
        { path: 'continuidad-op', element: <Continuidad /> },
      ],
    },
    {
      path: 'clientes',
      children: [
        { path: 'crm', element: <CRM /> },
        { path: 'gestion-comercial', element: <GestionC /> },
        { path: 'gestion-documental', element: <GestionD /> },
      ],
    },
    {
      path: 'operaciones',
      children: [
        { path: 'proyectos', element: <Proyectos /> },
        { path: 'actividades', element: <Actividades /> },
        { path: 'planificacion', element: <Planificacion /> },
        { path: 'soporte', element: <Soporte /> },
        { path: 'automatizacion', element: <Automatizacion /> },
      ],
    },
    {
      path: 'inteligencia',
      children: [
        { path: 'visualizacion', element: <Visualizacion /> },
        { path: 'analisis', element: <Reportes /> },
        { path: 'prediccion', element: <Prediccion /> },
        { path: 'modelos', element: <AutomatizacionIA /> },
      ],
    },
    {
      path: 'usuarios',
      children: [
        { path: 'administracion', element: <Administracion /> },
        { path: 'seguridad', element: <Seguridad /> },
        { path: 'perfil', element: <Perfil /> },
        { path: 'seguimiento', element: <Seguimiento /> },
      ],
    },
    {
      path: 'comunicacion',
      children: [
        { path: 'chats', element: <Chats /> },
        { path: 'soporte', element: <SoporteC /> },
        { path: 'foros', element: <Foros /> },
        { path: 'alertas', element: <Alertas /> },
      ],
    },
    {
      path: 'gestion financiera',
      children: [
        { path: 'facturacion', element: <Facturacion /> },
        { path: 'comisiones', element: <Comisiones /> },
        { path: 'analisis financiero', element: <AnalisisFi /> },
        { path: 'presupuestos', element: <Presupuestos /> },
      ],
    },
    {
      path: 'gobierno TIC',
      children: [
        { path: 'cumplimiento', element: <Cumplimiento /> },
        { path: 'gestion documental', element: <GestionDoc /> },
        { path: 'relacion facturacion', element: <RelacionFac /> },
      ],
    },
    {
      path: 'capacitacion',
      children: [
        { path: 'plataforma', element: <Plataforma /> },
        { path: 'evaluacion', element: <Evaluacion /> },
        { path: 'recursos', element: <Recursos /> },
      ],
    },
    {
      path: 'RRHH',
      children: [
        { path: 'gestion de personal', element: <GestionP /> },
        { path: 'desempeño', element: <Desempeno /> },
        { path: 'integracion', element: <Integracion /> },
      ],
    },
    {
      path: 'apariencia',
      children: [
        { path: 'diseño', element: <Diseno /> },
        { path: 'personalizacion', element: <Personalizacion /> },
      ],
    },
    {
      path: 'integraciones',
      children: [
        { path: 'sistemas corporativos', element: <SistemasCorp /> },
        { path: 'automatizacion y conectividad', element: <AutomatizacionCon /> },
      ],
    },
    {
      path: 'seguridads',
      children: [
        { path: 'seguridad', element: <SeguridadS /> },
        { path: 'monitoreos', element: <MonitoreoP /> },
      ],
    },
    {
      path: 'laboratorio',
      children: [
        { path: 'proyectos', element: <ProyectosN /> },
        { path: 'nuevas funciones', element: <FuncionesN /> },
        { path: 'prototipos', element: <Prototipos /> },
        { path: 'sandbox IA', element: <Sandbox /> },
      ],
    },
  ] : [];

  const userRoutes = isUser ? [
    {
      path: 'dashboard',
      children: [{ path: 'statistics', element: <Inicio /> }],
    },
  ] : [];

  return {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Inicio /> },
      ...adminRoutes,
      ...userRoutes,
      {
        path: 'inicio',
        children: [
          { path: 'inicio', element: <Inicio /> },
          { path: 'accesos-rapidos', element: <AccesosRapidos /> },
        ],
      },
      {
        path: 'widget',
        children: [
          { path: 'kanban', element: <Inicio /> },
          { path: 'chat', element: <Inicio /> },
          { path: 'calendar', element: <Inicio /> },
          { path: 'estadistics', element: <Inicio /> },
          { path: 'reports', element: <Inicio /> },
          { path: 'tickets', element: <Inicio /> },
        ],
      },
      {
        path: 'integrations',
        children: [{ path: 'consulnetworks', element: <Inicio /> }],
      },
      {
        path: 'utils',
        children: [
          { path: 'util-color', element: <UtilsColor /> },
          { path: 'util-shadow', element: <UtilsShadow /> },
        ],
      },
      {
        path: 'icons',
        children: [
          { path: 'tabler-icons', element: <UtilsTablerIcons /> },
          { path: 'material-icons', element: <UtilsMaterialIcons /> },
        ],
      },
      {
        path: 'others',
        children: [{ path: 'preguntas', element: <Inicio /> }],
      },
    ],
  };
};

export default MainRoutes;