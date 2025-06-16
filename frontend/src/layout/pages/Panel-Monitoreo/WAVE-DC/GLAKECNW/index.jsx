import SoftBox from "../../../../Ui-Components/Components/SoftBox";

// Automotive dashboard components
import ServerDetails from "./components/ServerDetails";
import ServerHosts from "./components/ServerHosts";
import ServerVms from "./components/ServerVms";

import useScrollTop from '@/hooks/ScrollToTop.jsx'

function Clusters() {
  useScrollTop()
  return (
    <SoftBox sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <SoftBox pt={3}>
        <SoftBox mb={3}>
          <ServerDetails/>
        </SoftBox>
        <SoftBox mb={3}>
          <ServerHosts/>
        </SoftBox>
        <SoftBox mb={3}>
          <ServerVms />
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default Clusters;
