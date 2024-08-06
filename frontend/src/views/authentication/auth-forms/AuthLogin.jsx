import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';


import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
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
  useMediaQuery,
} from '@mui/material';

import * as Yup from 'yup';


import { login } from '../../../actions/auth.jsx';
import AnimateButton from '../../../ui-component/extended/AnimateButton.jsx';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Microsoft from '../../../assets/images/icons/Microsoft_logo.svg';
import Google from '../../../assets/images/icons/social-google.svg';


const Login = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth) || {};
  const { message } = useSelector(state => state.message) || {};
  const dispatch = useDispatch();

  const googleHandler = async () => {
    console.error('Login');
  };

  const [showPassword, setShowPassword] = useState(false);

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
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
    setSubmitting(false);
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2} borderRadius={12}>
        {/*<Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Inicia sesión con Google
            </Button>
          </AnimateButton>
          <Box sx={{ mb: 2 }}>
          </Box>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Microsoft} alt="google" width={16} height={16}
                     style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Registrate con Microsoft
            </Button>
          </AnimateButton>
        </Grid>*/}
        {/*<Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: 12,
              }}
              disableRipple
              disabled
            >
              O
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>*/}
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
            <FormControl fullWidth error={Boolean(touched.username && errors.username)}
                         sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Nombre de Usuario</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-login"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username-login">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ mt: 1 }}>
              {/* Agregar este Box con margen superior */}
            </Box>
            <FormControl fullWidth error={Boolean(touched.password && errors.password)}
                         sx={{ ...theme.typography.customInput }}>
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
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)}
                            name="checked" color="primary" />
                }
                label="Recordarme"
              />
              <Typography variant="subtitle1" color="secondary"
                          sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Olvidaste la contraseña?
              </Typography>
            </Stack>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit"
                        variant="contained" color="primary">
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Iniciar Sesión</span>
                </Button>
              </AnimateButton>
            </Box>
            {message && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{message}</FormHelperText>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
