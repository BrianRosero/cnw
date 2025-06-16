import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {
  Typography,
  Box,
  Button,
  Stack,
  TextField,
  Divider,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import { Security, Visibility, VisibilityOff } from '@mui/icons-material';

function ProfilePassword() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const enable2FA = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8083/api/auth/enable-2fa',
        { userId: currentUser.id },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`, // Usa el token actual
          },
        }
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


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // Simula una acción de envío (puedes agregar lógica API aquí)
    if (newPassword === confirmPassword && newPassword !== '') {
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 5000); // Ocultar mensaje después de 5 segundos
    }
  };

  return (
    <Box   sx={{
      maxWidth: 480,
      margin: 'auto',
      padding: 4,
      borderRadius: 3,

    }}>
      <Stack spacing={3} alignItems="center">
        <Security
          sx={{
            fontSize: 48,
            color: '#1976d2',
          }}
        />
        <Typography variant="h5" fontWeight="bold" align="center">
          Administración de Contraseñas Y Seguridad
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Para mantener su cuenta segura, cambie su contraseña periódicamente y habilite la autenticación de dos factores.
        </Typography>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={2}>
        <TextField
          label="Current Password"
          type={showPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <Tooltip title="Toggle Password Visibility">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            ),
          }}
        />

        <TextField
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <Tooltip title="Toggle Password Visibility">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <Tooltip title="Toggle Password Visibility">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          Actualizar Contraseña.
        </Button>
      </Stack>

      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mt: 3,
            backgroundColor: '#e8f5e9',
            color: '#388e3c',
            fontWeight: 'bold',
          }}
        >
          Password updated successfully!
        </Alert>
      )}

      <Divider sx={{ my: 3 }} />

      <Stack alignItems="center" spacing={1}>
        <Typography variant="h6" fontWeight="bold">
          Two-Factor Authentication
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Enhance your account security by enabling two-factor authentication.
        </Typography>
        {/*<Button
          variant="contained"
          color="secondary"
          startIcon={<Security />}
          sx={{
            mt: 2,
            fontWeight: 'bold',
            textTransform: 'none',
            backgroundColor: '#00796b',
            color: '#fff',
            '&:hover': { backgroundColor: '#004d40' },
          }}
          onClick={() => {
            window.location.href = '/enable-2fa'; // Redirige a la página de 2FA
          }}
        >
          Enable 2FA
        </Button>*/}

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

      </Stack>
    </Box>
  );
}

export default ProfilePassword;
