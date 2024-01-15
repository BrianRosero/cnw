//import GitHubIcon from '@mui/icons-material/GitHub';
//import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
//import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
//import Tooltip from '@mui/material/Tooltip';
//import { FlexBox } from '@/components/styled';
//import { repository, title } from '@/config';
//import useHotKeysDialog from '@/store/hotkeys';
//import useNotifications from '@/store/notifications';
//import useSidebar from '@/store/sidebar';
//import useTheme from '@/store/theme';
//import { HotKeysButton } from './styled';
//import { getRandomJoke } from './utils';
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, alpha } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import routes from '@/routes';
import { Link } from 'react-router-dom';
import DefaultIcon from '@mui/icons-material/Deblur';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import logo from '../../../public/logo1.png';
import { useState } from 'react';
// Ancho del drawer cuando está abierto
const drawerWidth = 200;
//// Opciones de configuración del usuario
const settings = ['Perfil', 'Cuenta', 'Panel', 'Cerrar Sesión'];
// Estilos para el drawer cuando está abierto
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
// Estilos para el drawer cuando está cerrado
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
// Componente para el encabezado del Drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  //  // Necesario para que el contenido esté debajo de la barra de la aplicación
  ...theme.mixins.toolbar,
}));
// Props adicionales para la AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
// Estilos para la AppBar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
// Estilos para el Drawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
// Componente estilizado para ListItemButton
const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`, // Agregar borde y color de fondo predeterminado
  backgroundColor: '#ffffff', // Agregar color de fondo
  color: '#012169',// Color de texto predeterminado
  '& .MuiSvgIcon-root': {
    color: '#012169', // Color de iconos predeterminado
  },
  // Estilos al pasar el mouse
  '&:hover': {
    backgroundColor: '#012169', // Agregar color de fondo al pasar el mouse
    color: '#ffffff', // Cambiar color de texto al pasar el mouse
    '& .MuiSvgIcon-root': {
      color: '#ffffff', // Cambiar color del icono al pasar el mouse
    },
  },
  // Estilos cuando está seleccionado
  '&.Mui-selected': {
    backgroundColor: '#012169', // Conservar color de fondo cuando está seleccionado
    color: '#ffffff', // Conservar color de texto cuando está seleccionado
    '& .MuiSvgIcon-root': {
      color: '#ffffff', // Conservar color del icono cuando está seleccionado
    },
  },
}));
// Estilización del componente de búsqueda
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
// Estilización del contenedor del ícono de búsqueda
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
// Estilización del componente de entrada de texto de búsqueda
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// Estilización del distintivo (badge) utilizado en las notificaciones
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);  // Estado para controlar si el cajón está abierto o cerrado
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  // Función para abrir el cajón lateral
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // Función para cerrar el cajón lateral
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [, setAnchorEl] = React.useState<null | HTMLElement>(null); // función para actualizar el estado
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  // se utiliza comúnmente para verificar el estado
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // Abre el menú de perfil
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // Cierra el menú móvil
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  // Abre el menú móvil
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // Cierra el menú del usuario
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // Abre el menú del usuario
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  // Estado para el elemento seleccionado
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
   // identificar de manera única el menú móvil en la interfaz
  const mobileMenuId = 'primary-search-account-menu-mobile';
  // Renderizado del menú móvil
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="Correos" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Mensajes</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="Noticaciones"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Abrir Ajustes">
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot"
                         onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Perfil" src="2.jpg" />
            </StyledBadge>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="logo"
            src={logo}
          />
          <Typography variant="h6" noWrap component="div">
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Mostrar 4 correos">
              <IconButton size="large" aria-label="Mostrar 4 correos" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title=" Mostrar 17 notificaciones">
              <IconButton size="large" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir Ajustes">
                <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot"
                             onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="2.jpg" sx={{ width: 50, height: 50 }} />
                </StyledBadge>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Typography variant="h6" align="center" marginTop="0 px">
        </Typography>
        <Divider />
        <List>
          {Object.values(routes)
            .filter((route) => route.title)
            .map(({ path, title, icon: Icon }) => (
              <ListItem sx={{ p: 0 }} key={path}>
                <ListItemButtonStyled
                  component={Link}
                  to={path as string}
                  selected={selectedItem === path} // Verifica si el elemento actual está seleccionado
                  onClick={() => setSelectedItem(path)} // Establece el elemento como seleccionado al hacer clic
                >
                  <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
                  <ListItemText>{title}</ListItemText>
                </ListItemButtonStyled>
              </ListItem>
            ))}
        </List>
        <Divider />
        <List>
          {['Error', 'Información', 'Ayuda', 'Contacto'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButtonStyled
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                selected={selectedItem === text} // Verifica si el elemento actual está seleccionado
                onClick={() => setSelectedItem(text)} // Establece el elemento como seleccionado al hacer clic
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButtonStyled>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
        </Typography>
        <Typography paragraph>
        </Typography>
      </Box>
    </Box>
  );
}