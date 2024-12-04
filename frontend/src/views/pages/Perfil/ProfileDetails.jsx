import React from 'react';
import { Typography, Box, Stack } from '@mui/material';

function ProfileDetails() {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">Personal Details</Typography>
      <Stack spacing={1} sx={{ ml: 1 }}>
        <Typography variant="body2"><strong>Full Name:</strong> JWT User</Typography>
        <Typography variant="body2"><strong>Father's Name:</strong> Mr. Deepen Handgun</Typography>
        <Typography variant="body2"><strong>Address:</strong> Street 110-B Kalians Bag, Dewan...</Typography>
        <Typography variant="body2"><strong>Zip Code:</strong> 12345</Typography>
        <Typography variant="body2"><strong>Phone:</strong> +0 123456789, +0 123456789</Typography>
        <Typography variant="body2"><strong>Email:</strong> support@example.com</Typography>
        <Typography variant="body2"><strong>Website:</strong> http://example.com</Typography>
      </Stack>
    </Box>
  );
}

export default ProfileDetails;
