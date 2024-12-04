// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "@/components/SoftBox";
import SoftTypography from "@/components/SoftTypography";
import SoftButton from "@/components/SoftButton";

// Images
import serverpng from "@/assets/images/serve.png";
import wavesWhite from "@/assets/images/shapes/waves-white.svg";

function ServerDetails() {
  return (
    <SoftBox
      position="relative"
      bgColor="secondary"
      py={1}
      px={{ xs: 3, sm: 6, md: 8 }}
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
        color={'white'}
      />
      <Grid container alignItems="center" position="relative" spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <SoftBox px={{ xs: 0, md: 1.5 }}>
            <SoftTypography variant="h1" color="white" textTransform="capitalize" opacity={0.9}>
              Detalles de Servidor
            </SoftTypography>
            <Divider light />
            <SoftBox display="flex" flexDirection="column" gap={2}>
              <SoftBox>
              <SoftTypography variant="h4" color="white" opacity={0.7}>
                CPU
              </SoftTypography>
              <SoftTypography variant="h2" fontWeight="bold" color="white">
                435.76 <SoftTypography variant="button" color="white" verticalAlign="top">GHz</SoftTypography>
              </SoftTypography>
              </SoftBox>
              <SoftBox>
              <SoftTypography variant="h4" color="white" opacity={0.7}>
                RAM
              </SoftTypography>
              <SoftTypography variant="h2" fontWeight="bold" color="white">
                5.37{' '}<SoftTypography variant="button" color="white" verticalAlign="top">TB</SoftTypography>
              </SoftTypography>
              </SoftBox>
              <SoftBox>
                <SoftTypography variant="h4" color="white" textTransform="capitalize" opacity={0.7}>
                  Almacenamiento
                </SoftTypography>
                <SoftTypography variant="h2" fontWeight="bold" color="white">
                  230.15{' '}
                  <SoftTypography variant="button" color="white" verticalAlign="top">
                    TB
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SoftBox textAlign="center">
            <SoftBox
              component="img"
              src={serverpng}
              alt="server image"
              display={{ xs: "none", md: "block" }}
              width="100%"
              maxWidth={600}
              mt={{ xs: 0, lg: -16 }}
            />
            <SoftTypography variant="h3" color="white" opacity={0.7}>
              Nombre del Servidor
            </SoftTypography>
            <SoftTypography variant="h2" fontWeight="bold" color="white">
              Glake CNW
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <SoftBox px={{ xs: 0, md: 1.5 }}>
            <SoftTypography variant="h2" color="white" textTransform="capitalize" opacity={0.9}>
              Redes y Clusters
            </SoftTypography>
            <Divider light />
            <SoftBox display="flex" flexDirection="column" gap={2}>
              <SoftTypography variant="h4" color="white">
                Clusters
              </SoftTypography>
              <SoftTypography variant="h2" fontWeight="bold" color="white">
                1
              </SoftTypography>

              <SoftTypography variant="h4" color="white">
                Redes
              </SoftTypography>
              <SoftTypography variant="h2" fontWeight="bold" color="white">
                21
              </SoftTypography>

              <SoftTypography variant="h4" color="white">
                Máquinas Virtuales
              </SoftTypography>
              <SoftTypography variant="h2" fontWeight="bold" color="white">
                82
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default ServerDetails;