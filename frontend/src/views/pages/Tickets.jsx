import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Typography, Paper, Snackbar, Card, CardContent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ticketContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '16px',
};

const ticketItemStyle = {
  width: '100%',
  marginBottom: '8px',
};

const Tickets = () => {
  const dispatch = useDispatch();
  const [ticketFormData, setTicketFormData] = useState({ title: '', description: '', priority: '', category: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const tickets = useSelector((state) => state.tickets);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketFormData({ ...ticketFormData, [name]: value });
  };

  const handleSubmit = () => {
    if (!ticketFormData.title.trim() || !ticketFormData.description.trim() || !ticketFormData.priority.trim() || !ticketFormData.category.trim()) {
      setSnackbarMessage('Por favor, complete todos los campos');
      setSnackbarOpen(true);
      return;
    }
    const newTicket = {
      id: uuidv4(),
      title: ticketFormData.title,
      description: ticketFormData.description,
      priority: ticketFormData.priority,
      category: ticketFormData.category,
      status: 'open',
    };
    dispatch({ type: 'ADD_TICKET', payload: newTicket });
    setSnackbarMessage('Ticket creado exitosamente');
    setSnackbarOpen(true);
    setTicketFormData({ title: '', description: '', priority: '', category: '' });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TICKET', payload: id });
    setSnackbarMessage('Ticket eliminado exitosamente');
    setSnackbarOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <Typography variant="h4">Mesa de ayuda</Typography>
      <div style={{ marginBottom: '16px', width: '100%' }}>
        <TextField
          name="title"
          value={ticketFormData.title}
          onChange={handleInputChange}
          label="Título del ticket"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          value={ticketFormData.description}
          onChange={handleInputChange}
          label="Descripción del ticket"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          name="priority"
          value={ticketFormData.priority}
          onChange={handleInputChange}
          label="Prioridad"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          name="category"
          value={ticketFormData.category}
          onChange={handleInputChange}
          label="Categoría"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Crear ticket
        </Button>
      </div>
      <div style={ticketContainerStyle}>
        {tickets && tickets.map((ticket) => (
          <Paper key={ticket.id} style={ticketItemStyle}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{ticket.title}</Typography>
                <Typography variant="body1">{ticket.description}</Typography>
                <Typography variant="body2">Prioridad: {ticket.priority}</Typography>
                <Typography variant="body2">Categoría: {ticket.category}</Typography>
                <Button onClick={() => handleDelete(ticket.id)}>Eliminar</Button>
              </CardContent>
            </Card>
          </Paper>
        ))}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Tickets;
