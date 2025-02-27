import {FC} from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

type MonthCount = {
  month: string;
  count: number;
};

type Props = {
  data: MonthCount[];
};

const MonthCountsLineChart: FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#D2AC47" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthCountsLineChart;
