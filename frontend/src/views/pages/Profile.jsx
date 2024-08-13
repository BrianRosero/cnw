import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Box,
  Container,
  Tabs,
  Tab,
  Card,
  Chip,
  Link,
  Badge,
  Tooltip,
  Drawer,
  MenuItem,
  Menu,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Email,
  LocationOn,
  Work,
  Security,
  Edit,
  Save,
  AccountCircle,
  Twitter,
  LinkedIn,
  GitHub,
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  ExitToApp,
  Home,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import User1 from '../../assets/images/users/user-round.svg';
import axios from 'axios';
import { TabContext, TabPanel } from '@mui/lab';

const ProfilePage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    currentUser?.description || '',
  );
  const [tabValue, setTabValue] = useState('about');


  useEffect(() => {
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
        localStorage.setItem(
          `profileImage_${currentUser.id}`,
          reader.result,
        );
      };
      reader.readAsDataURL(imageFile);
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const projects = [
    {
      id: 1,
      name: 'Proyecto 1',
      description: 'Descripción del Proyecto 1',
      technologies: ['React.js', 'Node.js'],
    },
    {
      id: 2,
      name: 'Proyecto 2',
      description: 'Descripción del Proyecto 2',
      technologies: ['Angular', 'Express.js'],
    },
  ];

  const interests = ['Deportes', 'Lectura', 'Música', 'Viajes'];

  const socialLinks = [
    { id: 1, name: 'LinkedIn', url: 'https://www.linkedin.com/johndoe' },
    { id: 2, name: 'Twitter', url: 'https://www.twitter.com/johndoe' },
    { id: 3, name: 'GitHub', url: 'https://www.github.com/johndoe' },
  ];

  const experiences = [
    {
      id: 1,
      company: 'CONSULNETWORKS',
      position: 'Software Developer',
      period: '2020 - Presente',
    },
    {
      id: 2,
      company: 'TechCorp',
      position: 'Frontend Developer',
      period: '2018 - 2020',
    },
  ];

  const education = [
    {
      id: 1,
      institution: 'Universidad del Valle',
      degree: 'Ingeniería de Sistemas',
      period: '2014 - 2018',
    },
  ];

  const activityLog = [
    { id: 1, activity: 'Inició sesión desde un nuevo dispositivo.', date: '2024-08-01' },
    { id: 2, activity: 'Cambió la contraseña.', date: '2024-07-30' },
  ];

  const enable2FA = async () => {
    try {
      const response = await axios.post(
        'http://192.168.200.155:8080/api/auth/enable-2fa',
        { userId: currentUser.id },
      );
      setQrCodeUrl(response.data.qrCodeUrl);
      setErrorMessage('');
    } catch (error) {
      console.error('Error enabling 2FA', error);
      setErrorMessage(
        'Error enabling 2FA: ' +
        (error.response ? error.response.data.message : error.message),
      );
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveDescription = () => {
    setIsEditing(false);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f4f8',
        color: '#000',
        minHeight: '100vh',
        padding: '20px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                background: 'linear-gradient(135deg, #e2e2e2 30%, #c9d6ff 100%)',
                padding: '20px',
                borderRadius: '20px',
                textAlign: 'center',
                position: 'relative',
                height: '100%',
                transition: 'background 0.3s ease',
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Tooltip title="Editar imagen de perfil">
                    <IconButton
                      component="label"
                      sx={{
                        backgroundColor: '#fff',
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <Edit color="primary" />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <Avatar
                  src={profileImage || User1}
                  alt="Perfil"
                  sx={{
                    width: 150,
                    height: 150,
                    margin: 'auto',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </Badge>
              <Typography variant="h2" gutterBottom>{currentUser.username}</Typography>
              <Typography variant="h3" gutterBottom>{currentUser.names} {currentUser.lastname}</Typography>
              <Typography variant="subtitle2" color="textSecondary">{currentUser.profile}</Typography>
              <Typography variant="body1" gutterBottom><Email /> {currentUser.email}</Typography>
              <Divider style={{ margin: '20px auto', width: '80%' }} />

              <Box style={{ marginTop: '10px' }}>
                <Typography variant="body1" gutterBottom><LocationOn /> Cali, Valle del Cauca.</Typography>
                <Typography variant="body1" gutterBottom><Work /> CONSULNETWORKS</Typography>
              </Box>
              <Divider style={{ margin: '20px auto', width: '80%' }} />
              <Box sx={{ marginBottom: '10px' }}>
                {currentUser.roles &&
                  currentUser.roles.map((role) => (
                    <Chip icon={<Work />} label={role} color="primary"
                          sx={{
                            fontWeight: 'bold',
                            backgroundColor: '#1e88e5',
                            color: '#fff',
                          }}
                    />
                  ))}
              </Box>

              <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  Redes Sociales
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {socialLinks.map((link) => (
                    <IconButton
                      key={link.id}
                      component={Link}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color:
                          link.name === 'LinkedIn'
                            ? '#0077b5'
                            : link.name === 'Twitter'
                              ? '#1da1f2'
                              : '#000',
                      }}
                    >
                      {link.name === 'LinkedIn' ? (
                        <LinkedIn />
                      ) : link.name === 'Twitter' ? (
                        <Twitter />
                      ) : (
                        <GitHub />
                      )}
                    </IconButton>
                  ))}
                </Box>
              </Box>

              <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  Configuración y Seguridad
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Security />}
                  onClick={enable2FA}
                  sx={{
                    backgroundColor: '#00796b',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#004d40' },
                  }}
                >
                  Habilitar 2FA
                </Button>
                {qrCodeUrl && (
                  <img
                    src={qrCodeUrl}
                    alt="Código QR para 2FA"
                    style={{ marginTop: '10px', width: '100%' }}
                  />
                )}
                {errorMessage && (
                  <Typography color="error">{errorMessage}</Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <TabContext value={tabValue}>
              <Paper
                elevation={3}
                sx={{
                  background: 'linear-gradient(135deg, #f5f7fa 30%, #c3cfe2 100%)',
                  borderRadius: '20px',
                  padding: '20px',
                  marginBottom: '20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'background 0.3s ease',
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  variant="fullWidth"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#f50057',
                    },
                    '& .MuiTab-root': {
                      fontWeight: 'bold',
                      color: '#555',
                    },
                  }}
                >
                  <Tab label="Acerca de Mí" value="about" />
                  <Tab label="Experiencia" value="experience" />
                  <Tab label="Educación" value="education" />
                  <Tab label="Proyectos" value="projects" />
                  <Tab label="Intereses" value="interests" />
                  <Tab label="Actividad" value="activity" />
                </Tabs>

                <Box
                  sx={{
                    overflowY: 'auto',
                    height: 'calc(100% - 48px)',
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f0f4f8',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#888',
                      borderRadius: '10px',
                      '&:hover': {
                        backgroundColor: '#555',
                      },
                    },
                  }}
                >
                  <TabPanel value="about">
                    <Typography variant="h5" gutterBottom>
                      Acerca de Mí
                      <IconButton onClick={handleEditToggle}>
                        <Edit />
                      </IconButton>
                    </Typography>
                    {isEditing ? (
                      <>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          value={editedDescription}
                          onChange={(e) =>
                            setEditedDescription(e.target.value)
                          }
                          sx={{ marginBottom: '20px' }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSaveDescription}
                          startIcon={<Save />}
                          sx={{
                            fontWeight: 'bold',
                            backgroundColor: '#004d40',
                            '&:hover': { backgroundColor: '#004d40' },
                          }}
                        >
                          Guardar
                        </Button>
                      </>
                    ) : (
                      <Typography variant="body1" gutterBottom>
                        {editedDescription}
                      </Typography>
                    )}
                  </TabPanel>

                  <TabPanel value="experience">
                    <Typography variant="h5" gutterBottom>
                      Experiencia
                    </Typography>
                    {experiences.map((exp) => (
                      <Box key={exp.id}>
                        <Typography variant="h6">
                          {exp.position} en {exp.company}
                        </Typography>
                        <Typography variant="body1">{exp.period}</Typography>
                        <Divider sx={{ margin: '20px auto', width: '50%' }} />
                      </Box>
                    ))}
                  </TabPanel>

                  <TabPanel value="education">
                    <Typography variant="h5" gutterBottom>
                      Educación
                    </Typography>
                    {education.map((edu) => (
                      <Box key={edu.id}>
                        <Typography variant="h6">
                          {edu.degree} en {edu.institution}
                        </Typography>
                        <Typography variant="body1">{edu.period}</Typography>
                        <Divider sx={{ margin: '20px auto', width: '50%' }} />
                      </Box>
                    ))}
                  </TabPanel>

                  <TabPanel value="projects">
                    <Typography variant="h5" gutterBottom>
                      Proyectos
                    </Typography>
                    {projects.map((project) => (
                      <Card
                        key={project.id}
                        sx={{
                          padding: '20px',
                          marginBottom: '20px',
                          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        <Typography variant="h6">{project.name}</Typography>
                        <Typography variant="body1" gutterBottom>
                          {project.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: 'italic' }}
                        >
                          Tecnologías: {project.technologies.join(', ')}
                        </Typography>
                      </Card>
                    ))}
                  </TabPanel>

                  <TabPanel value="interests">
                    <Typography variant="h5" gutterBottom>
                      Intereses y Hobbies
                    </Typography>
                    <Typography variant="body1">
                      {interests.join(', ')}
                    </Typography>
                  </TabPanel>

                  <TabPanel value="activity">
                    <Typography variant="h5" gutterBottom>
                      Actividad Reciente
                    </Typography>
                    <List>
                      {activityLog.map((activity) => (
                        <ListItem key={activity.id}>
                          <ListItemText
                            primary={activity.activity}
                            secondary={activity.date}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                </Box>
              </Paper>
            </TabContext>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
