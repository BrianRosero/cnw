import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  Box,
  Chip,
  Tooltip,
  Badge,
  LinearProgress,
  Grid,
} from '@mui/material';
import {
  MailOutline as MailOutlineIcon,
  PhoneOutlined as PhoneOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  Edit,
  Security,
  Share,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

function ProfileSidebar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null);

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
        localStorage.setItem(`profileImage_${currentUser.id}`, reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <Box
      sx={{
        width: 320,
        padding: 3,
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Tooltip title="Editar imagen de perfil">
              <IconButton component="label" sx={{ backgroundColor: '#fff' }}>
                <Edit color="primary" />
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </IconButton>
            </Tooltip>
          }
        >
          <Avatar
            src={profileImage}
            alt="Perfil"
            sx={{
              width: 100,
              height: 100,
              border: '2px solid #1976d2',
            }}
          />
        </Badge>
        <Typography variant="h5" fontWeight="bold">
          {currentUser.names} {currentUser.lastname}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          @{currentUser.username}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {currentUser.profile}
        </Typography>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <MailOutlineIcon fontSize="small" />
          <Typography variant="body2">{currentUser.email}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PhoneOutlinedIcon fontSize="small" />
          <Typography variant="body2">1239</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LocationOnOutlinedIcon fontSize="small" />
          <Typography variant="body2">M</Typography>
        </Stack>
      </Stack>
      {/*<Divider sx={{ my: 3 }} />
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Box textAlign="center">
          <Typography variant="h6" color="primary">
            37
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Mails
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6" color="primary">
            2749
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Followers
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6" color="primary">
            678
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Following
          </Typography>
        </Box>
      </Stack>*/}
      <Divider sx={{ my: 3 }} />
      <Stack container spacing={2} alignItems="center">
        <Grid item xs={7}>
          {currentUser.roles &&
            currentUser.roles.map((role) => (
          <Chip
            icon={<Security />}
            label={role}
            color="primary"
            sx={{ fontWeight: 'bold' }}
          />
            ))}
        </Grid>
        {/*<Grid item xs={6}>
          <Button
            variant="contained"
            startIcon={<Share />}
            color="secondary"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Compartir
          </Button>
        </Grid>*/}
      </Stack>
      <LinearProgress
        variant="determinate"
        value={70}
        sx={{
          height: 10,
          borderRadius: 5,
          mt: 3,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#00796b',
          },
        }}
      />
      <Typography
        variant="caption"
        align="center"
        display="block"
        color="textSecondary"
        sx={{ mt: 1 }}
      >
        Progreso del perfil: 70%
      </Typography>
    </Box>
  );
}

export default ProfileSidebar;
