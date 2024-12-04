import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import NavigationScroll from './layout/NavigationScroll';
import theme from './themes';
import Routes from './routes/index.jsx';
import Auth from './views/authentication/authentication.jsx';

import { AuthProvider } from './services/AuthContext';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const { showModeratorBoard, showAdminBoard, currentUser, logOut } = Auth();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <AuthProvider>
          <NavigationScroll
            showModeratorBoard={showModeratorBoard}
            showAdminBoard={showAdminBoard}
            currentUser={currentUser}
            logOut={logOut}
          >
            {/*<AppRoutes />*/}
            <Routes />
          </NavigationScroll>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
