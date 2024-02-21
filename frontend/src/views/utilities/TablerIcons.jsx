import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';

// assets
import LinkIcon from '@mui/icons-material/Link';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light
}));

// =============================|| TABLER ICONS ||============================= //

const TablerIcons = () => (
  <MainCard title="CONSULNETWORKS" secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://www.cnw.co/" />}>
    <Card sx={{ overflow: 'hidden' }}>
      <IFrameWrapper title="CONSULNETWORKS" width="100%" src="https://www.cnw.co/" />
    </Card>
  </MainCard>
);

export default TablerIcons;
