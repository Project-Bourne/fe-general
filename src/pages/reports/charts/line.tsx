import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LineChartComponent() {
  const data = [
    {
      month: "January",
      "Relevant Articles": 20,
      "Credible Articles": 40,
      "Popular Articles": 15,
    },
    {
      month: "February",
      "Relevant Articles": 30,
      "Credible Articles": 98,
      "Popular Articles": 51,
    },
    {
      month: "March",
      "Relevant Articles": 50,
      "Credible Articles": 80,
      "Popular Articles": 46,
    },
    {
      month: "April",
      "Relevant Articles": 78,
      "Credible Articles": 39,
      "Popular Articles": 78,
    },
    {
      month: "May",
      "Relevant Articles": 18,
      "Credible Articles": 40,
      "Popular Articles": 54,
    },
    {
      month: "June",
      "Relevant Articles": 39,
      "Credible Articles": 30,
      "Popular Articles": 9,
    },
    {
      month: "July",
      "Relevant Articles": 90,
      "Credible Articles": 43,
      "Popular Articles": 67,
    },
  ];

  return (
    <ResponsiveContainer className="text-[14px]">
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="Relevant Articles" stroke="#4582C4" />
        <Line dataKey="Credible Articles" stroke="#B22735" />
        <Line dataKey="Popular Articles" stroke="#CCAD00" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
