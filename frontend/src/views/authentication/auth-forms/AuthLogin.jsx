import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Checkbox,
  TextField,
} from '@mui/material';
import { login } from '../../../actions/auth';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { LOGIN_SUCCESS } from '@/actions/types.jsx';

const Login = ({ ...others }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [userId, setUserId] = useState(null);
  const { isLoggedIn } = useSelector(state => state.auth) || {};
  const { message } = useSelector(state => state.message) || {};
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Nombre de Usuario Requerido'),
    password: Yup.string().required('Contraseña requerida!'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    dispatch(login(values.username, values.password))
      .then((response) => {
        if (response.twoFactorEnabled) { // Verifica si el 2FA está habilitado
          setTwoFactorEnabled(true);
          setUserId(response.id);
        } else {
          navigate('/');
          window.location.reload();
        }
      })
      .catch(() => {
        setLoading(false);
      });
    setSubmitting(false);
  };

  const verify2FA = () => {
    setLoading(true);
    axios.post('http://192.168.200.155:8080/api/auth/verify-2fa', { userId, token: twoFactorToken })
      .then((response) => {
        const userData = response.data;
        if (userData.accessToken) {
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: userData },
          });
          navigate('/');
          window.location.reload();
        }
      })
      .catch(() => {
        alert('Código 2FA inválido');
      })
      .finally(() => {
        setLoading(false);
      });
  };


  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2} borderRadius={12}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Inicia Sesión con tu Nombre de Usuario</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Nombre de Usuario</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-login"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username-login">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ mt: 1 }}>
            </Box>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Recordarme"
              />
            </Stack>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Ingresar
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      {twoFactorEnabled && (
        <div>
          <Typography variant="subtitle1">Introduce el código 2FA</Typography>
          <TextField
            value={twoFactorToken}
            onChange={(e) => setTwoFactorToken(e.target.value)}
          />
          <Button onClick={verify2FA}>Verificar</Button>
        </div>
      )}
      {message && (
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <FormHelperText error>{message}</FormHelperText>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default Login;
