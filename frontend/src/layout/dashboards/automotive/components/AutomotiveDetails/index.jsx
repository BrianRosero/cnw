// @mui material components
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard PRO React components
import SoftBox from '../../../../../components/SoftBox';
import SoftTypography from '../../../../../components/SoftTypography';
import SoftButton from '../../../../../components/SoftButton';

// Images
import serverpng from '../../../../../assets/images/serve.png';
import wavesWhite from '../../../../../assets/images/shapes/waves-white.svg';

function AutomotiveDetails() {
  return (
    <SoftBox
      position="relative"
      bgColor="secondary"
      py={3}
      px={{ xs: 3, sm: 6 }}
      mt={3}
      borderRadius="xl"
      variant="gradient"
    >
      <SoftBox
        component="img"
        src={wavesWhite}
        alt="pattern-line"
        width="100%"
        position="absolute"
        left="0"
        top="0"
        opacity={0.4}
      />
      <Grid container alignItems="center" position="relative">
        <Grid item xs={12} lg={3}>
          <SoftBox px={{ xs: 0, md: 1.5 }}>
            <SoftTypography variant="h1" color="white" textTransform="capitalize" opacity={0.9}>
              Detalles de Servidor
            </SoftTypography>
            <Divider light />
            <SoftBox display="flex">
              <SoftBox>
                <SoftTypography variant="h4" color="white" textTransform="capitalize" opacity={0.7}>
                  Almacenamiento
                </SoftTypography>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  100{' '}
                  <SoftTypography variant="button" color="white" verticalAlign="top">
                    Tb
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
              <SoftBox ml={{ xs: 3, md: 8 }} mb={{ xs: 1, md: 0 }}>
                <SoftTypography variant="h4" color="white" textTransform="capitalize" opacity={0.7}>
                  Consumo de energia.
                </SoftTypography>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  300{' '}
                  <SoftTypography variant="button" color="white" verticalAlign="top">
                    Kw
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={6}>
          <SoftBox textAlign="center">
            <SoftBox
              component="img"
              src={serverpng}
              alt="car image"
              display={{ xs: 'none', md: 'block' }}
              width="auto"
              mt={{ xs: 0, lg: -16 }}
            />
            <SoftBox
              display="flex"
              justifyContent={{ xs: 'flex-start', md: 'center' }}
              alignItems="center"
              mb={1}
            >
              <SoftTypography variant="h3" color="white" textTransform="capitalize" opacity={0.7}>
                Rango de Consumo
              </SoftTypography>
              <SoftBox ml={1}>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  70
                  <SoftTypography variant="button" fontWeight="bold" color="white" verticalAlign="top">
                    %
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} lg={3}>
          <SoftBox px={{ xs: 0, md: 1.5 }}>
            <SoftTypography variant="h2" color="white" textTransform="capitalize" opacity={0.9}>
              WAVE DC CALI
            </SoftTypography>
            <Divider light />
            <SoftBox display="flex">
              <SoftBox>
                <SoftTypography variant="h4" color="white">
                  WAVE DC, CALI ZONAMERICA
                </SoftTypography>
                <SoftTypography variant="h5" color="white">
                  Calle 36, Vía #128 - 321, Jamundí, Cali, Valle del Cauca
                </SoftTypography>
              </SoftBox>
              <SoftBox ml={8}>
                <SoftButton variant="outlined" circular iconOnly>
                  <Icon>map</Icon>
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default AutomotiveDetails;
