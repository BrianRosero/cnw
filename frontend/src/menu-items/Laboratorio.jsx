import { IconCirclePlus, IconBrowserPlus, IconTopologyComplex, IconSandbox} from '@tabler/icons-react';

const laboratorio = {
  id: 'laboratorio',
  title: 'Laboratorio de Innovación',
  type: 'group',
  children: [
    {
      id: 'proyectos',
      title: 'Proyectos Experimentales',
      type: 'item',
      url: '/laboratorio/proyectos',
      icon: IconCirclePlus,
      breadcrumbs: false,
    },
    {
      id: 'nuevas funciones',
      title: 'Nuevas Funciones',
      type: 'item',
      url: '/laboratorio/nuevas funciones',
      icon: IconBrowserPlus,
      breadcrumbs: false,
    },
    {
      id: 'prototipos',
      title: 'Ideas y Prototipos',
      type: 'item',
      url: '/laboratorio/prototipos',
      icon: IconTopologyComplex,
      breadcrumbs: false,
    },
    {
      id: 'sandbox IA',
      title: 'Sandbox IA / Automatización',
      type: 'item',
      url: '/laboratorio/sandbox IA',
      icon: IconSandbox,
      breadcrumbs: false,
    },
  ],
};

export default laboratorio;
