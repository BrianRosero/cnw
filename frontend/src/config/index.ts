import isMobile from '@/utils/is-mobile';

import type { Notifications } from './types';

const title = 'Consulnetworks';

const email = 'brayanrosero16@gmail.com';

const repository = 'https://github.com/BrianRosero';

const messages = {
  app: {
    crash: {
      title: 'Oooops... Lo siento, Supongo que algo salió mal. Puedes:',
      options: {
        email: `Contactarte con el desarrollador a este correo - ${email}`,
        reset: 'Presionar aqui para reiniciar la aplicación',
      },
    },
  },
  loader: {
    fail: 'Hmmmmmm, hay algún problema con el proceso de carga de este componente... Quizás intentarlo más tarde sería la mejor idea.',
  },
  images: {
    failed: 'algo salió mal durante la carga de la imagen :(',
  },
  404: 'Hey? que estas buscando?',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
  options: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    autoHideDuration: 6000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description: '\n' +
    'Kit de inicio para aplicaciones web modernas',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
  loader,
  notifications,
  dateFormat,
  messages,
  repository,
  email,
  title,
  defaultMetaTags,
  giphy404,
};
