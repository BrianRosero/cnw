// @mui material components
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import DnsIcon from '@mui/icons-material/Dns';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


// Soft UI Dashboard PRO React components
import SoftBox from '../../../components/SoftBox';
import SoftTypography from '../../../components/SoftTypography';

// Soft UI Dashboard PRO React example components
import DashboardLayout from '../../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../../examples/Navbars/DashboardNavbar';
import Footer from '../../../examples/Footer';
import MiniStatisticsCard from '../../../examples/Cards/StatisticsCards/MiniStatisticsCard';
import SalesTable from '../../../examples/Tables/SalesTable';
import ReportsBarChart from '../../../examples/Charts/BarCharts/ReportsBarChart';
import GradientLineChart from '../../../examples/Charts/LineCharts/GradientLineChart';
import Globe from '../../../examples/Globe';

// Soft UI Dashboard PRO React base styles
import typography from '../../../assets/theme/base/typography';
import breakpoints from '../../../assets/theme/base/breakpoints';

// Data
import salesTableData from './data/salesTableData';
import reportsBarChartData from './data/reportsBarChartData';
import gradientLineChartData from './data/gradientLineChartData';

function Default() {
  const { values } = breakpoints;
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <div>
      <SoftBox py={3}>
        <Grid container style={{ overflow: 'visible' }}>
          <Grid item xs={12}>
            <SoftBox

              position="absolute"
              style={{
                top: '5%',
                right: '-32%',
                overflow: 'visible', // No cortar contenido
                display: 'flex', // Alinear correctamente si hay más contenido
                justifyContent: 'center', // Centrar horizontalmente el globo
                alignItems: 'center', // Centrar verticalmente
                width: '100%', // Asegurar que el contenedor use el espacio disponible
                height: '800px', // Altura fija o flexible según sea necesario
              }}
            >
              <Globe
                canvasStyle={{
                  width: '100%', // Usar todo el ancho del contenedor padre
                  height: '100%', // Ajustar la altura al contenedor
                }}
                sx={{
                  width: { xs: '500px', md: '600px' },
                  height: 'auto',
                  display: { xs: 'none', md: 'block' },
                }}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} lg={7}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={window.innerWidth < values.sm ? 'h2' : 'h1'}
                textTransform="capitalize"
                fontWeight="bold"
                color="primary"
              >
                CONSULNETWORKS
              </SoftTypography>
            </SoftBox>
            <Grid container spacing={3} position={'relative'}>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: 'DATACENTER', fontWeight: 'bold', sx: { color: '!white' }, }}
                    count="2,300"
                    percentage={{ color: 'success', text: '+3%', sx: { color: 'white' }, }}
                    icon={{ color: 'info', component: <DnsIcon />, }}
                    bgColor={'primary'} sx={{ color: 'white' }}
                  />
                </SoftBox>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: 'today\'s users', fontWeight: 'bold', sx: { color: '!white' }, }}
                    count="2,300"
                    percentage={{ color: 'success', text: '+3%', sx: { color: 'white' } }}
                    icon={{ color: 'info', component: <PublicIcon /> }}
                    bgColor={'primary'} sx={{ color: 'white' }}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={5}>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: 'new clients', fontWeight: 'bold' }}
                    count="+3,462"
                    percentage={{ color: 'error', text: '-2%' }}
                    icon={{ color: 'info', component: <EmojiEventsIcon /> }}
                    bgColor={'primary'} sx={{ color: 'white' }}
                  />
                </SoftBox>
                <SoftBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: 'sales', fontWeight: 'bold' }}
                    count="$103,430"
                    percentage={{ color: 'success', text: '+5%' }}
                    icon={{ color: 'info', component: <ShoppingCartIcon /> }}
                    bgColor={'primary'} sx={{ color: 'white' }}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={10} lg={7}>
            <Grid item xs={12} lg={10}>
              <SoftBox mb={3} position="relative">
                <SalesTable title="Sales by Country" rows={salesTableData} />
              </SoftBox>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {/*<Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>*/}
            {/* <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon sx={{ fontWeight: 'bold' }}>arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{' '}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                chart={gradientLineChartData}
              />
            </Grid>*/}
          </Grid>
        </Grid>
      </SoftBox>
    </div>
  );
}

export default Default;
