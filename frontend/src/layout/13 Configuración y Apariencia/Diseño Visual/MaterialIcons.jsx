import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// project imports
import MainCard from '../../Ui-Components/Cards/MainCard.jsx';
import SecondaryAction from '../../Ui-Components/Cards/CardSecondaryAction.jsx';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
}));

// ============================|| MATERIAL ICONS ||============================ //

const MaterialIcons = () => (
  <MainCard title="Material Icons" secondary={<SecondaryAction link="https://tabler.io/icons" />}>
    <Card sx={{ overflow: 'hidden' }}>
      <IFrameWrapper title="Pagina Consulnetworks" width="100%" src="https://tabler.io/icons" />
    </Card>
  </MainCard>
);

export default MaterialIcons;
