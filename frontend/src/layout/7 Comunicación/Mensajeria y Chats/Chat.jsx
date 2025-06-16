import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Paper, TextField, Button, Grid, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Chat as ChatIcon, Send as SendIcon } from '@mui/icons-material';

const Chat = () => {
  const [messages, setMessages] = useState([
    { user: 'Brian R', content: 'Hola, ¿cómo estás?' },
    { user: 'Jhon P', content: '¡Hola! Estoy bien, ¿y tú?' },
    { user: 'Brian R', content: 'Muy bien, gracias.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState(['Daniel R', 'Luis T', 'Jhon P']); // Lista de contactos

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { user: 'Brian R', content: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" style={{ backgroundColor: '#004a8f', borderBottom: '2px solid #888', borderRadius: '8px' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ChatIcon />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1, color: '#ffffff' }}>
            Conversación de Equipo
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container style={{ flex: 1 }}>
        <Grid item xs={3} style={{ borderRight: '2px solid #ccc' }}>
          <List>
            {contacts.map(contact => (
              <ListItem button key={contact}>
                <ListItemAvatar>
                  <Avatar>{contact.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={contact} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9} style={{ padding: '20px', overflowY: 'auto' }}>
          <Paper elevation={3} style={{ marginBottom: '20px', padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '20px', display: 'flex', justifyContent: msg.user === 'Brian R' ? 'flex-end' : 'flex-start' }}>
                {msg.user !== 'Brian R' && <Avatar alt={msg.user} src={`https://i.pravatar.cc/150?u=${msg.user}`} style={{ marginRight: '10px' }} />}
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle2" style={{ color: '#004a8f', marginBottom: '5px', textAlign: msg.user === 'Brian R' ? 'right' : 'left' }}>
                    {msg.user}
                  </Typography>
                  <Typography variant="body1" style={{ borderRadius: '10px', padding: '10px', backgroundColor: msg.user === 'Brian R' ? '#004a8f' : '#E5E5EA', color: msg.user === 'Brian R' ? '#fff' : '#000', textAlign: msg.user === 'Brian R' ? 'right' : 'left' }}>
                    {msg.content}
                  </Typography>
                </div>
              </div>
            ))}
          </Paper>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={9}>
                <TextField label="Escribe un mensaje" fullWidth value={newMessage} onChange={handleMessageChange} />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleSendMessage}>
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
