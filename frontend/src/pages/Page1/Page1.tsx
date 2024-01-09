import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Page1() {
  return (
    <>
      <Meta title="Desarrollo" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Desarrollo</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page1;
