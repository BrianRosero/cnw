import React, { useState } from 'react';
import { Typography, TextField, Button, Snackbar, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const PreguntasChat = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [adjunto, setAdjunto] = useState(null);
  const [preguntas, setPreguntas] = useState([
    { id: 1, pregunta: '¿Cuál es el horario de atención?', respuesta: 'Nuestro horario de atención es de lunes a viernes de 8am a 6pm.' },
    { id: 2, pregunta: '¿Tengo una pregunta respecto a un servicio contratado?', respuesta: 'Puedes realizar un cambio contactando a nuestro equipo de soporte.' },
    // Agregar más preguntas y respuestas según sea necesario
  ]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePregunta = (event) => {
    setPregunta(event.target.value);
  };

  const handleAdjunto = (event) => {
    const file = event.target.files[0];
    setAdjunto(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nombre.trim() !== '' && email.trim() !== '' && pregunta.trim() !== '') {
      // Aquí puedes agregar lógica para enviar la pregunta, el nombre, el correo electrónico y el archivo adjunto a tu backend o hacer cualquier otro tipo de procesamiento
      setNombre('');
      setEmail('');
      setPregunta('');
      setAdjunto(null);
      setMostrarMensaje(true);
    }
  };

  const handleCloseMensaje = () => {
    setMostrarMensaje(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Preguntas y Chat</Typography>
      <Typography variant="body1" gutterBottom>
        ¿Tienes alguna pregunta? ¡Chatea con nosotros! Completa el formulario a continuación y te responderemos lo antes posible.
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          id="nombre"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={handleChangeNombre}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          id="email"
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleChangeEmail}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          id="pregunta"
          label="Escribe tu pregunta aquí"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={pregunta}
          onChange={handleChangePregunta}
          style={{ marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            id="adjunto"
            type="file"
            onChange={handleAdjunto}
            style={{ display: 'none' }}
          />
          <label htmlFor="adjunto">
            <Button
              variant="outlined"
              component="span"
              startIcon={<AttachFileIcon />}
              style={{ marginRight: '10px' }}
            >
              Adjuntar archivo
            </Button>
          </label>
          <Button variant="contained" type="submit">Enviar Pregunta</Button>
        </div>
      </form>
      <Typography variant="h6" gutterBottom>Preguntas Frecuentes</Typography>
      <List>
        {preguntas.map((pregunta) => (
          <ListItem key={pregunta.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>
                <ChatBubbleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={pregunta.pregunta}
              secondary={pregunta.respuesta}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        startIcon={<ChatBubbleIcon />}
        style={{ backgroundColor: '#25d366', color: '#fff', marginTop: '20px' }}
        onClick={() => window.open('https://wa.me/xxxxxxxxxx', '_blank')}
      >
        Chatear por WhatsApp
      </Button>
      <Snackbar
        open={mostrarMensaje}
        autoHideDuration={6000}
        onClose={handleCloseMensaje}
        message="¡Tu pregunta ha sido enviada!"
      />
    </div>
  );
};

export default PreguntasChat;
