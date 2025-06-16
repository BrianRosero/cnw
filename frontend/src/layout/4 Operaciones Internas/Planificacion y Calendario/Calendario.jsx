import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importar el idioma español para moment
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

moment.locale('es'); // Establecer moment en español

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: 'Evento 1',
      start: new Date(2024, 2, 1),
      end: new Date(2024, 2, 2),
    },
    {
      id: 1,
      title: 'Evento 2',
      start: new Date(2024, 2, 5),
      end: new Date(2024, 2, 6),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Ingrese el título del evento:');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title: title,
        start: start,
        end: end,
      };
      setEvents([...events, newEvent]);
    }
  };

  const today = moment().format('LL');
  const timeNow = moment().format('LT');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '500px' }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            messages={{
              today: 'Hoy',
              previous: 'Anterior',
              next: 'Siguiente',
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              showMore: total => `+${total} más`,
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Información adicional
          </Typography>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Día de hoy:
            </Typography>
            <Typography variant="body1">{today}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Hora actual:
            </Typography>
            <Typography variant="body1">{timeNow}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Próximos eventos:
            </Typography>
            {events.map(event => (
              <div key={event.id}>
                <Typography variant="body1" gutterBottom>
                  {moment(event.start).format('LL')}
                </Typography>
                <Typography variant="body1">{event.title}</Typography>
              </div>
            ))}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Calendario;
