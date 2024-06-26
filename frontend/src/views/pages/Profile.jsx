import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Button, Grid, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Email, LocationOn, Work } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import User1 from '../../assets/images/users/user-round.svg';

const ProfilePage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null); // Estado para almacenar la imagen de perfil

  useEffect(() => {
    // Cargar la imagen de perfil del usuario desde el almacenamiento local cuando se monta el componente
    const loadImageFromLocalStorage = () => {
      const storedImage = localStorage.getItem(`profileImage_${currentUser.id}`);
      if (storedImage) {
        setProfileImage(storedImage);
      }
    };

    if (currentUser) {
      loadImageFromLocalStorage();
    }
  }, [currentUser]);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem(`profileImage_${currentUser.id}`, reader.result); // Guardar la imagen de perfil en el almacenamiento local
      };
      reader.readAsDataURL(imageFile);
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const projects = [
    { id: 1, name: 'Proyecto 1', description: 'Descripción del Proyecto 1', technologies: ['React.js', 'Node.js'] },
    { id: 2, name: 'Proyecto 2', description: 'Descripción del Proyecto 2', technologies: ['Angular', 'Express.js'] },
  ];

  const interests = ['Deportes', 'Lectura', 'Música', 'Viajes'];

  const socialLinks = [
    { id: 1, name: 'LinkedIn', url: 'https://www.linkedin.com/johndoe' },
    { id: 2, name: 'Twitter', url: 'https://www.twitter.com/johndoe' },
    { id: 3, name: 'GitHub', url: 'https://www.github.com/johndoe' },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '40px', textAlign: 'center', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Avatar style={{ width: '100px', height: '100px', margin: '0 auto 20px' }} alt="Brian Rosero" src={profileImage || User1} />
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="imageUpload" />
            <label htmlFor="imageUpload">
              <Button variant="contained" component="span" color="primary" style={{ marginTop: '20px' }}>
                Cambiar Foto
              </Button>
            </label>
            <Typography variant="h4" gutterBottom>{currentUser.username}</Typography>
            <Typography variant="h4" gutterBottom>{currentUser.names} {currentUser.lastname}</Typography>
            <Typography variant="subtitle1" gutterBottom>{currentUser.profile}</Typography>
            <Divider style={{ margin: '20px auto', width: '50%' }} />
            <Typography variant="body1" gutterBottom><Email /> {currentUser.email}</Typography>
            <Typography variant="body1" gutterBottom><LocationOn /> Cali, Valle del Cauca.</Typography>
            <Typography variant="body1" gutterBottom><Work /> CONSULNETWORKS</Typography>
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h5" gutterBottom>Roles</Typography>
              <List>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={role} />
                    </ListItem>
                  ))}
              </List>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h5" gutterBottom>Redes Sociales</Typography>
              {socialLinks.map(link => (
                <Button key={link.id} variant="outlined" href={link.url} target="_blank" rel="noopener noreferrer"
                        style={{ marginRight: '10px' }}>
                  {link.name}
                </Button>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: '40px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>Acerca de Mí</Typography>
            <Typography variant="body1" gutterBottom>
              {currentUser.description}
            </Typography>
          </Paper>
          <Paper style={{ padding: '40px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>Proyectos</Typography>
            {projects.map(project => (
              <div key={project.id}>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body1">{project.description}</Typography>
                <Typography variant="body2" style={{ fontStyle: 'italic' }}>Tecnologías: {project.technologies.join(', ')}</Typography>
                <Divider style={{ margin: '20px auto', width: '50%' }} />
              </div>
            ))}
          </Paper>
          <Paper style={{ padding: '40px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>Intereses y Hobbies</Typography>
            <ul>
              {interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
