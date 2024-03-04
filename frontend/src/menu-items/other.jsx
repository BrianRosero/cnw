// assets
import { IconBrandChrome, IconHelp, IconMailQuestion } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconMailQuestion };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Pagina de ejemplo',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false,
    },
    {
      id: 'preguntas',
      title: 'Preguntas',
      type: 'item',
      url: '/others/preguntas',
      icon: icons.IconMailQuestion,
      breadcrumbs: false,
    },
    {
      id: 'documentation',
      title: 'Documentación',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true,
    },
  ],
};

export default other;
