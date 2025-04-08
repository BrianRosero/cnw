import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box, Container } from "@mui/material";
import Detalles from "./Detalles.jsx"; // Importamos el componente Detalles

// Información del Datacenter
const DatacenterInfo = () => (
  <Box sx={{ padding: 2, border: "1px solid gray", borderRadius: 2 }}>
    <Typography variant="h5">Datacenter Information</Typography>
    <Typography variant="body1">
      Ubicación: Ciudad de la Innovación<br />
      Capacidad: 200 racks<br />
      Conectividad: 40 Gbps<br />
      Certificaciones: ISO 27001, Tier III
    </Typography>
  </Box>
);

// Página principal del Datacenter
const Datacenter = () => {
  const [view, setView] = useState("home");
  const [breadcrumbs, setBreadcrumbs] = useState(["Home"]);

  const changeView = (newView, breadcrumbLabel) => {
    if (newView === "home") {
      setBreadcrumbs(["Home"]);
    } else if (newView === "info") {
      setBreadcrumbs(["Home", "Datacenter Info"]);
    } else if (newView === "detalles") {
      setBreadcrumbs(["Home", "Datacenter Info", "Detalles"]);
    }
    setView(newView);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {breadcrumbs.map((breadcrumb, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => {
                if (index === 0) {
                  changeView("home", "Home");
                } else if (index === 1) {
                  changeView("info", "Datacenter Info");
                } else if (index === 2) {
                  changeView("detalles", "Detalles");
                }
              }}
            >
              {breadcrumb}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4, height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
        {view === "home" && (
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <Typography variant="h5">Bienvenido al Portal del Datacenter</Typography>
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <Button variant="contained" color="primary" onClick={() => changeView("info", "Datacenter Info")}>Mostrar Datacenter</Button>
              <Button variant="contained" color="secondary" onClick={() => changeView("detalles", "Detalles")}>Mostrar Detalles</Button>
            </Box>
          </Box>
        )}
        {view === "info" && (
          <Box sx={{ flex: 1 }}>
            <DatacenterInfo />
          </Box>
        )}
        {view === "detalles" && (
          <Box sx={{ flex: 1 }}>
            <Detalles />
          </Box>
        )}
        {view === "home" && (
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", marginTop: 4 }}>
            <Button variant="contained" color="primary" onClick={() => changeView("info", "Datacenter Info")}>
              Mostrar Datacenter
            </Button>
            <Button variant="contained" color="secondary" onClick={() => changeView("detalles", "Detalles")}>
              Mostrar Detalles
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Datacenter;
