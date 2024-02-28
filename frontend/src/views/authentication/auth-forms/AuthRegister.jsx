import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { isEmail } from 'validator';

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
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { register } from '@/actions/auth.jsx';

// project imports
import useScriptRef from '../../../hooks/useScriptRef.jsx';
import Google from '../../../assets/images/icons/social-google.svg';
import Microsoft from '../../../assets/images/icons/Microsoft_logo.svg';
import AnimateButton from '../../../ui-component/extended/AnimateButton.jsx';
import { strengthColor, strengthIndicator } from '@/utils/password-strength.jsx';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const validEmail = (value) => {
  if (!isEmail(value)) {
    return 'This is not a valid email.';
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return 'The username must be between 3 and 20 characters.';
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return 'The password must be between 6 and 40 characters.';
  }
};

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const navigate = useNavigate();

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  const initialValues = {
    /*names: '',
    lastname: '',*/
    username: '',
    email: '',
    password: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSuccessful(false);
    dispatch(register(values.username, values.email, values.password, values.names, values.lastname,))
      .then(() => {
        setSuccessful(true);
        navigate('/login');
      })
      .catch(() => {
        setSuccessful(false);
      });
    setSubmitting(false);
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
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
          <Box sx={{ mt: 1 }}>
            {/* Agregar este Box con margen superior */}
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
                <img src={Google} alt="google" width={16} height={16}
                     style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Registrate con Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button

            >
              O
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Incia sesión tu correo electronico</Typography>
          </Box>
        </Grid>
      </Grid>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Se requiere un nombre de usuario!';
          } else if (values.username.length < 3 || values.username.length > 20) {
            errors.username = 'El nombre de usuario debe tener entre 3 y 20 caracteres.';
          }
          if (!values.email) {
            errors.email = 'Correo electrónico es requerido!';
          } else if (!isEmail(values.email)) {
            errors.email = 'Este no es un correo valido.';
          }
          if (!values.password) {
            errors.password = 'Se requiere una contraseña!';
          } else if (values.password.length < 6 || values.password.length > 40) {
            errors.password = 'La contraseña debe tener entre 6 y 40 caracteres.';
          }
          if (!values.names) {
            errors.names = 'Se requiere tu Nombre!';
          } else if (values.names.length < 2 || values.names.length > 30) {
            errors.names = 'Tu nombre debe tener entre 2 y 20 caracteres.';
          }
          if (!values.lastname) {
            errors.lastname = 'Se requiere tu Apellido!';
          } else if (values.lastname.length < 2 || values.lastname.length > 30) {
            errors.lastname = 'Tu apellido debe tener entre 2 y 20 caracteres.';
          }
          return errors;
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            {!successful && (
              <div>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      margin="normal"
                      id="name"
                      type="text"
                      name="names"
                      value={values.names}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.names && Boolean(errors.names)}
                    />
                    {touched.names && errors.names && (
                      <FormHelperText error id="helper-text-name">
                        {errors.names}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Apellido"
                      margin="normal"
                      id="lastname"
                      type="text"
                      name="lastname"
                      value={values.lastname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.lastname && Boolean(errors.lastname)}
                    />
                    {touched.lastname && errors.lastname && (
                      <FormHelperText error id="helper-text-lastname">
                        {errors.lastname}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre de Usuario"
                      margin="normal"
                      id="username"
                      type="text"
                      className="form-control"
                      name="username"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      validate={vusername}
                      error={touched.username && Boolean(errors.username)}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.username}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                  {/* Agregar este Box con margen superior */}
                </Box>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)}
                             sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-register">Correo
                    Electronico</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="email"
                    value={values.email}
                    label="correo electronico"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    validate={validEmail}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box sx={{ mt: 1 }}>
                  {/* Agregar este Box con margen superior */}
                </Box>
                <FormControl fullWidth error={Boolean(touched.password && errors.password)}
                             sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-password-register">Contraseña</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label="Contraseña"
                    onBlur={handleBlur}
                    validate={vpassword}
                    error={touched.password && Boolean(errors.password)}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
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
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            )}
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }}
                           sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked}
                              onChange={(event) => setChecked(event.target.checked)} name="checked"
                              color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      De acuerdo con &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terminos y Condiciones.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit"
                        variant="contained" color="secondary">
                  Inscribirse
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
