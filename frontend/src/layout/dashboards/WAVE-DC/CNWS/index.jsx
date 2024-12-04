// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "@/components/SoftBox";

// Soft UI Dashboard PRO React example components
import Footer from "@/examples/Footer";
import MiniStatisticsCard from "@/examples/Cards/StatisticsCards/MiniStatisticsCard";

// Automotive dashboard components
import ServerDetails from "./components/ServerDetails";
import ServerMonitor from "./components/ServerMonitor";

// Material UI Icons
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SettingsIcon from '@mui/icons-material/Settings';

function Clusters() {
  return (
    <SoftBox sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <SoftBox pt={3}>
        <SoftBox mb={3}>
          <ServerDetails />
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "Procesadores", fontWeight: "medium" }}
                count="208"
                icon={{ component: <MemoryIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "Hosts", fontWeight: "medium" }}
                count="5"
                icon={{ component: <CloudIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "RAM Total", fontWeight: "medium" }}
                count="5.37 TB"
                icon={{ component: <MemoryIcon /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MiniStatisticsCard
                bgColor="secondary"
                title={{ text: "Almacenamiento", fontWeight: "medium" }}
                count="230.15 TB"
                icon={{ component: <StorageIcon /> }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <ServerMonitor />
        </SoftBox>
      </SoftBox>
      <Footer />
    </SoftBox>
  );
}

export default Clusters;
