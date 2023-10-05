import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "credible articles",
    "Popular articles ",
    "Poor articles",
    "Trending articles",
    "Relevant articles",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [20, 40, 50, 70, 60],
      backgroundColor: [
        "#4ac7ed9e",
        "#00cc998e",
        "#b2273591",
        "#6497ce85",
        "#ffe03369",
      ],
      borderWidth: 1,
    },
  ],
};

const options: any = {
  responsive: true,
  innerHeight: 150,
  outerHeight: 300,
  innerWidth: 150,
  outerWidth: 300,
  plugins: {
    legend: {
      position: "right",
      rtl: true,
    },
  },
};

export default function PolarChartComponent() {
  return <PolarArea data={data} options={options} />;
}
