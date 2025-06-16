import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

function Noticias() {
  // Ejemplo de noticias (reemplaza con tus datos reales)
  const newsItems = [
    { id: 1, title: 'Nuevo Comunicado Oficial', date: '10 de Junio, 2025', content: 'Detalles importantes sobre la nueva política interna.' },
    { id: 2, title: 'Actualización del Sistema', date: '08 de Junio, 2025', content: 'Mejoras de rendimiento y nuevas funcionalidades añadidas.' },
    { id: 3, title: 'Evento Corporativo Próximo', date: '05 de Junio, 2025', content: 'Invitación a nuestro evento anual de innovación.' },
  ];

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <ArticleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Noticias y Comunicados
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Mantente informado con las últimas novedades de la empresa.
      </Typography>
      <List sx={{ width: '100%', maxWidth: 600, mx: 'auto', bgcolor: 'background.paper' }}>
        {newsItems.map((news, index) => (
          <React.Fragment key={news.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="h6">{news.title}</Typography>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {news.date}
                    </Typography>
                    {" — " + news.content}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < newsItems.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
      {/* Agrega más contenido de tus Noticias aquí */}
    </Box>
  );
}

export default Noticias;