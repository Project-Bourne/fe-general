const geoUrl = require("../../../utils/geography-file.json");

import { Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function MapChart({ userCountries }) {
  return (
    <ul className="flex flex-wrap gap-x-3 pl-5">
      {userCountries?.map((country, index) => (
        <li key={index}>
          <Tooltip title={country.name}>
            {/* <Image
              src={country.image}
              alt={country.name}
              height={30}
              width={90}
            /> */}
            <div className="text-[90px] font-light">{country.emoji}</div>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}

// import React from "react";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
// } from "react-simple-maps";

// <ComposableMap
//   width={750}
//   height={350}
//   projectionConfig={{ scale: 125 }}
//   style={{ marginTop: "10px" }}
// >
//   <ZoomableGroup>
//     <Geographies geography={geoUrl}>
//       {({ geographies }) =>
//         geographies.map((geo) => (
//           <Geography
//             key={geo.rsmKey}
//             geography={geo}
//             fill="#fff"
//             stroke="#A2E2F6"
//             className="drop-shadow-md"
//           />
//         ))
//       }
//     </Geographies>
//   </ZoomableGroup>
// </ComposableMap>


// export default function MapChart() {
//   return (
//     <ComposableMap
//       width={750}
//       height={350}
//       projectionConfig={{ scale: 125 }}
//       style={{ marginTop: "10px" }}
//     >
//       <ZoomableGroup>
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#fff"
//                 stroke="#A2E2F6"
//                 className="drop-shadow-md"
//               />
//             ))
//           }
//         </Geographies>
//       </ZoomableGroup>
//     </ComposableMap>
//   );
// }
