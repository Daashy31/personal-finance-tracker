import { useEffect, useState } from 'react';
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
import api from '../api/axios';

const MonthlyTrendsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/trends')
      .then(res => {
        // Convert strings to numbers (important)
        const formatted = res.data.map(row => ({
          month: row.month,
          income: Number(row.income),
          expense: Number(row.expense),
        }));
        setData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  if (data.length === 0) return <p>No trend data</p>;

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
          <Line type="monotone" dataKey="income" />
          <Line type="monotone" dataKey="expense" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendsChart;
