import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(79vh + 69px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  borderRadius: '5px',
}));

// ============================|| MATERIAL ICONS ||============================ //

const MaterialIcons = () => (
    <Card sx={{ overflow: 'hidden' }}>
      <IFrameWrapper title="Pagina Consulnetworks" width="100%" src="http://cnw.co" />
    </Card>
);

export default MaterialIcons;