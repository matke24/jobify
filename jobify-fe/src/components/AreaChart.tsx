import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useStatsContext } from "../pages/Stats";

const AreaCharComponent: React.FC = () => {
  const { monthlyStats } = useStatsContext();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthlyStats} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#2cb1bc" />
        <YAxis allowDecimals={false} stroke="#2cb1bc" />
        <Tooltip />
        <Area type="natural" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaCharComponent;
