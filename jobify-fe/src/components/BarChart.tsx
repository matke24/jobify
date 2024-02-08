import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useStatsContext } from "../pages/Stats";

const BarChartComponent: React.FC = () => {
  const { monthlyStats } = useStatsContext();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyStats} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#2cb1bc" />
        <YAxis allowDecimals={false} stroke="#2cb1bc" />
        <Tooltip />
        <Bar type="natural" dataKey="count" fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
