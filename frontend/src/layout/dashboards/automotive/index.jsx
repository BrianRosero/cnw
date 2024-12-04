// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "../../../components/SoftBox";

// Soft UI Dashboard PRO React example components
import Footer from "../../../examples/Footer";
import MiniStatisticsCard from "../../../examples/Cards/StatisticsCards/MiniStatisticsCard";

// Automotive dashboard components
import AutomotiveDetails from "../automotive/components/AutomotiveDetails";
import AutomotiveMonitor from "../automotive/components/AutomotiveMonitor";

// Material UI Icons
import PaidIcon from '@mui/icons-material/Paid';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SpeedIcon from '@mui/icons-material/Speed';
import MusicNoteIcon from '@mui/icons-material/MusicNote';


function Automotive() {
  return (
    <SoftBox sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <SoftBox pt={3}>
        <SoftBox mb={3}>
          <AutomotiveDetails />
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "Today's Trip", fontWeight: "medium" }}
                count="145 Km"
                icon={{ component: <PaidIcon /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "Battery Health", fontWeight: "medium" }}
                count="99 %"
                icon={{ component: <SportsEsportsIcon /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "Average Speed", fontWeight: "medium" }}
                count="56 Km/h"
                icon={{ component: <SpeedIcon /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "Music Volume", fontWeight: "medium" }}
                count="15/100"
                icon={{ color: "info", component: <MusicNoteIcon /> }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <AutomotiveMonitor />
        </SoftBox>
      </SoftBox>
      <Footer />
    </SoftBox>
  );
}

export default Automotive;

