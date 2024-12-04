import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
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


// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import desing from './ButtonHorus/horus.svg';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from '../../actions/types.jsx';
import { gridSpacing } from '../../actions/types.jsx';
import design from '@/layout/Customization/ButtonHorus/horuswhite.svg';


// ==============================|| LIVE CUSTOMIZATION ||============================== //

const ChatAI = () => {
  const theme = useTheme();

  // Drawer state
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Dummy function to simulate API call
  const sendMessageToAI = async (message) => {
    // Simula una respuesta de IA
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Respuesta de la IA a: "${message}"`);
      }, 1000);
    });
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

  return (
    <>
      {/* toggle button */}
      <Tooltip title="HORUS IA">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
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
          <AnimateButton>
            <IconButton color="inherit" size="large" disableRipple>
              <style>
                {`
          .rotating-svg {
            width: 70px; /* Tamaño ajustable */
            height: auto; /* Mantiene la proporción */
            animation: spin 2s linear infinite;
            transform-origin: center; /* Centro exacto del círculo */
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
              </style>
              <img
                src={design}
                alt="Diseño girando"
                className="rotating-svg"
                style={{
                  display: 'block', // Elimina espacios no deseados
                }}
              />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleToggle}
        PaperProps={{
          sx: { width: 400, display: 'flex', flexDirection: 'column' },
        }}
      >
        <PerfectScrollbar component="div" style={{ flex: 1 }}>
          <Grid container sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              Chat con Inteligencia Artificial
            </Typography>
          </Grid>

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
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            sx={{ ml: 1, flexShrink: 0 }}
          >
            Enviar
          </Button>
        </Grid>
      </Drawer>
    </>
  );
};

export default ChatAI;
