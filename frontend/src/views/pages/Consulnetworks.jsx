import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';

// styles
const IFrameWrapper = styled('iframe')(({ theme }) => ({
  height: 'calc(100vh - 210px)',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
}));

// ============================|| MATERIAL ICONS ||============================ //

const MaterialIcons = () => (
  <MainCard title="CONSULNETWORKS" secondary={<SecondaryAction link="http://phantom.consulnetworks.com.co:8081/ispsuite/plsql/www_inicio.inicio" />}>
    <Card sx={{ overflow: 'hidden' }}>
      <IFrameWrapper title="Pagina Consulnetworks" width="100%" src="http://phantom.consulnetworks.com.co:8081/ispsuite/plsql/www_inicio.inicio" />
    </Card>
  </MainCard>
);

export default MaterialIcons;