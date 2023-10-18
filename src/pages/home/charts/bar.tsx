import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarChartComponent() {
  const { reports } = useSelector((state: any) => state?.user);
  const monthlyReports = reports?.report?.monthlyReports;

  if (!Array.isArray(monthlyReports)) {
    // Handle the case where monthlyReports is not an array
    return <div>No data available</div>;
  }

  // Sort the monthlyReports data in ascending order based on the "month" field
  const sortedData = [...monthlyReports].sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA.getTime() - dateB.getTime();
  });

  // Transform the sorted data into the format expected by recharts
  const data = sortedData?.map((report) => ({
    month: report.month,
    "Credible Articles": report.percentageCredible || 0,
    "Relevant Articles": report.percentageRelevant || 0,
    "Popular Articles": report.percentagePopular || 0,
  }));

  // Custom formatter for Tooltip to add % symbol
  const tooltipFormatter = (value) => {
    return `${value}%`;
  };

  return (
    <ResponsiveContainer className="text-[14px]">
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          label={{
            value: "%",
            angle: -90,
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
        <Bar dataKey="Credible Articles" fill="#00adcc" />
        <Bar dataKey="Relevant Articles" fill="#ccad00c9" />
        <Bar dataKey="Popular Articles" fill="#f16023" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
