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
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Relevant Articles" fill="#4582c4ca" />
        <Bar dataKey="Credible Articles" fill="#b22735c5" />
        <Bar dataKey="Popular Articles" fill="#ccad00c9" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
