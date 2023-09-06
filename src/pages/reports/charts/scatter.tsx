import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dataRelevant, dataCredible, dataPopular } from "./constant";

const ScatterChartComponent = () => {
  const uniqueMonths = Array.from(
    new Set([...dataRelevant.map((item) => item.month)]),
  ); // Get unique months from the data

  const xAxisWidth = 800;

  return (
    <ResponsiveContainer className="text-[14px]">
      <ScatterChart
        width={xAxisWidth}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="month"
          type="category"
          name="Month"
          allowDuplicatedCategory={true}
          ticks={uniqueMonths} // Set specific ticks for X-axis
          interval={0}
          tickFormatter={(value) => value.substring(0, 3)} // Custom tick formatter to show only the first three characters of the month
          domain={["dataMin", "dataMax"]} // Set domain explicitly to span the entire data range
        />
        <YAxis dataKey="number" type="number" name="Number" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Relevant Articles"
          data={dataRelevant}
          fill="#4582C4"
          legendType="rect"
          shape="circle" // Customize the shape of the data points
        />
        <Scatter
          name="Credible Articles"
          data={dataCredible}
          fill="#B22735"
          legendType="rect"
          shape="circle" // Customize the shape of the data points
        />
        <Scatter
          name="Popular Articles"
          data={dataPopular}
          fill="#CCAD00"
          legendType="rect"
          shape="circle" // Customize the shape of the data points
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartComponent;
