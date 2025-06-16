import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  Fab,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
  Grid,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import design from '@/layout/Customization/ButtonHorus/horuswhite.svg';

const ChatAI = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null); // Referencia para el scroll automático
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8083";

  const sendMessageToAI = async (message) => {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message })
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error comunicándose con el servidor:', error);
      return 'Error al conectar con la IA';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const aiResponseText = await sendMessageToAI(input);
    const aiMessage = { text: aiResponseText, sender: 'ai' };

    setMessages((prev) => [...prev, aiMessage]);
  };

  // Efecto para hacer scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Tooltip title="HORUS IA">
        <Fab
          component="div"
          onClick={() => setOpen(!open)}
          size="medium"
          color="primary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '15%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial,
          }}
        >
          <IconButton color="inherit" size="large" disableRipple>
            <img src={design} alt="Diseño girando" style={{ width: 70, animation: "spin 2s linear infinite" }} />
          </IconButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 400, display: 'flex', flexDirection: 'column' },
        }}
      >
        <PerfectScrollbar component="div" style={{ flex: 1, padding: '10px' }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2, px: 2 }}>
            Chat con Inteligencia Artificial
          </Typography>

          <List sx={{ flex: 1, overflow: 'auto', px: 2 }}>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <ListItemText
                  primary={msg.text}
                  sx={{
                    maxWidth: '80%',
                    bgcolor: msg.sender === 'user' ? theme.palette.primary.main : theme.palette.grey[300],
                    color: msg.sender === 'user' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                    borderRadius: 2,
                    p: 1,
                  }}
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} /> {/* Elemento invisible para hacer scroll al final */}
          </List>
        </PerfectScrollbar>

        <Grid container sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 1 }}>
            Enviar
          </Button>
        </Grid>
      </Drawer>
    </>
  );
};

export default ChatAI;
