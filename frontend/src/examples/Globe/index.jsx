/*import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Land from "./Land";
import Marker from "./Marker";
import Curve from "./Curve";
import SoftBox from '@/components/SoftBox/index.jsx';

const Globe = ({
                 cities = [],
                 travels = [],
                 hideCities,
                 hideTravels,
                 hideFlights,
                 position,
                 top,
                 right,
                 mt,
                 mr,
                 canvasStyle,
               }) => (

  <Canvas
    position={position}
    top={top}
    right={right}
    mt={mt}
    mr={mr}
    style={{ position: 'relative', width: '100%', height: '100%', outline: 'none' }}
    orthographic
    camera={{ position: [0, 0, 200], zoom: 3 }}
    gl={{ alpha: true }}
  >
    <Land />
    {!hideCities && cities.map((city) => <Marker key={city.geonameId} city={city} />)}
    {travels.map((travel) =>
      travel.type === "flight" && !hideFlights ? (
        <Curve key={travel.id} travel={travel} />
      ) : null
    )}
    <OrbitControls enablePan enableRotate autoRotate />
  </Canvas>
);


export default Globe;*/


import { useEffect, useRef } from "react";
import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Land from "./Land";
import Marker from "./Marker";
import Curve from "./Curve";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import SoftBox from "@/components/SoftBox";

function Globe({
                 cities = [],
                 travels = [],
                 hideCities = false,
                 position = 'absolute',
                 top = '10%',
                 right = '10%', }) {

  const globeRef = useRef(null);

  return (
    <SoftBox
      ref={globeRef}
      style={{
        position: position,
        top: top,
        right: right,
        width: '100%', // Ajustar al contenedor
        height: '100%', // Asegurar que tome toda la altura disponible
        overflow: 'visible', // Asegura que no recorte el contenido
      }}
    >
      <Canvas
        style={{
          width: '100%',
          height: '100%',
        }}
        orthographic
        camera={{
          position: [0, 0, 300], // Alejar para ver más contenido
          zoom: 5, // Ajusta el zoom según tu requerimiento
        }}
        gl={{ alpha: true }}
      >
        <Land />
        {!hideCities &&
          cities.map((city) => <Marker key={city.geonameId} city={city} />)}
        {travels.map((travel) =>
          travel.type === 'flight' && (
            <Curve key={travel.id} travel={travel} />
          )
        )}
        <OrbitControls enablePan enableRotate autoRotate />
      </Canvas>
    </SoftBox>

  );
}


// Typechecking props for the Globe
Globe.propTypes = {
  canvasStyle: PropTypes.objectOf(PropTypes.any),
};

export default Globe;
