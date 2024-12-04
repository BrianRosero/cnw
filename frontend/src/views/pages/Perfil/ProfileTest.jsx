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
import User1 from '../../../assets/images/users/user-round.svg';
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

  const activityLog = [
    { id: 1, activity: 'Inició sesión desde un nuevo dispositivo.', date: '2024-08-01' },
    { id: 2, activity: 'Cambió la contraseña.', date: '2024-07-30' },
  ];

  const enable2FA = async () => {
    try {
      const response = await axios.post(
        'https://192.168.200.155:8080/api/auth/enable-2fa',
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
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;