import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Typography,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
} from '@mui/material';

import ProfileAbout from './ProfileAbout.jsx';
import ProfileDetails from './ProfileDetails.jsx';
import ProfileAccount from './ProfileAccount.jsx';
import ProfilePassword from './ProfilePassword.jsx';
import ProfileSettings from './ProfileSettings.jsx';
import ProfileSidebar from './ProfileSidebar.jsx';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div>
      <Box style={{background:'#ffffff'}}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 8, padding: 3 }}>
          <ProfileHeader />
          <ProfileTabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
          <Box sx={{ display: 'flex', gap: 2, padding: 0 }}>
            <ProfileSidebar />
            <ProfileContent tabIndex={tabIndex} />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

// Componente ProfileHeader
function ProfileHeader() {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <Box sx={{ padding: 2, backgroundColor: '#ffffff', borderRadius: 1 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/profile/profile">
          Perfil
        </Link>
        <Typography color="text.primary">Ajustes del Perfil</Typography>
      </Breadcrumbs>
      <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
        {currentUser.names} {currentUser.lastname}
      </Typography>
    </Box>
  );
}

// Componente ProfileTabs
function ProfileTabs({ tabIndex, setTabIndex }) {
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#ffffff', borderRadius: 1}}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            fontWeight: 'bold',
            textTransform: 'none',
          },
        }}
      >
        <Tab label="Perfil" />
        <Tab label="Datos Personales" />
        <Tab label="Mi cuenta" />
        <Tab label="Cambiar Contraseña" />
        <Tab label="Configuraciones" />
      </Tabs>
    </Box>
  );
}

// Componente ProfileContent
function ProfileContent({ tabIndex }) {
  const renderContent = () => {
    switch (tabIndex) {
      case 0:
        return <ProfileAbout />;
      case 1:
        return <ProfileDetails />;
      case 2:
        return <ProfileAccount />;
      case 3:
        return <ProfilePassword />;
      case 4:
        return <ProfileSettings />;
      default:
        return null;
    }
  };
  return (
    <Box sx={{ //flex: 1, padding: 2, borderRadius: 2, backgroundColor: '#ffffff', boxShadow: 2
      //width: 320,
      padding: 2,
      borderRadius: 2,
      background: '#fff',
      boxShadow: 2,
      flex: 1,
    }}>
      {renderContent()}
    </Box>
  );
}

export default ProfilePage;
