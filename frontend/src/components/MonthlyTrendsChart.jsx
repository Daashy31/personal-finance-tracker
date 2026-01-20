import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MonthlyTrendsChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No trend data</p>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Monthly Income vs Expense</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#F44336" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendsChart;
