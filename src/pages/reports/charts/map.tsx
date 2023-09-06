import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = require("../../../utils/geography-file.json");

export default function MapChart() {
  return (
    <ComposableMap
      width={750}
      height={350}
      projectionConfig={{ scale: 125 }}
      style={{ marginTop: "10px" }}
    >
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#fff"
                stroke="#A2E2F6"
                className="drop-shadow-md"
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
