// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://www.cnw.co/" target="_blank" underline="hover">
      CONSULNETWORKS S.A.S E.S.P
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://www.cnw.co/" target="_blank" underline="hover">
      &copy; Brian Rosero
    </Typography>
  </Stack>
);

export default AuthFooter;
