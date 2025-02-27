import {FC} from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

type DayCount = {
  day: string;
  count: number;
};

type Props = {
  data: DayCount[];
};

const DayCountsBarChart: FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#D2AC47" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DayCountsBarChart;
