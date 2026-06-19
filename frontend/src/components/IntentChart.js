import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function IntentChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="creator" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="breakdown.highIntent" name="High Intent" fill="#1a8c4a" />
        <Bar dataKey="breakdown.curious" name="Curious" fill="#c98a1d" />
        <Bar dataKey="breakdown.generic" name="Generic" fill="#999999" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default IntentChart;