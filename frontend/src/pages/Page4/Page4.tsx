import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Page4() {
  return (
    <>
      <Meta title="Pagina 4" />
      <FullSizeCenteredFlexBox flexDirection="column">
        <Typography variant="h3">Pagina 4</Typography>
        <Button
          to={`/${Math.random().toString()}`}
          component={Link}
          variant="outlined"
          sx={{ mt: 4 }}
          size="small"
          color="warning"
        >
          Quieres revisar la pagina 404?
        </Button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page4;
